const { default: mongoose, model } = require("mongoose");
const Project = require("./ProjectModel");

const TodoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please choose a todo name"],
        unique : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true , "please choose a todo responsable"],
    },
    status : {
        type : String , 
        default : "not started",
        required : [true , "please choose a status"],
        enum :{
            values : ["not started","started","finished"],
            message : "please provide a valid status"
        }
    },
    project : {
        type : mongoose.Schema.ObjectId,
        ref : 'Project', 
        required : [true , "please choose a project"],
    },
    description :{
        type: String , 
        required : [true , "please enter a description"]
    },
    start : {
        type : Date , 
        required : [true,"please shoose a start date"]
    },
    end :{
        type : Date ,
        required : [true,"please choose an end date"],
        validate : {
            validator : function(val){
                const start = new Date(this.start)
                const end = new Date(val)
                return end > start
            },
            message : "the end date must be greater than the start date"
        }
    }
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
})

TodoSchema.pre(/^find/,function(next){
    this.populate({
        path : "user",
        select : "userName email profile"
    })
    next()
})
TodoSchema.statics.calc = async function (projectId) {
    const agg = await this.aggregate([
        {
            $match: { project: projectId }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 } // Count documents for each status
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$count" }, // Calculate the total count of all statuses
                statuses: {
                    $push: {
                        status: "$_id",
                        count: "$count"
                    }
                }
            }
        },
        {
            $unwind: "$statuses"
        },
        {
            $project: {
                _id: 0,
                status: "$statuses.status",
                percentage: {
                    $multiply: [
                        { $divide: ["$statuses.count", "$total"] }, // Calculate percentage
                        100
                    ]
                }
            }
        }
    ]);
const a=  {}
    if(agg.length > 0){
       let status =  agg[0].status.toString()
       if(status==="not started") status = "notStarted"
         const percentage = agg[0].percentage
        a[status] = percentage
    }
    if(agg.length > 1){
        let status =  agg[1].status.toString()
        if(status==="not started") status = "notStarted"

        const percentage = agg[1].percentage
       a[status] = percentage
    }
    if(agg.length > 2){
        let status =  agg[2].status.toString()
        if(status==="not started") status = "notStarted"

        const percentage = agg[2].percentage
       a[status] = percentage
    }
    console.log(a)
    if(a.notStarted===undefined) a.notStarted = 0
    if(a.started===undefined) a.started = 0
    if(a.finished===undefined) a.finished = 0
    await Project.findByIdAndUpdate(projectId, a)
}

  
TodoSchema.post("save",async function(doc){
    await doc.constructor.calc(doc.project)

})
TodoSchema.post(/^findOneAnd/,async function(doc){
    await doc.constructor.calc(doc.project)

})

const Todo = model("Todo",TodoSchema)




module.exports = Todo