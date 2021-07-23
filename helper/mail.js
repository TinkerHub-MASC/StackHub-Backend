
const NodeMail = require('nodemailer');
const Gmail = (mail,subject,text,html)=>{
let mailTransporter = NodeMail.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email_Id,
        pass:process.env.email_pass
    }
});


let mailDetails = {
        from: '"masc@stackhub.com 👻"masc@stackhub.com', // sender address
        to: mail, // list of receivers
        subject, // Subject line
        text,   // plain text body
        html, // html body


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