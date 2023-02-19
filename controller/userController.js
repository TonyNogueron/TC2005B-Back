const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const mysql = require("mysql2");
const mysqlConfig = require("../helpers/mysql-config");
const conexion = mysql.createConnection(mysqlConfig);

module.exports.getUsers = (req, res) => {
  const sql = `SELECT * FROM User`;

  conexion.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    } else {
      res.json(result).status(200);
    }
  });
};