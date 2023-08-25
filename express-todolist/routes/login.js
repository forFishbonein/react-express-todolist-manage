/*
 * @FilePath: login.js
 * @Author: Aron
 * @Date: 2023-06-30 15:54:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 17:30:32
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
var express = require("express");
const jwt = require("jsonwebtoken");
// let tempMap = new Map();
const secretKey = "#-123456";
var route = express.Router();
const executeQuery = require("../db/executeQuery");
route.post("/", (req, res) => {
  let obj = req.body;
  const query = "SELECT * FROM user WHERE is_deleted = 0 AND username = ?";
  executeQuery(query, [obj.username])
    .then((results) => {
      if (results[0].password == obj.password) {
        const payload = { id: results[0].id };
        const token = jwt.sign(payload, secretKey);
        // tempMap.set(token, results[0].id); //没有存储的必要，因为我们有钥匙可以解密出来 id
        res.send({
          code: 0,
          data: {
            token: token,
          },
        });
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      res.status(500).send({
        code: -1,
        message: "Error retrieving data",
      });
    });
});
//添加一条数据  //前端需要给 time,title,notes,username 即可
route.post("/user", (req, res) => {
  let obj = req.body;
  if (obj.token) {
    const decoded = jwt.verify(obj.token, secretKey);
    //这里应该没有必要去重插入
    const query = "SELECT * FROM user WHERE is_deleted = 0 AND id = ?";
    executeQuery(query, [decoded.id])
      .then((results) => {
        //受影响的行数
        res.send({
          code: 0,
          data: results[0],
        });
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        res.status(500).send({
          code: -1,
          message: "Error retrieving data",
        });
      });
  } else {
    res.status(500).send({
      code: -1,
      message: "token 错误",
    });
  }
});
module.exports = route;
