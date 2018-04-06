var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };

router.use(cors(corsOptions));

//Todos los medicamentos
router.get('/medicamentos', (req, res) => {
    pool.connect((err) => {
        if (err)console.error('connection error', err.stack)
    })
    pool.query('SELECT * FROM medicamento', [], (err, result) => {        
        res.json(result.rows);
    });
});

//Medicamentos por categoria
router.get('/medicamentos/:categoria', (req, res) => {
    var categoria = req.params.categoria;
    pool.connect((err) => {
        if (err){
            console.error('connection error', err.stack);
        }
    });    
    pool.query("SELECT * FROM medicamento WHERE categoria='"+categoria+"';", [], (err, result) => {      
        res.json(result.rows);
    });
});

router.post('/medicamentos', (req, res ) => {
    pool.connect((err) => {
        if (err){
            console.error('connection error', err.stack);
        }
    });
    var b = req.body;
    var ver = "SELECT * FROM medicamento WHERE id_codigo_inventario='"+b.id_codigo_inventario+"';";
    pool.query(ver,[],(err, result) =>{
        if(err) {
            res.send('No ha sido posible insertar el medicamento');
        };
        res.status(300).send("El medicamento ya existe");
    }); 
    var query = "INSERT INTO medicamento(id_codigo_inventario, nombre, unidades_disponibles, fecha_de_vencimiento, laboratorio, precio_unidad, categoria)" +
    " VALUES("+b.id_codigo_inventario+",'"+
               b.nombre+ "',"+
               b.unidades_disponibles+",'"+
               b.fecha_de_vencimiento +"','"+
               b.laboratorio+"',"+
               b.precio_unidad+",'"+
               b.categoria+

    "')  ON CONFLICT "+(b.id_codigo_inventario)+" DO NOTHING;"
    pool.query(query,[],(err, result) =>{
        if(err) {
            res.status(300).send('No ha sido posible insertar el medicamento');
        };
        res.status(200).send("Medicamento insertado correctamente");
        res.end();
    });           
    
});

router.put('/medicamentos/:id', (req, res) => {
    pool.connect((err) => {
        if (err){
            console.error('connection error', err.stack);
        }
    });
    var id = req.params.id;
    var b = req.body;
    var nombre = b.nombre ? "nombre='"+b.nombre+"'," : "";
    var unidades_disponibles = b.unidades_disponibles ? "unidades_disponibles='"+b.unidades_disponibles+"'," : ""
    var fecha_de_vencimiento = b.fecha_de_vencimiento ? "fecha_de_vencimiento='"+b.fecha_de_vencimiento+"'," : "";
    var laboratorio = b.laboratorio ? "laboratorio='"+b.laboratorio+"'," : "";
    var precio_unidad = b.precio_unidad ? "precio_unidad='"+b.precio_unidad+"'," : "";
    var categoria = b.categoria ? "categoria='"+b.categoria+"'," : "";
    var query = "UPDATE medicamento SET " + nombre+unidades_disponibles+fecha_de_vencimiento+laboratorio+precio_unidad+categoria;
    query = query.slice(0, -1);
    query = query + " WHERE id_codigo_inventario='"+id+"';";
    console.log(query);
    pool.query(query,[],(err, result) => {
        if(err)console.log(err);
        res.end();
    });
});

router.delete('/medicamentos/:id', (req, res) => {
    pool.connect((err) => {
        if (err){
            console.error('connection error', err.stack);
        }
        var id = req.params.id;
        var query = "DELETE FROM medicamento WHERE id_codigo_inventario='"+ id +"';"
        pool.query(query, [],(err, result) =>{
            if(err)console.log(err);
            console.log(result);
            res.end();
        })
    });

})



module.exports = router;
