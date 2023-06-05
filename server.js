const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config()

const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { answers } = req.body;
    console.log(answers)
    // TODO: Set up your email configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'bdcamillesaintsaens3f@gmail.com',
        pass: 'whwgckufwjipmipb',
      },
    });
  
    const mailOptions = {
      from: 'YOUR_EMAIL_ADDRESS',
      to: 'bdcamillesaintsaens3f@gmail.com',
      subject: 'Questionnaire Results',
      text: answers.join('\n'),
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  });
  
const port = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
});
