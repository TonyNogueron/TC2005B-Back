const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

module.exports.getAchievements = (req, res) => {
  const sql = `SELECT * FROM Achievement`;
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

module.exports.addAchievement = (req, res) => {
  const { name, description, points } = req.body;
  const sql = `INSERT INTO Achievement (name, description, points) VALUES (?, ?, ?)`;
  connection
    .query(sql, [name, description, points])
    .then(([result]) => {
      res.json({ message: "Achievement added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};

module.exports.getUserAchievements = (req, res) => {
  const { idUser } = req.query;
  // sql statement thar gets all the achievements of a user with the collectionDate that is in UserAchievement table
  const sql = `SELECT Achievement.idAchievement, Achievement.name, Achievement.description, Achievement.points,
     UserAchievement.collectionDate FROM Achievement INNER JOIN UserAchievement ON Achievement.idAchievement
      = UserAchievement.Achievement_idAchievement WHERE UserAchievement.User_idUser = ?`;

  connection
    .query(sql, [idUser])
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};

module.exports.addUserAchievement = (req, res) => {
  const { idUser, idAchievement } = req.body;

  const firstSql = `SELECT * FROM UserAchievement WHERE User_idUser = ? AND Achievement_idAchievement = ?`;
  connection
    .query(firstSql, [idUser, idAchievement])
    .then(([result]) => {
      if (result.length > 0) {
        res.json({ message: "Achievement already collected" });
      } else {
        const secondSql = `INSERT INTO UserAchievement (User_idUser, Achievement_idAchievement, collectionDate) VALUES (?, ?, NOW())`;
        connection
          .query(secondSql, [idUser, idAchievement])
          .then(([result]) => {
            res.json({ message: "Achievement added successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error on the database" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};
