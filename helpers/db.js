const Sequalize = require("sequelize");
const db = new Sequalize("ulk_web_dev", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // logging: false,
});

module.exports = db;
