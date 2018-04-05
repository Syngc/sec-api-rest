var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var emailCtrl = require('../controllers/emailCtrl');


router.post('/empleado', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
});

router.post('/repartidor', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
  var b = req.body;
  var contraseña = Math.random().toString(36).substring(7);
  var query = "INSERT INTO repartidor(id_repartidor,tipo_documento,correo,nombre,fecha_de_nacimiento,contraseña,horarios,activo)"+
              " VALUES("+b.id_repartidor+",'"+
                         b.tipo_documento+"','"+
                         b.correo+"','"+
                         b.nombre+"','"+
                         b.fecha_de_nacimiento+"','"+
                         contraseña+"','"+
                         b.horarios+"','"+
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

router.post('/administrador', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
  var b = req.body;
  var contraseña = Math.random().toString(36).substring(7);
  var query = "INSERT INTO administrador(id_administrador,tipo_documento,correo,nombre,fecha_de_nacimiento,contraseña,activo)"+
              " VALUES("+b.id_administrador+",'"+
                         b.tipo_documento+"','"+
                         b.correo+"','"+
                         b.nombre+"','"+
                         b.fecha_de_nacimiento+"','"+
                         contraseña+"','"+
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
