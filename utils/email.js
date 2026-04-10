const nodemailer = require('nodemailer')
const { EMAIL_USER, GOOGLE_APP_PASSWORD } = require('./config.js')

//create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: GOOGLE_APP_PASSWORD
    }
})

const sendEmail = async(to,subject,text) => {
    const mailOptions = {
        from: EMAIL_USER,
        to : to,
        subject : subject,
        text : text,
    }

    const info = await transporter.sendEmail(mailOptions)
    console.log('Email sent: ' + info.response)
}

module.exports = sendEmail;