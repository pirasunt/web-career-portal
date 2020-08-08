const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = require('./router')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'rxc353_1',
    password : 'AsdfG353',
    database : 'rxc353_1',
    port: 3307
  });

  connection.connect();

  const port = 8080;

  const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(router(connection));
  
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });