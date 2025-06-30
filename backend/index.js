const express=require("express");
const nodemailer=require("nodemailer");
const port=7000;
const app=express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,         
  secure: false,       
  auth: {
    user: 'user',
    pass: 'your-pass'
  } 
});
const mailOptions={
    from:'from-mail',
    to:'to-mail',
    subject:'subjects',
    text:'Hello world hurray it is working !',
    html:'<h1>html tag</h1>'
};
async function sender(){
    try{
        const info=await transporter.sendMail(mailOptions);
        console.log(info.response);
        console.log('mail sent succesfully !');
    }
    catch(err){
        console.log(err);
    }
}
sender();

app.listen(port,()=>{
    console.log("server is running");
});