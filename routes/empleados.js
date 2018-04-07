var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var emailCtrl = require('../controllers/emailCtrl');
var cors = require('cors');

router.all('*', cors());


//Login
router.post('/login', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
  var correo = req.body.correo;
  var pass = req.body.contraseña;
  var tipo = req.body.tipo;
  var querycons = "SELECT correo,contraseña,activo FROM "+tipo+" WHERE correo='"+correo+"'";
  pool.query(querycons, [], (err, result)  => {
    if(err)
      return res.status(400).send('Se ha producido un error: ' + err.message);
    if(pass != result.rows[0].contraseña)
      return res.status(300).send('Contraseña incorrecta');
    else
      if(result.rows[0].activo == "false"){
        return res.status(201).send('Primera vez que inicia sesión');
      }
    res.status(200).send('Ha iniciado sesion correctamente');
    res.end();
  });
});

//Cambiar contraseña 
router.post('/put/login/', (req, res) => {
  pool.connect((err) => {
      if (err){
          console.error('connection error', err.stack);
      }
  }); 
  var b = req.body;
  var tipo = b.tipo;
  var correo = b.correo;
  var pass = b.contraseña
  var query = "UPDATE "+tipo+" SET contraseña='"+pass+"' WHERE correo='"+correo+"';";
  console.log(query);
  pool.query(query,[],(err, result) => {
      if(err){
        console.log(err);
        return res.status(400).send(err.stack);
      }
  });
  res.end();
});

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
  var query = "INSERT INTO repartidor(id_repartidor,tipo_documento,correo,nombre,contraseña,horarios,activo)"+
              " VALUES("+b.id_repartidor+",'"+
                         b.tipo_documento+"','"+
                         b.correo+"','"+
                         b.nombre+"','"+                   
                         contraseña+"','"+
                         b.horarios+"','"+
                         "false');";
  console.log(query);
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
  console.log(query);
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
