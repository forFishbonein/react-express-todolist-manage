import httpRequest from "../request";
export const getLineData = () => {
  return httpRequest({
    method: "get",
    url: "/analysis/line",
  });
};
export const getPieData = () => {
  return httpRequest({
    method: "get",
    url: "/analysis/pie",
  });
};
