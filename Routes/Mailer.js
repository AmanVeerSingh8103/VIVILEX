const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


router.post('/mailer', async (req, res) => {
    try{
        let {name,email,phonequery,organization,message} = req.body;







        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "amanveersingh02@gmail.com",
                pass: "znwgpimbrdwcwyiw"
            }
         });

        let info = await transporter.sendMail({
            from: '"Vivilex Tech 👻" <amanveersingh02@gmail.com>', // sender address
            to: 'amanveersingh02@gmail.com', // list of receivers
            subject: "New Query - Conatct Us Page", // Subject line
            // text: `Hello ${results.rows[0].name}, Your New Password is ${hashedemail}`, // plain text body
            html: ` <!DOCTYPE html>
      
            <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
            </head>
            <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #8d8a8a; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
          <p>Name: `+name+` </p>
          <p>Email: `+email+` </p>
          <p>Phone: `+phonequery+` </p>
          <p>Organization: `+organization+` </p>
          <p>Message: `+message+` </p>
            </div>
            </body>
            </html>` // html body
          });
      
          console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        res.json({ 
          success: true,
          
      })
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
    }   catch (error) {
            console.error(error.message);
            res.send('Server Error')
    } 

})


module.exports = router;