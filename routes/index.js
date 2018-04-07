var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('./dbconnection');
var cors = require('cors');

router.all('*', cors());

router.use(bodyParser.urlencoded({ extended : false}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ApiRest' });
});

module.exports = router;
