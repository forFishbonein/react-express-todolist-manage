/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 20:03:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-19 20:13:08
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import MyNavLink from "../../MyNavLink";
import "./index.css";
export default class BaseNavBar extends Component {
  render() {
    return (
      <div className="nav-wapper">
        <MyNavLink to="/staging">工作台</MyNavLink>
        <MyNavLink to="/analysis">数据分析</MyNavLink>
      </div>
    );
  }
}
