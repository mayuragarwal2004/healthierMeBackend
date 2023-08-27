const mysql = require('mysql');
require("dotenv").config({ path: "./.env" });

const host = process.env.MYSQL_HOST_NAME;
const username = process.env.MYSQL_USER_NAME;
const password = process.env.MYSQL_PASSWORD;
const dbname = process.env.MYSQL_DB_NAME;


con = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: dbname,
});

con.connect((err) => {
  if (!err) {
    console.log('MySql Connected');
  } else {
    console.log(err);
  }
});

module.exports = con;