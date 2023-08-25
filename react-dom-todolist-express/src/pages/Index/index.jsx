/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:19:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-01 20:51:36
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import BaseHeader from "../../components/common/BaseHeader";
import BaseFooter from "../../components/common/BaseFooter";
import BaseNavBar from "../../components/common/BaseNavBar";
import { Route, Switch, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
import Staging from "../Staging";
import Analysis from "../Analysis";
import PrivateRoute from "../../authContainer/PrivateRoute";
import "./index.css";

export default class Index extends Component {
  // state = {
  //   isAuthenticated: false, // 假设用户登录状态
  // };
  // componentDidMount() {
  //   console.log(this.props.userInfo);
  //   console.log(this.props.token);
  //   if (this.props.userInfo.isLogin) {
  //     this.setState({
  //       isAuthenticated: true,
  //     });
  //   } else {
  //     this.setState({
  //       isAuthenticated: false,
  //     });
  //   }
  // }
  render() {
    return (
      <>
        <BaseHeader loginPage={false}></BaseHeader>
        <div className="main-wapper">
          <div className="main-left">
            <BaseNavBar></BaseNavBar>
          </div>
          <div className="main-right">
            <div className="body-wapper">
              <Switch>
                <Route path="/staging" component={Staging} />
                {/* <PrivateRoute
                  path="/staging"
                  component={Staging}
                  isAuthenticated={this.state.isAuthenticated}
                /> */}
                <PrivateRoute
                  path="/analysis"
                  component={Analysis}
                  isLogin={false}
                />
                {/* <Route path="/staging" component={Staging} />
                <Route path="/analysis" component={Analysis} /> */}
                <Redirect to="/staging" />
              </Switch>
            </div>
          </div>
        </div>
        <BaseFooter></BaseFooter>
      </>
    );
  }
}
// export default connect((state) => ({
//   userInfo: state.user,
//   token: state.token,
// }))(Index);
