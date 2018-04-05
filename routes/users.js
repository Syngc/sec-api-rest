var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var emailCtrl = require('../controllers/emailCtrl');


//Registrar usuario
router.post('/user', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
  var b = req.body;
  var contraseña = Math.random().toString(36).substring(7);
  var query = "INSERT INTO cliente(id_cliente,tipo_documento,correo,nombre,fecha_de_nacimiento,contraseña,genero,activo)"+
              " VALUES("+b.id_cliente+",'"+
                         b.tipo_documento+"','"+
                         b.correo+"','"+
                         b.nombre+"','"+
                         b.fecha_de_nacimiento+"','"+
                         contraseña+"','"+
                         b.genero+"','"+
                         "false');";
  pool.query(query,[], (err, result) => {
    if(err){
      console.log(err.stack);
      return res.status(400).send(err.stack);
    }
    emailCtrl(b.correo,b.nombre,contraseña);
    res.end();
  });
});


module.exports = router;
