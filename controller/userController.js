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

module.exports.registerUser = (req, res) => {
  const { username, password, email } = req.body;
  const sql = `INSERT INTO User (username, password, email) VALUES (?, SHA2(?,224), ?)`;
  connection
    .query(sql, [username, password, email])
    .then(([result]) => {
      res.json({ message: "User registered successfully"});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
}
