const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Invalid User, user or password missing" });
    return;
  }
  const { username, password } = req.body;
  let message = "Invalid User";
  let token = "";
  let idUser = 0;
  const sql = `SELECT idUser FROM User WHERE username = ? AND password = SHA2(?,224)`;
  connection
    .query(sql, [username, password])
    .then(([result]) => {
      if (result.length > 0 && result[0].idUser) {
        idUser = result[0].idUser;
        const payload = {
          idUser: idUser,
          username: username,
        };
        token = jwt.sign(payload, config.key, { expiresIn: 7200 });
        message = "User logged in successfully";
      }
      res.json({ message, token, idUser }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};
