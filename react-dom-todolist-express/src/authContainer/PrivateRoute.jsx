/*
 * @FilePath: PrivateRoute.jsx
 * @Author: Aron
 * @Date: 2023-06-30 18:08:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-01 20:39:58
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
/*
 * @FilePath: PrivateRoute.jsx
 * @Author: Aron
 * @Date: 2023-06-30 17:53:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 17:55:36
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";

/*
!isLogin ? (
  isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Redirect to="/login" />
  )
) : !isAuthenticated ? (
  <Component {...props} />
) : (
  <Redirect to="/login" />
)

isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
*/

const PrivateRoute = ({ component: Component, isLogin, userInfo, ...rest }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   if (userInfo.isLogin) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [userInfo.isLogin]);
  // // 在这里打印最新的 isAuthenticated 值
  // useEffect(() => {
  //   console.log(isLogin);
  //   console.log(isAuthenticated);
  // }, [isAuthenticated]);
  console.log(userInfo.isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLogin ? (
          userInfo.isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : !userInfo.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default connect((state) => ({
  userInfo: state.user,
  token: state.token,
}))(PrivateRoute);
