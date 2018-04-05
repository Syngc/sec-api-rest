var nodemailer = require('nodemailer'); 

module.exports = (email,user, pass) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'noreplaysec1@gmail.com',
            pass: 'canoteo0987'
        }
     });
    var mailOptions = {
        from: 'Remitente',
        to: email,
        subject: 'Bienvenido a SEC',
        text: 'Bienvenido '+ user+ ' su contraseña es '+pass
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
};