var express = require('express');
var router = express.Router();
var pool = require('./dbconnection');
var cors = require('cors');

router.all('*', cors());

//Todos los medicamentos
router.get('/medicamentos', (req, res) => {
    pool.connect((err) => {
        if (err) console.error('connection error', err.stack)
    })
    pool.query('SELECT * FROM medicamento', [], (err, result) => {
        res.json(result.rows);
    });
});

//Medicamentos por categoria
router.get('/medicamentos/:categoria', (req, res) => {
    var categoria = req.params.categoria;
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    pool.query("SELECT * FROM medicamento WHERE categoria='" + categoria + "';", [], (err, result) => {
        if (err) {
            return res.status(400).send('No hay medicamentos en la categoria');
        }
        res.json(result.rows);
    });
});

//Medicamento por id
router.get('/medicamentos/id/:id', (req, res) => {
    var id = req.params.id;
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    pool.query("SELECT * FROM medicamento WHERE id_codigo_inventario='" + id + "';", [], (err, result) => {
        if (err) {
            return res.status(400).send('No existe el medicamento');
        }
        res.json(result.rows);
    });
});

//medicamento por nombre 
router.get('/medicamentos/nombre/:nombre', (req, res) => {
    var nombre = req.params.nombre;
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    pool.query("SELECT * FROM medicamento WHERE nombre ~* '" + nombre + "';", [], (err, result) => {
        if (err) {
            return res.status(400).send('No existe el medicamento con nombre ' + nombre);
        }
        res.json(result.rows);
    });
});

//medicamento por nombre y categoria 
router.get('/medicamentos/nombrecat/:nombre/:categoria', (req, res) => {
    var nombre = req.params.nombre;
    var categoria = req.params.categoria;
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    pool.query("SELECT * FROM medicamento WHERE nombre ~* '" + nombre + "' AND categoria = '" + categoria + "';", [], (err, result) => {
        if (err) {
            return res.status(400).send('No existe el medicamento');
        }
        res.json(result.rows);
    });
});

router.post('/medicamentos', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var b = req.body;
    var query = "INSERT INTO medicamento(id_codigo_inventario, nombre, unidades_disponibles, fecha_de_vencimiento, laboratorio, precio_unidad, categoria)" +
        " VALUES(" + b.id_codigo_inventario + ",'" +
        b.nombre + "'," +
        b.unidades_disponibles + ",'" +
        b.fecha_de_vencimiento + "','" +
        b.laboratorio + "'," +
        b.precio_unidad + ",'" +
        b.categoria +

        "')  ON CONFLICT (id_codigo_inventario) DO NOTHING;"
    pool.query(query, [], (err, result) => {
        if (err) {
            return res.status(300).send('No ha sido posible insertar el medicamento ' + err.stack);
        };
        res.status(200).send("Medicamento insertado correctamente");
        res.end();
    });

});

router.post('/put/medicamentos/:id', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var id = req.params.id;
    var b = req.body;
    var nombre = b.nombre ? "nombre='" + b.nombre + "'," : "";
    var unidades_disponibles = b.unidades_disponibles ? "unidades_disponibles='" + b.unidades_disponibles + "'," : ""
    var fecha_de_vencimiento = b.fecha_de_vencimiento ? "fecha_de_vencimiento='" + b.fecha_de_vencimiento + "'," : "";
    var laboratorio = b.laboratorio ? "laboratorio='" + b.laboratorio + "'," : "";
    var precio_unidad = b.precio_unidad ? "precio_unidad='" + b.precio_unidad + "'," : "";
    var categoria = b.categoria ? "categoria='" + b.categoria + "'," : "";
    var query = "UPDATE medicamento SET " + nombre + unidades_disponibles + fecha_de_vencimiento + laboratorio + precio_unidad + categoria;
    query = query.slice(0, -1);
    query = query + " WHERE id_codigo_inventario='" + id + "';";
    console.log(query);
    pool.query(query, [], (err, result) => {
        if (err) console.log(err);
        res.end();
    });
});

router.post('/del/medicamentos/:id', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
        var id = req.params.id;
        var query = "DELETE FROM medicamento WHERE id_codigo_inventario='" + id + "';"
        pool.query(query, [], (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.end();
        })
    });

});

router.post('/addImagen', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var b = body.req;
    var imagen = b.imagen;
    var id_codigo_inventario = b.id_codigo_inventario;
    var query = "INSERT INTO foto_medicamento(foto, id_codigo_inventario)" +
        "VALUES(" + imagen + "," +
        id_codigo_inventario + ");";
    pool.query(query, [], (err, result) => {
        if (err) {
            return res.status(300).send('No fue posible insertar foto');
        }
        res.send('Foto insertada correctamente');
        res.end();
    });
});

router.post('/getImagen', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var b = body.req;
    var query = "SELECT * FROM foto_medicamento WHERE id_codigo_inventario=" + b.id_codigo_inventario + ";";
    pool.query(query, [], (err, result) => {
        if (err) {
            return res.status(300).send('No se encontraron fotos');
        }
        res.send(result.rows);
        res.end();
    });
});

router.post('/delImagen', (req, res) => {
    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack);
        }
    });
    var b = body.req;
    var query = "DELETE FROM foto_medicamento WHERE id_foto=" + b.id_foto + ";";
    pool.query(query, [], (err, result) => {
        if (err) {
            return res.status(300).send('No se encontraron fotos');
        }
        res.send(result.rows);
        res.end();
    });
});





module.exports = router;