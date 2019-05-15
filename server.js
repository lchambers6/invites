"use strict";
const nodemailer = require("nodemailer");
const config = require("./config.json")


// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mail, // generated ethereal user
      pass: config.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Luke Chambers" <example@gmail.com>', // sender address
    to: "example@gmail.com", // list of receivers
    subject: "Save the Date", // Subject line
    text: "Please mark your calendar for      Luke and Jackie's Wedding          Saturday, September 21, 2019 4:00 PM          The Historic Academy of Medicine", // plain text body
    html: `<body>    <div style="position:relative;text-align:center;color:#ceaf5a;">        <div            >            <img src="https://i.imgur.com/bNvjCtO.jpg" height="50%" style="box-shadow: 0 0 8px #ceaf5a;">            <div>                <h3 style="font-family: 'Open Sans Condensed', sans-serif;text-shadow: 4px 4px 3px rgba(0,0,0,0.1);">                    Please mark your calendar for</h3>                    <img src="https://i.imgur.com/XNf5XMv.png" width="500rem">                <h3 style="font-family: 'Open Sans Condensed', sans-serif;text-shadow: 4px 4px 3px rgba(0,0,0,0.1);">Saturday, September 21, 2019 4:00 PM</h3>                <h3 style="font-family: 'Open Sans Condensed', sans-serif;text-shadow: 4px 4px 3px rgba(0,0,0,0.1);">The Historic Academy of Medicine</h3>                <br>                <a href="https://www.theknot.com/us/lifeoflukeandjackie"                    style="text-decoration:none;color:white;background-color:#ceaf5a;border-color:transparent;padding:5px;border-radius: 5px;">Wedding                    Website</a>            </div>        </div>    </div>    <br>    <br>    <br>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">Please mark your calendar for</p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">Luke and Jackie's Wedding</p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">Saturday, September 21, 2019 4:00        PM</p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">The Historic Academy of Medicine    </p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">875 West Peachtree Street        Northwest,</p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;">Atlanta, GA 30309</p>    <p style="position:relative;text-align:center;font-family:'arial';font-size:10px;"><a            href="https://www.theknot.com/us/lifeoflukeandjackie">Wedding Website</a></p></body>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);