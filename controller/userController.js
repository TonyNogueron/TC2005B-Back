const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

module.exports.getUsers = (req, res) => {
  const sql = `SELECT * FROM User`;
  connection
    .query(sql)
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};
