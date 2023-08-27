var mysql = require("mysql");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongoURI = process.env.CONNECTION_STRING;
const host = process.env.MYSQL_HOST_NAME;
const username = process.env.MYSQL_USER_NAME;
const password = process.env.MYSQL_PASSWORD;
const dbname = process.env.MYSQL_DB_NAME;

var con;
var mysqlquery;

mongoose.set("strictQuery", false);

const connectToSQL = () => {
  try {
    con = mysql.createConnection({
      host: host,
      user: username,
      password: password,
      database: dbname,
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected to MySQL!");
      mysqlquery = con.query;
      con.query(
        "SELECT * FROM user WHERE phone=992118237",
        function (err, result, fields) {
          if (err) throw err;
          console.log(result[0]);
          // console.log(result[0]["count(*)"]);
          // console.log(fields);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

// const mysqlquery = con.query;

module.exports = { connectToSQL, con, mysqlquery };
exports.connectToSQL = connectToSQL;
exports.con = con;
// exports.mysqlquery = con.query;
