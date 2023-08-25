/*
 * @FilePath: config-overrides.js
 * @Author: Aron
 * @Date: 2023-06-28 14:20:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-28 19:02:39
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
//配置具体的修改规则
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
  //配置按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  //配置 less 的使用
  addLessLoader({
    // lessOptions: {
    javascriptEnabled: true,
    // less: {
    //   javascriptEnabled: true,
    // },
    localIdentName: "[local]--[hash:base64:5]",
    modifyVars: {
      "@primary-color": "#646cff",
      "@link-color": "#646cff",
      "@success-color": "#52c41a",
    }, //把主要的颜色改为紫色
    // },
  })
);
