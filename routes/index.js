var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('./dbconnection');

router.use(bodyParser.urlencoded({ extended : false}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ApiRest' });
});

//Login
router.post('/login', (req, res) => {
  pool.connect((err) => {
    if (err)console.error('connection error', err.stack)
  });
  var correo = req.body.correo;
  var pass = req.body.contraseña;
  var tipo = req.body.tipo;
  var querycons = "SELECT correo,contraseña FROM "+tipo+" WHERE correo='"+correo+"'";
  client.connect();
  client.query(querycons, [], (err, result)  => {
    if(err)
      res.status(400).send('Se ha producido un error: ' + err.message);
    if(pass != result.rows[0].contraseña)
      res.status(300).send('Contraseña incorrecta');
    else
      res.status(200).send('Ha iniciado sesion correctamente');
    res.end();
    client.end();
  });
});

//Cambiar contraseña 
router.put('/login/', (req, res) => {
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
        res.status(400).send(err.stack);
      }
      res.end();
  });
});




module.exports = router;
