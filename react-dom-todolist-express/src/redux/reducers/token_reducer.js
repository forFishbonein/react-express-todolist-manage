/*
 * @FilePath: token_reducer.js
 * @Author: Aron
 * @Date: 2023-06-30 14:44:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 15:38:48
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
/*
 * @FilePath: user_reducer.js
 * @Author: Aron
 * @Date: 2023-06-28 14:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 14:34:41
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { SETTOKEN, REMOVETOKEN } from "../constant";

export default function useReducer(preState, action) {
  if (preState === undefined) {
    preState = {
      token: "",
    };
  }

  // 从action中取出type和data
  const { type, data } = action;

  switch (type) {
    case SETTOKEN:
      // 没有对preState进行push或unshift操作，因为redux默认若返回值和之前状态一致，则不更新页面
      return {
        token: data,
      };
    case REMOVETOKEN:
      return {
        token: "",
      };
    default:
      return preState;
  }
}
