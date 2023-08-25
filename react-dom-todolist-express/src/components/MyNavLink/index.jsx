/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:17:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-19 14:17:38
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyNavLink extends Component {
  render() {
    return (
      <NavLink
        activeClassName="add"
        className="list-group-item"
        {...this.props}
      ></NavLink>
    );
  }
}
