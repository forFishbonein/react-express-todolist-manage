/*
 * @FilePath: pool.js
 * @Author: Aron
 * @Date: 2023-06-20 11:16:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 11:41:30
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// const mysql = require("mysql");
// let connection = mysql.createConnection({
//   host: "47.98.138.0",
//   user: "todolist",
//   password: "cAS5GtRc2RtkR5tE",
//   database: "data", //数据库名称
// });
// module.exports = connection;
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "47.98.138.0",
  user: "todolist",
  password: "cAS5GtRc2RtkR5tE",
  database: "todolist", //数据库名称！（不是表名）
});

module.exports = pool;
