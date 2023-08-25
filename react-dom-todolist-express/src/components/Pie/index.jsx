import React, { Component } from "react";
import "./index.css";
import ReactECharts from "echarts-for-react";
import { getPieData } from "../../api/analysis";
export default class Pie extends Component {
  state = {
    option: {},
  };
  getData = async () => {
    try {
      //await风格写法
      let res = await getPieData(); //调用方法
      let isDid = res.data[0];
      let isNotDid = res.data[1];
      // let did = (isDid / (isDid + isNotDid)) * 100 + "%";
      // let notDid = (isNotDid / (isDid + isNotDid)) * 100 + "%";
      let data = [
        {
          name: "已完成",
          value: isDid,
        },
        {
          name: "未完成",
          value: isNotDid,
        },
      ];
      this.setState({
        option: {
          title: {
            text: "完成/未完成百分比",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: data,
              roseType: "radius",
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              label: {
                show: true,
                formatter: function (e) {
                  return (
                    ((e.value / (isDid + isNotDid)) * 100).toFixed(1) + "%"
                  );
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="pie-container">
        <ReactECharts option={this.state.option} />
      </div>
    );
  }
}
