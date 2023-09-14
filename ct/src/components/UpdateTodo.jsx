import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Loading from "./Loading"

const UpdateTodo = (props)=>{
   
    const navigate = useNavigate()
    const {projectId, todoId} = useParams()
    const [todo, setTodo] = useState({
        name: "",
        description: "",
        start: "",
        end: "",
        user: ""
    })
    const [loaded, setLoaded] = useState(false)

     /*  */
     const [members,setMembers] = useState([]);
     const [name,setName] = useState(todo.name);
     const [description,setDescription] = useState(todo.description);
     const [start,setStart] = useState(todo.start);
     const [end,setEnd] = useState(todo.end);
 const [status,setStatus] = useState(todo.status);
     
     const [member,setMember] = useState(todo.user);
     /*  */
    useEffect(() => {
        if(!props.userinfo) return navigate("/login")
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}/todos/${todoId}`, {withCredentials: true}).then((res)=>{
            setTodo(res.data.todo)
    }).catch((err)=>{
        if(err.status === 404) return navigate("/notFound")
        toast.error(err.response.data.message)
    })
    axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}`, {withCredentials: true}).then((res)=>{
        console.log(res.data.project.memebers);    
        setMembers(res.data.project.memebers);
        setLoaded(true);
    }).catch((err)=>{
        if(err.response.status === 404) return navigate("/not-found");
        toast.error(err.response.data.message);
    })
    }, [])
    useEffect(() => {
        setName(todo.name)
        setDescription(todo.description)
        setStart(`${new Date(todo.start).getFullYear()}-${new Date(todo.start).getMonth()+1 > 10 ? new Date(todo.start).getMonth()+1 : `0${new Date(todo.start).getMonth()+1}`   
        
        }-${new Date(todo.start).getDate() > 10 ? new Date(todo.start).getDate() : `0${new Date(todo.start).getDate()}`}`)
        
        

        console.log(start)    
            setEnd(
                `${new Date(todo.end).getFullYear()}-${new Date(todo.end).getMonth()+1 > 10 ? new Date(todo.end).getMonth()+1 : `0${new Date(todo.end).getMonth()+1}`   
        
                }-${new Date(todo.end).getDate() > 10 ? new Date(todo.end).getDate() : `0${new Date(todo.end).getDate()}`}`
            )
        setMember(todo.user)
    }, [todo])

    const handleSubmit = (e)=>{
        console.log({name, description, start:new Date(start)
        , end:new Date(end), user:member, project: projectId, status },"wwwwwww")
        axios.patch(`http://127.0.0.1:3000/api/v1/projects/${projectId}/todos/${todoId}`, {name, description, start:new Date(start)
        , end:new Date(end), user:member, project: projectId, status }, {withCredentials: true}).then((res)=>{
            toast.success("todo updated successfully")
            
            navigate(`/projects/${projectId}`)
        }).catch((err)=>{
            err.response.data.message.split(",").forEach((message)=>{
            toast.error(message)

            })
        })
    }
    return <>{
        loaded ? <>
                <ToastContainer/>
                <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Update Todo</h2>
                <p className="w-lg-50">lets update the todo for the project</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form className="text-center" method="post"
                        onSubmit={(e)=>{
                            e.preventDefault();
                            handleSubmit(e);
                        }   }
                        >
                            <div className="mb-3"><input className="form-control" type="text"  placeholder="Name" value={name}
                            onChange={(e)=>{
                                setName(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text"  placeholder="Description"
                            onChange={(e)=>{
                                setDescription(e.target.value)
                            }
                            }
                            value={description}
                            /></div>
                            <div className="mb-3"><input className="form-control"  placeholder="Start" type="date"
                                onChange={(e)=>{
                                setStart(e.target.value)}
                                }
                                value={ start}
                            /></div>
                            <div className="mb-3"><input className="form-control" name="password" placeholder="End" type="date" 
                                onChange={(e)=>{
                                setEnd(e.target.value)}
                                }   
                                value={end}
                            /></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                            <div className="mb-3">
                                <select className="form-select" onChange={(e)=>{
                                setMember(e.target.value)
                                console.log(member)
                                console.log(e.target.value)
                                }}>
                                
                                
            <option value="" >Select Member</option>
            {
                members.map((member,index)=>{
                    return <option key={index}   value={member._id} selected = {member.user._id===todo.user._id ? true : false}  >{member.user.userName}</option>
                })
            }
           {/*  <option value="12" selected>This is item 1</option>
            <option value="13">This is item 2</option>
            <option value="14">This is item 3</option> */}
    </select></div>
    <div className="mb-3"><select className="form-select"
    onChange={(e)=>{
        setStatus(e.target.value)
    }}
    >
            <option value="" >select status</option>
            <option value="not started" selected={todo.status=="not started" ? true : false}>not started</option>
            <option value="started" selected={todo.status=="started" ? true : false}>started</option>
            <option value="finished" selected={todo.status=="finished" ? true : false}>finished</option>    </select></div>
                            </div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Create Todo</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

        </> : <Loading/>
    }</>
}
export default UpdateTodo