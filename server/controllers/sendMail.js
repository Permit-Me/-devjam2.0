
const nodemailer = require('nodemailer')
// send mail
console.log(process.env.SENDER_EMAIL_ADDRESS);
const sendEmail = (to, url, txt) => {
    try{
            const smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_EMAIL_ADDRESS,
                    pass: process.env.SENDER_EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.SENDER_EMAIL_ADDRESS,
                to: to,
                subject: "PermitMe ✔",
                html:  `
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to PermitMe.</h2>
                <p>Congratulations! You're almost set to start using PermitMe.
                    Just click the button below.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
                </div>
            `
            }

            smtpTransport.sendMail(mailOptions, (err, infor) => {
                if(err) return err;
                return infor
            })
    }catch(err){
        console.log("*****************\nMail error : ", err);
        return err
    }
}

module.exports = sendEmail