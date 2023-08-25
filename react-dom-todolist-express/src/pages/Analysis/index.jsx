/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:06:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 20:55:08
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import MyNavLink from "../../components/MyNavLink";
import Line from "../../components/Line";
import Pie from "../../components/Pie";
import { Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
export default class Analysis extends Component {
  render() {
    return (
      <>
        <div className="data-wapper">
          <MyNavLink to="/analysis/line">添加量时间分布</MyNavLink>
          <MyNavLink to="/analysis/pie">完成量总体占比</MyNavLink>
        </div>
        <div className="body-graph-wapper">
          <Switch>
            <Route path="/analysis/line" component={Line} />
            <Route path="/analysis/pie" component={Pie} />
            <Redirect to="/analysis/line" />
          </Switch>
        </div>
      </>
    );
  }
}
