var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var emailCtrl = require('../controllers/emailCtrl');
var cors = require('cors');

//Agregar solicitud de domicilio cliente
router.post('/solicituddomicilio', (req, res ) => {
    pool.connect((err) => {
        if (err){
            console.error('connection error', err.stack);
        }
    });
    var b = req.body;
    var query = "INSERT INTO solicitud_domicilio(id_cliente, tipo_documento_cliente, nomenclatura, estado)" +
    " VALUES("+b.id_cliente+",'"+
               b.tipo_documento_cliente+ "',"+
               b.nomenclatura+",'"+
               b.estado +

    "');"
    pool.query(query,[],(err, result) =>{
        if(err) {
            return res.status(300).send('No ha sido posible insertar el medicamento ' +err.stack);
        };
        var mensajeResponse = {
          mensaje: "Solicitud de domicilio enviada correctamente",
          resultado: result
        }
        res.status(200).send(mensajeResponse);
        res.end();
    });

});
