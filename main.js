const express = require("express");
const jwt = require("jsonwebtoken");

const login = require("./routes/login");
const user = require("./routes/user");
const achievement = require("./routes/achievement");

const app = express();
const PORT = process.env.PORT || 3001;

const CONFIG = require("./config/jwt");

app.use(express.json());

app.use("/", login);
app.use("/", user);
app.use("/", achievement);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
