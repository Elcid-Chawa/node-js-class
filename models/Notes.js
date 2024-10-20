const Sequallize = require("sequelize");
const db = require("../helpers/db");

const Notes = db.define("notes", {
  id: {
    type: Sequallize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  topic: Sequallize.STRING,
  note: Sequallize.TEXT,
});

module.exports = Notes;
