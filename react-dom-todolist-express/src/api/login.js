import httpRequest from "../request";
export const loginGetToken = (data) => {
  return httpRequest({
    method: "post",
    data: data,
    url: "/login",
  });
};
export const getUserInfo = (data) => {
  return httpRequest({
    method: "post",
    data: data,
    url: "/login/user",
  });
};
