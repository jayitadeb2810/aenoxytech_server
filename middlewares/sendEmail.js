import nodeMailer from "nodemailer"

export const sendEmail = async (options) => {
  var transporter = nodeMailer.createTransport({
    service: "gmail",
    port: process.env.PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions)
}
