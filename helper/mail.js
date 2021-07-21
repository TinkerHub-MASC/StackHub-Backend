
const NodeMail = require('nodemailer');
const Gmail = (mail,text,subject)=>{
let mailTransporter = NodeMail.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email_Id,
        pass:process.env.email_pass
    }
});


let mailDetails = {
        from: '"MASC@Booked.com 👻" <foo@example.com>', // sender address
        to: mail, // list of receivers
        subject: "Thank you for Booking Our Event 👻 ", // Subject line
        text, // plain text body
        html: `<h3>${text}</h3>`, // html body


};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs',err.message);
    } else {
        console.log('Email sent successfully');
    }
});
}

module.exports = Gmail;