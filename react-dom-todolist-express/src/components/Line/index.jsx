/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-20 16:36:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-01 20:34:25
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// 引入 ECharts 主模块
// import * as echarts from "echarts/lib/echarts";
// import { GridComponent } from "echarts/components";
// echarts.use([GridComponent]);
// import echarts from "echarts";
import React, { Component } from "react";
import "./index.css";
import ReactECharts from "echarts-for-react";
import { getLineData } from "../../api/analysis";
export default class Line extends Component {
  // myRef = React.createRef();
  state = {
    option: {},
  };
  getData = async () => {
    try {
      //await风格写法
      let res = await getLineData(); //调用方法
      let dates = res.data[0];
      let nums = res.data[1];
      // if (res.code === 0) {
      //   this.getAllTings();
      // } else {
      //   console.log(res.message);
      // }
      this.setState({
        option: {
          xAxis: {
            type: "category",
            data: dates,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: nums,
              type: "line",
              smooth: true,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // initEcharts = () => {
  // 基于准备好的dom，初始化echarts实例
  // var myChart = echarts.init(document.getElementById("main"));
  // this.myChart = echarts.init(this.myRef.current);
  // // 绘制图表
  // this.myChart.setOption({
  //   xAxis: {
  //     type: "category",
  //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: "line",
  //       smooth: true,
  //     },
  //   ],
  // });
  // };
  componentDidMount() {
    // this.initEcharts();
    this.getData();
  }
  // componentWillUnmount() {
  //   // this.myChart.dispose(); // 组件卸载时销毁图表实例
  // }
  render() {
    return (
      // <div ref={this.myRef} className="line-container">
      <div className="line-container">
        <ReactECharts option={this.state.option} />
      </div>
    );
  }
}
