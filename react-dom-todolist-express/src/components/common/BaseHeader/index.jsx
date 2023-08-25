/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:20:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 18:52:26
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { remove } from "../../../redux/user_action";
import { removeToken } from "../../../redux/token_action";
import "./index.less";
class BaseHeader extends Component {
  onLogout = async () => {
    console.log(this.props);
    this.props.remove();
    this.props.removeToken();
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="header-wapper">
        <div className="title">
          <Link to="/">HAOLIST</Link>
        </div>
        {/*
          在 JSX 中，不能使用 if 语句作为直接的表达式
          {if(!this.props.loginPage){
            return <div className="login-status">
            <Link to="/login">登录</Link>
              </div>
          }}
        */}
        {!this.props.loginPage ? (
          <div className="login-status">
            {this.props.userInfo.isLogin ? (
              <>
                <a className="user-name">{this.props.userInfo.username}</a>
                <div className="logout">
                  <a onClick={this.onLogout}>退出登录</a>
                </div>
              </>
            ) : (
              <Link to="/login">登录</Link>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
export default withRouter(
  connect(
    (state) => ({
      userInfo: state.user,
      token: state.token,
    }),
    {
      removeToken, //会默认分发（dispatch）
      remove,
    }
  )(BaseHeader)
);
