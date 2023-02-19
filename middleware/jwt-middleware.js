const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

const middleware = express.Router();

middleware.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    const decode = jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Token invalido" }).status(403);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "Token no proporcionado" });
  }
});

module.exports = middleware;
