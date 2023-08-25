/*
 * @FilePath: analysis.js
 * @Author: Aron
 * @Date: 2023-06-20 10:49:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 20:42:11
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
var express = require("express");
var route = express.Router();
const executeQuery = require("../db/executeQuery");

route.get("/line", async (req, res) => {
  //使用数据库连接池公共封装方法：
  // const query =
  //   "SELECT * FROM data WHERE create_time >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND create_time <= NOW()";
  // const query =
  //   "SELECT DATE(create_time) AS date, COUNT(*) AS count FROM data WHERE create_time >= NOW() - INTERVAL 7 DAY GROUP BY DATE(create_time) ORDER BY DATE(create_time)";
  // const query =
  //   "SELECT DATE(DATE(create_time)) AS date, COUNT(*) AS count FROM data WHERE DATE(create_time) >= DATE(NOW() - INTERVAL 7 DAY) AND DATE(create_time) <= DATE(NOW()) GROUP BY DATE(create_time) ORDER BY DATE(create_time)";
  // const query =
  //   "SELECT DATE(DATE(CONVERT_TZ(create_time, 'UTC', 'Asia/Shanghai'))) AS date, COUNT(*) AS count FROM data WHERE DATE(CONVERT_TZ(create_time, 'UTC', 'Asia/Shanghai')) >= DATE(CONVERT_TZ(NOW() - INTERVAL 7 DAY, 'UTC', 'Asia/Shanghai')) \
  //   AND DATE(CONVERT_TZ(create_time, 'UTC', 'Asia/Shanghai')) <= DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Shanghai')) \
  // GROUP BY DATE(CONVERT_TZ(create_time, 'UTC', 'Asia/Shanghai')) \
  // ORDER BY DATE(CONVERT_TZ(create_time, 'UTC', 'Asia/Shanghai'))";
  const query =
    "SELECT DATE(create_time) AS date, COUNT(*) AS count\
    FROM data\
    WHERE DATE(create_time) >= DATE(NOW() - INTERVAL 7 DAY)\
    AND DATE(create_time) <= DATE(NOW())\
    GROUP BY DATE(create_time)\
    ORDER BY DATE(create_time)";
  executeQuery(query)
    .then((results) => {
      // let resultDates = [];
      // for (let i = 0; i < results.length; i++) {
      //   let date = results[i].date.toISOString().substring(0, 10);
      //   resultDates.push(date); //匹配上了就赋值退出循环
      // }
      console.log(results);
      // console.log(resultDates);
      const today = new Date(); // 当前日期
      const sevenDaysAgo = new Date(); // 近 7 天的日期
      sevenDaysAgo.setDate(today.getDate() - 6); // 设置为当前日期往前推 6 天
      // 获取近 7 天的日期数组
      let dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
        dates.push(date.toISOString().substring(0, 10));
      }
      let nums = [];
      let alreadyDates = [];
      //加一天
      function addOneDay(date) {
        const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
        const newDate = new Date(date.getTime() + oneDay);
        return newDate;
      }
      dates.forEach((e) => {
        for (let i = 0; i < results.length; i++) {
          let date = addOneDay(results[i].date).toISOString().substring(0, 10);
          if (e == date) {
            nums.push(results[i].count);
            alreadyDates.push(e); //匹配上了就赋值退出循环
            break;
          }
        }
        //如果到最后没有匹配上，那么就给个 0
        if (!alreadyDates.includes(e)) {
          nums.push(0);
        }
      });
      console.log(dates);
      console.log(nums);
      // let data = results.map((e) => {
      //   return {
      //     id: e.id,
      //     time: e.time,
      //     title: e.title,
      //     notes: e.notes,
      //     lastEditTime: e.last_edit_time,
      //     createTime: e.create_time,
      //     userName: e.user_name,
      //     isDid: e.is_did,
      //   };
      // });
      res.send({
        code: 0,
        data: [dates, nums],
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
route.get("/pie", async (req, res) => {
  const query =
    "SELECT\
    COUNT(CASE WHEN is_did = 1 THEN 1 END) AS count_did_1,\
    COUNT(CASE WHEN is_did = 0 THEN 1 END) AS count_did_0\
    FROM data";
  executeQuery(query)
    .then((results) => {
      let isDid = results[0].count_did_1;
      let isNotDid = results[0].count_did_0;
      res.send({
        code: 0,
        data: [isDid, isNotDid],
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
module.exports = route;
