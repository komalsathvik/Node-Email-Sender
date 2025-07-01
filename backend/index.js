const express=require("express");
const nodemailer=require("nodemailer");
const cors = require("cors");
const port=7000;
const app=express();
app.use(express.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,         
  secure: false,       
  auth: {
    user: 'your-mail',
    pass: 'pass',
  },
});
app.post("/send",async(req,res)=>{
    const {to,subject,message}=req.body;
    if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
    const mailOptions={
    from:'from-mail',
    to:to,
    subject:subject,
    text:message,
};
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(port,()=>{
    console.log("server is running");
});
