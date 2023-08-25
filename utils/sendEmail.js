const nodemailer = require("nodemailer")
const sendEmail = async(option)=>{
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "774e27a7e2a469",
          pass: "4a3fc3e5cfdc5d"
        }
      });
    var mailOptions = {
        from : "baderzaouichbz@gmail.com",
        to : option.to,
        subject : option.subject,
        text : option.text
    }
    await transport.sendMail(mailOptions)
}
module.exports = sendEmail