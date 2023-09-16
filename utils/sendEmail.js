const nodemailer = require("nodemailer")
const sendEmail = async(option)=>{
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
    var mailOptions = {
        from : process.env.MAIL_FROM,
        to : option.to,
        subject : option.subject,
        text : option.text
    }
    await transport.sendMail(mailOptions)
}
module.exports = sendEmail