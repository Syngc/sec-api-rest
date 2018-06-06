var nodemailer = require('nodemailer');

module.exports = (email, user, pass) => {
    console.log("si entra aca");
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
        text: 'Bienvenido ' + user + ' su contraseña es ' + pass
    };
    transporter.sendMail(mailOptions, function(error, info) {
        console.log("si entra aca2");
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
};