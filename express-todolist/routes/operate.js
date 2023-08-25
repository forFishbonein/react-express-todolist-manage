/*
 * @FilePath: operate.js
 * @Author: Aron
 * @Date: 2023-06-20 10:45:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 15:57:51
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
var express = require("express");

var route = express.Router();
// var pool = require("../db/pool.js");
// var connection = require("../db/sql.js");
const executeQuery = require("../db/executeQuery");

//获取所有数据
route.get("/", async (req, res) => {
  //本文件引入数据库连接：
  // console.log(connection);
  // connection.query(
  //   "select * from data where is_deleted = 0",
  //   function (error, results) {
  //     res.send({
  //       code: 0,
  //       data: results,
  //     });
  //   }
  // );
  //本文件引入连接池：
  // try {
  //   const results = await new Promise((resolve, reject) => {
  //     connection.query(
  //       "SELECT * FROM data WHERE is_deleted = 0",
  //       function (error, results) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       }
  //     );
  //   });
  //   res.send({
  //     code: 0,
  //     data: results,
  //   });
  // } catch (error) {
  //   res.status(500).send({
  //     code: -1,
  //     message: "Error retrieving data",
  //   });
  // }
  //使用数据库连接池公共封装方法：
  const query = "SELECT * FROM data WHERE is_deleted = 0";
  executeQuery(query)
    .then((results) => {
      let data = results.map((e) => {
        return {
          id: e.id,
          time: e.time,
          title: e.title,
          notes: e.notes,
          lastEditTime: e.last_edit_time,
          createTime: e.create_time,
          userName: e.user_name,
          isDid: e.is_did,
        };
      });
      res.send({
        code: 0,
        data: data,
      });
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
route.post("/", (req, res) => {
  //使用数据库连接池公共封装方法：
  //插入的简写语法：
  // const user ={
  //   password:'8888',
  //   username:'耶耶耶',
  // }
  // executeQuery('insert into users set ?',user)
  let obj = req.body;
  //这里应该没有必要去重插入
  const query =
    "insert into data (time, title, notes, is_did, is_deleted, last_edit_time, create_time, user_name) value (?, ?, ?, ?, ?, ?, ?, ?)";
  executeQuery(query, [
    obj.time,
    obj.title,
    obj.notes,
    0,
    0,
    new Date(),
    new Date(),
    obj.userName,
  ])
    .then((results) => {
      //受影响的行数
      if (results.affectedRows >= 1) {
        res.send({
          code: 0,
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
//删除一条数据
route.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = "update data set is_deleted=1 where id=?";
  executeQuery(query, id)
    .then((results) => {
      //受影响的行数
      if (results.affectedRows >= 1) {
        res.send({
          code: 0,
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
//编辑一条数据
route.put("/:id", (req, res) => {
  let obj = req.body;
  const id = req.params.id;
  const query =
    "update data set time=?, title=?, notes=?, is_did=?, is_deleted=?, last_edit_time=?, create_time=?, user_name=? where id=?";
  executeQuery(query, [
    obj.time,
    obj.title,
    obj.notes,
    obj.isDid,
    0,
    new Date(),
    new Date(obj.createTime), //把字符串转换为 Date
    obj.userName,
    id,
  ])
    .then((results) => {
      //受影响的行数
      if (results.affectedRows >= 1) {
        res.send({
          code: 0,
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
//完成一个任务
route.put("/complete/:id", (req, res) => {
  const id = req.params.id;
  const query1 = "select is_did from data where id=?";
  executeQuery(query1, id)
    .then((results) => {
      // console.log(results);
      if (results[0].is_did === 1) {
        const query2 = "update data set is_did=0 where id=?";
        executeQuery(query2, id)
          .then((results) => {
            //受影响的行数
            if (results.affectedRows >= 1) {
              res.send({
                code: 0,
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
      } else {
        const query2 = "update data set is_did=1 where id=?";
        executeQuery(query2, id)
          .then((results) => {
            //受影响的行数
            if (results.affectedRows >= 1) {
              res.send({
                code: 0,
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
const getAllCompleteFlag = () => {
  return new Promise((resolve, reject) => {
    //看不等于 1 的数量是多少，如果不等于 1 的是 0 的话，那就说明已经全部完成了，那么就应该设置为  0（全都未完成），否则全部设置 为 1
    const query1 = "SELECT COUNT(*) AS count FROM data WHERE is_did <> 1";
    executeQuery(query1)
      .then((results) => {
        //受影响的行数
        if (results[0].count === 0) {
          resolve(1); //全部完成
        } else {
          resolve(0); //没有全部完成
        }
      })
      .catch((error) => {
        resolve(2); //出错了
      });
  });
};
//完成所有任务
route.get("/complete", async (req, res) => {
  try {
    //await风格写法
    const flag = await getAllCompleteFlag(); //调用方法
    if (flag === 1) {
      //全部完成了
      //全部设置为 0
      const query2 = "update data set is_did=0";
      executeQuery(query2)
        .then((results) => {
          //受影响的行数
          if (results.affectedRows >= 1) {
            res.send({
              code: 0,
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
    } else if (flag === 0) {
      //全部设置为 1
      const query2 = "update data set is_did=1";
      executeQuery(query2)
        .then((results) => {
          //受影响的行数
          if (results.affectedRows >= 1) {
            res.send({
              code: 0,
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
    } else if (flag === 2) {
      res.status(500).send({
        code: -1,
        message: "Error retrieving data",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});
//是否全部完成了
route.get("/isAllComplete", async (req, res) => {
  try {
    //await风格写法
    const flag = await getAllCompleteFlag(); //调用方法
    if (flag === 1) {
      res.send({
        code: 0,
        flag: true, //全部完成了
      });
    } else if (flag === 0) {
      res.send({
        code: 0,
        flag: false, //没有全部完成
      });
    } else if (flag === 2) {
      res.status(500).send({
        code: -1,
        message: "Error retrieving data",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = route;
