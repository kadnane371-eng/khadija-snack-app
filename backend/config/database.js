const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME || "hamid_snack_db";
const dbUser = process.env.DB_USER || process.env.DB_user || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = Number(process.env.DB_PORT || 5432);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: false,
  },
});

module.exports = sequelize;