/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-28 11:02:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-03 14:26:47
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
//引入action（必须的）
import { assignAsync } from "../../redux/user_action";
import { loginAsync } from "../../redux/token_action";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import BaseHeader from "../../components/common/BaseHeader";
import "./index.less";
//登录获取 token并请求用户数据并保存
//不能命名为assignAsync
function Login({ userInfo, token, assignAsync, loginAsync, history }) {
  const onLogin = async (values) => {
    try {
      console.log("Received values of form: ", values);
      let params = { username: values.username, password: values.password };
      let res = await loginAsync(params);
      let params2 = {
        token: res.data.token,
      };
      await assignAsync(params2);
      message.success("登录成功！");
      history.push("/");
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <>
      <BaseHeader loginPage={true}></BaseHeader>
      <div className="login-container">
        <div className="login-broad">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名！" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码！" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              {/* <a className="login-form-forgot" href="">
                Forgot password
              </a> */}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
//使用connect()()创建并暴露这个 连接起来的容器组件 + UI组件（其实本质上是一个Login组件的容器组件）
export default connect(
  (state) => ({ userInfo: state.user, token: state.token }),
  {
    assignAsync,
    loginAsync,
  }
)(Login);
