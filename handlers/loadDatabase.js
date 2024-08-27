const mysql = require("mysql");
const config = require("../bot/config.json");

module.exports = (bot) => {
  const db = mysql.createConnection({
    host: config.BDD.host,
    port: config.BDD.port,
    user: config.BDD.user,
    password: config.BDD.password,
    database: config.BDD.database,
    charset: config.BDD.charset,
  });

  return db;
};
