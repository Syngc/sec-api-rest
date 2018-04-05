const { Pool } = require('pg')
//var conString = 'postgress://cymajo:canoteo0987@secdb.czilpwlpevmw.us-east-2.rds.amazonaws.com:5432/SEC';

const pool  = new Pool({
  host: 'secdb.czilpwlpevmw.us-east-2.rds.amazonaws.com',
  database: 'SEC',
  user: 'cymajo',
  password: 'canoteo0987',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;