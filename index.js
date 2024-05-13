import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3600;

app.use(bodyParser.json());
app.use(cors());

app.post('/sendEmail', async(req, res) => {
    const { name, email, phone, msg } = req.body;
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.USER_NAME,
        to: process.env.TO,
        subject: 'message from E-RESUME',
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${phone}\nMessage: ${msg}`
    };

    try {
       const result =  await transporter.sendMail(mailOptions);
        console.log("email send: " + result.response);
        res.status(200).json({ success: true, message: "Message Send" })
    } catch (error) {
        console.log('error in sending message', error)
        res.status(500).json({ success: false, message: "Server error", error })

    }

})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})