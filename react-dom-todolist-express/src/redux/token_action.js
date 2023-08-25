/*
 * @FilePath: token_action.js
 * @Author: Aron
 * @Date: 2023-06-30 14:44:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-03 14:28:35
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { SETTOKEN, REMOVETOKEN } from "./constant";
import { loginGetToken } from "../api/login";
import { message } from "antd";

export const setToken = (data) => {
  return { type: SETTOKEN, data };
};
export const removeToken = () => {
  return { type: REMOVETOKEN };
};

export const loginAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await loginGetToken(data);
      if (res.code === 0) {
        dispatch(setToken(res.data.token));
        return res; // 返回结果
      } else {
        message.error(res.message);
      }
    } catch (e) {
      message.error(e.message);
    }
  };
  // return (dispatch) => {
  //   loginGetToken().then((res) => {
  //     dispatch(setToken(res.data.token));
  //   });
  // };
};
