// 1. 首先引入express库：
const express = require("express");
const cors = require("cors");
// 2. 创建 express 的实例，代表服务器
const app = express();
// 3. 设置监听端口
const port = 8888;

//解决跨域的插件
app.use(cors());

//全局中间件，会处理所有请求
app.use((req, res, next) => {
  console.log(
    `收到请求，请求来自于:${req.get("Host")}，请求的地址：${req.url}`
  );
  next();
});
//配置跨域，必须写在所有路由前面
// app.all("*", function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   next();
// });
//这个必须要写，否则收不到请求体，并且必须写在 listen 的前面
app.use(express.json());

const routes = require("./routes");
routes(app);

// 4. 调用 app.listen 来启动 server 并监听指定端口，启动成功后打印出 log
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);

// 1. 调用 app 中的 get 方法
// 第一个参数是请求的路径，这里处理根路径的请求，
// 第二个参数是处理请求的回调函数，参数分别为请求和响应对象
// app.get("/", (req, res) => {
//   // 在回调函数里，调用响应对象的 send 方法，发送响应给客户端
//   res.send("Hello World!");
// });

// app.post("/", (req, res) => {
//   console.log("收到请求体：", req.body);

//   res.status(201).send();
// });
