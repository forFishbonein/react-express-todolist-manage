/*
 * @FilePath: operate.js
 * @Author: Aron
 * @Date: 2023-06-20 14:15:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 15:17:31
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import httpRequest from "../request";
export const getAllData = () => {
  return httpRequest({
    method: "get",
    url: "/operate",
  });
};
export const isAllComplete = () => {
  return httpRequest({
    method: "get",
    url: "/operate/isAllComplete",
  });
};
export const addOneThing = (data) => {
  return httpRequest({
    method: "post",
    data: data,
    url: "/operate",
  });
};
export const deleteOneThing = (id) => {
  return httpRequest({
    method: "delete",
    url: `/operate/${id}`,
  });
};
export const editOneThing = (id, data) => {
  return httpRequest({
    method: "put",
    data: data,
    url: `/operate/${id}`,
  });
};
export const completeOneThing = (id) => {
  return httpRequest({
    method: "put",
    url: `/operate/complete/${id}`,
  });
};
export const completeAllThing = () => {
  return httpRequest({
    method: "get",
    url: "/operate/complete",
  });
};
