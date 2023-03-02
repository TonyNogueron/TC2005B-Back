const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

module.exports.getLevels = (req, res) => {
  const sql = `SELECT * FROM Level`;
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

module.exports.addLevel = (req, res) => {
  const { name, topScore, oneStarScore, twoStarScore, threeStarScore } =
    req.body;
  const sql = `INSERT INTO Level (name, topScore, oneStarScore, twoStarScore, threeStarScore) VALUES (?, ?, ?, ?, ?)`;
  connection
    .query(sql, [name, topScore, oneStarScore, twoStarScore, threeStarScore])
    .then(([result]) => {
      res.json({ message: "Level added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error on the database" });
    });
};

module.exports.getUserLevels = (req, res) => {
  const { idUser } = req.query;
  const sql = `SELECT Level.idLevel, Level.name, Level.topScore, Level.oneStarScore, Level.twoStarScore, Level.threeStarScore,
        CompletedLevel.completionDate, CompletedLevel.highScore FROM Level INNER JOIN CompletedLevel ON Level.idLevel
            = CompletedLevel.Level_idLevel WHERE CompletedLevel.User_idUser = ?`;
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

module.exports.addUserLevel = (req, res) => {
  const { idUser, idLevel, highScore } = req.body;

  const firstSql = `SELECT * FROM CompletedLevel WHERE User_idUser = ? AND Level_idLevel = ?`;

  connection
    .query(firstSql, [idUser, idLevel])
    .then(([result]) => {
      if (result.length > 0) {
        if (result[0].highScore < highScore) {
          const secondSql = `UPDATE CompletedLevel SET highScore = ?, completionDate = NOW() WHERE User_idUser = ? AND Level_idLevel = ?`;
          connection
            .query(secondSql, [highScore, idUser, idLevel])
            .then(([result]) => {
              res.json({ message: "Level updated successfully" });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Error on the database" });
            });
        } else {
          res.json({ message: "Level already completed" });
        }
      } else {
        const secondSql = `INSERT INTO CompletedLevel (User_idUser, Level_idLevel, highScore, completionDate) VALUES (?, ?, ?, NOW())`;
        connection
          .query(secondSql, [idUser, idLevel, highScore])
          .then(([result]) => {
            res.json({ message: "Level added successfully" });
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
