var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var emailCtrl = require('../controllers/emailCtrl');
var cors = require('cors');

router.all('*', cors());


//Login
router.post('/login', (req, res) => {
    pool.connect((err) => {
        if (err) console.error('connection error', err.stack)
    });
    var correo = req.body.correo;
    var pass = req.body.contraseña;
    var querycons = "SELECT correo,contraseña FROM cliente WHERE correo='" + correo + "'";
    pool.query(querycons, [], (err, result) => {
        if (err)
            res.status(400).send('Se ha producido un error: ' + err.message);
        if (pass != result.rows[0].contraseña)
            res.status(300).send('Contraseña incorrecta');
        else
            res.status(200).send('Ha iniciado sesion correctamente');
        res.end();
    });
});

//Cambiar contraseña 
router.post('/put/login/', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var b = req.body;
    var correo = b.correo;
    var pass = b.contraseña
    var query = "UPDATE cliente SET contraseña='" + pass + "' , activo ='true' WHERE correo='" + correo + "';";
    console.log(query);
    pool.query(query, [], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.stack);
        }
        res.end();
    });
});


//Registrar usuario
router.post('/signup', (req, res) => {
    pool.connect((err) => {
        if (err) console.error('connection error', err.stack)
    });
    var b = req.body;
    var contraseña = Math.random().toString(36).substring(7);
    var query = "INSERT INTO cliente(id_cliente,tipo_documento,correo,nombre,fecha_nacimiento,contraseña,genero,activo)" +
        " VALUES(" + b.id_cliente + ",'" +
        b.tipo_documento + "','" +
        b.correo + "','" +
        b.nombre + "','" +
        b.fecha_de_nacimiento + "','" +
        contraseña + "','" +
        b.genero + "','" +
        "false');";
    console.log(query);
    pool.query(query, [], (err, result) => {
        if (err) {
            console.log(err.stack);
            return res.status(400).send(err.stack);
        }
        emailCtrl(b.correo, b.nombre, contraseña);
        console.log("llega hasta aca bn");
        res.end();
    });
});


module.exports = router;