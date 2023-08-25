/*
 * @FilePath: user_action.js
 * @Author: Aron
 * @Date: 2023-06-28 14:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 18:49:05
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { ASSIGN, REMOVE } from "./constant";
import { getUserInfo } from "../api/login";
import { message } from "antd";

//同步action，就是指action的值为Object类型的一般对象
export const assign = (data) => {
  return { type: ASSIGN, data };
};
export const remove = () => {
  return { type: REMOVE };
};
//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const assignAsync = (data, delay) => {
  return async (dispatch) => {
    try {
      const res = await getUserInfo(data);
      if (res.code === 0) {
        dispatch(assign(res.data));
        return res; // 返回结果
      } else {
        message.error(res.message);
      }
    } catch (e) {
      message.error(e.message);
    }
  };
};
