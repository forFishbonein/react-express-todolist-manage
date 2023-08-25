/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:23:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-19 15:04:21
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import "./index.css";
export default class BaseFooter extends Component {
  render() {
    return (
      <div className="footer-wapper">
        <div className="text">TodoList By Aron.</div>
      </div>
    );
  }
}
