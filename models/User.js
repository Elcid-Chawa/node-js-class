const Sequallize = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../helpers/db");

const User = db.define("users", {
  id: {
    type: Sequallize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: Sequallize.STRING,
  email: Sequallize.STRING,
  password: Sequallize.STRING,
},
{
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  }
}
);



module.exports = User;
