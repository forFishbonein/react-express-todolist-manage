/*
 * @FilePath: user_reducer.js
 * @Author: Aron
 * @Date: 2023-06-28 14:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 17:33:18
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { ASSIGN, REMOVE } from "../constant";
export default function useReducer(preState, action) {
  if (preState === undefined) {
    preState = {
      id: "",
      account: "",
      username: "",
      age: null,
      isLogin: false,
    };
  }

  // 从action中取出type和data
  const { type, data } = action;

  switch (type) {
    case ASSIGN:
      // 没有对preState进行push或unshift操作，因为redux默认若返回值和之前状态一致，则不更新页面
      return {
        ...data,
        isLogin: true,
      };
    case REMOVE:
      return {
        id: "",
        account: "",
        username: "",
        age: null,
        isLogin: false,
      };
    default:
      return preState;
  }
}
