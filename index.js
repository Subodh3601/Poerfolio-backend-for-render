import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 3600;

app.use(bodyParser.json());
app.use(cors());

app.post('/sendEmail', async(req, res) => {
    const { name, email, phone, msg } = req.body;
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'subsin360@gmail.com',
            pass:'vqsu frei pwpi pinv'
        }
    })

    const mailOptions = {
        from: 'subsin360@gmail.com ',
        to: 'subodhsingh360@gmail.com',
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