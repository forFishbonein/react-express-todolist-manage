/*
 * @FilePath: index.js
 * @Author: Aron
 * @Date: 2023-06-20 10:45:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 16:17:17
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
const operate = require("./operate");
const analysis = require("./analysis");
const login = require("./login");

module.exports = (app) => {
  app.use("/operate", operate);
  app.use("/analysis", analysis);
  app.use("/login", login);
};
