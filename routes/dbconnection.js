const { Pool } = require('pg')
//var conString = 'postgress://cymajo:canoteo0987@secdb.czilpwlpevmw.us-east-2.rds.amazonaws.com:5432/SEC';


const pool1  = new Pool({
  host: 'secdb.czilpwlpevmw.us-east-2.rds.amazonaws.com',
  database: 'SEC',
  user: 'cymajo',
  password: 'canoteo0987',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


const pool2  = new Pool({
  host: 'ec2-54-163-240-54.compute-1.amazonaws.com',
  database: 'd8fcdkcafsabbi',
  user: 'dbbrgxwigvfwdj',
  password: '70daf36c0fcb83841ae3b280d64d045e2171a11aa59dd4d1e602c29fa9634d29',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  sslmode: 'require'
});



module.exports = pool2;
