/*
 * @FilePath: executeQuery.js
 * @Author: Aron
 * @Date: 2023-06-20 11:36:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 11:42:37
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
const pool = require("./pool.js"); // 假设连接池模块的路径为 ./db
//下面用于检查数据库是否连接成功
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  connection.query("SELECT 1", (err, result) => {
    connection.release(); // 释放连接

    if (err) {
      console.error("Error executing query:", err);
      return;
    }

    console.log("Database connection successful");
  });
});
//下面用于封装公共的连接池连接和请求方法
function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        reject(err);
        return;
      }

      connection.query(query, params, (error, results) => {
        connection.release(); // 释放连接

        if (error) {
          console.error("Error executing query:", error);
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  });
}

module.exports = executeQuery;
