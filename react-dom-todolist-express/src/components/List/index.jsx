/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:10:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 16:06:24
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import "./index.css";
// import { timeFormatter } from "./index.js";
export default class List extends Component {
  state = {
    allData: [],
  };
  edit = (data) => {
    this.props.edit(data); // 调用父组件传递的回调函数，并传递数据
  };
  delete = (data) => {
    this.props.delete(data); // 调用父组件传递的回调函数，并传递数据
  };
  complete = (data) => {
    this.props.complete(data); // 调用父组件传递的回调函数，并传递数据
  };
  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ allData: this.props.initialValue });
      // console.log(this.state.allData);
    }
  }
  //得到后端的都是 string 数据，即便查出来是 Date，我们前端还是要转换为 string
  timeFormatter(timeString) {
    let time = new Date(timeString);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  }
  render() {
    // console.log(this.props);
    if (this.props.allData.length > 0) {
      let list = this.props.allData.map((e) => {
        return (
          <div key={e.id} className="item-line">
            <div className="radio-container">
              {/* 一定不要给 radio 加 name 否则就变成大家是一组的了，就只能有一个被选中 */}
              <input type="radio" checked={e.isDid === 1} readOnly />
              <span
                className="radio-custom"
                onClick={() => this.complete(e.id)}
              ></span>
            </div>
            <div>{e.time}</div>
            <div>{e.title}</div>
            <div>{e.notes}</div>
            <div>{e.userName}</div>
            <div>{this.timeFormatter(e.lastEditTime)}</div>
            <div>{this.timeFormatter(e.createTime)}</div>
            <div>
              <div className="edit" onClick={() => this.edit(e)}>
                编辑
              </div>
              <div className="delete" onClick={() => this.delete(e.id)}>
                删除
              </div>
            </div>
          </div>
        );
      });
      return (
        <>
          <div className="list-title">
            <div>完成状态</div>
            <div>时间</div>
            <div>标题</div>
            <div>备注</div>
            <div>编辑人</div>
            <div>编辑时间</div>
            <div>创建时间</div>
            <div>操作</div>
          </div>
          <div className="list-body">{list}</div>
        </>
      );
    } else {
      return <></>;
    }
  }
}
