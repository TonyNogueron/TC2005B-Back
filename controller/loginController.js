const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const mysql = require("mysql2");
const mysqlConfig = require("../config/mysql-config");
const conexion = mysql.createConnection(mysqlConfig);

module.exports.login = (req, res) => {
  const { user, password } = req.body;
  let message = "Invalid User";
  let token = "";
  let idUser = 0;

  const sql = `SELECT id FROM User WHERE username = '${user}' AND password = SHA2('${password}',224)`;

  conexion.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message });
    } else {
      if (result.length > 0 && result[0].id) {
        idUser = result[0].id;
        const payload = {
          id: idUser,
          user: user,
        };
        token = jwt.sign(payload, config.key, { expiresIn: 7200 });
        message = "User logged in successfully";
      }
      res.json({ message, token, idUser }).status(200);
    }
  });
};
