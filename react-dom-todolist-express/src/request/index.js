/**
 * @description [ axios 请求封装]
 */
import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8888", // 所有的请求地址前缀部分
  timeout: 20000, // 请求超时时间毫秒
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    // token: "your token",
    "X-Requested-With": "XMLHttpRequest",
  },
});
service.interceptors.response.use((response) => {
  //必须要返回 res.data，否则层次太多了
  return response.data;
});
export default service;
