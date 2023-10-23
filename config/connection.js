// Sequelize import
const { Sequelize } = require("sequelize");
require("dotenv").config();

const { JAWSDB_URL, DB_NAME, DB_USER, DB_PW } = process.env;
const dialectOptions = { decimalNumbers: true };

const sequelize = new Sequelize(JAWSDB_URL || `mysql://${DB_USER}:${DB_PW}@localhost/${DB_NAME}`, {
  dialect: "mysql",
  dialectOptions,
});

// Sequelize export
module.exports = sequelize;