/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 23:55:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 01:53:25
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import "./index.css";
export default class Dialog extends Component {
  //在构造器里面赋值的话，props 不是最新的
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   this.state = {
  //     data: {
  //       time: props.data.time,
  //       title: props.data.title,
  //       notes: props.data.notes,
  //     },
  //   };
  // }
  state = {
    data: {
      time: "",
      title: "",
      notes: "",
    },
  };
  getInputValue = (type) => {
    return (event) => {
      this.setState({
        data: { ...this.state.data, [type]: event.target.value },
      });
      //这样不行，会把之前的属性弄没
      // this.setState({
      //   data: { [type]: event.target.value },
      // });
      // console.log(this.state.data);
    };
  };
  componentDidMount() {
    //最新的 props 指的是更新流程下的，更新不会调用这个钩子
    //在这里获取不到 最新的props
    // console.log(this.props);
  }
  //要获取更新后的 props，一定是在这个钩子里面！
  componentDidUpdate(prevProps) {
    //prevProps是上一次的 porps
    if (this.props.data.id !== prevProps.data.id) {
      this.setState({
        data: {
          time: this.props.data.time,
          title: this.props.data.title,
          notes: this.props.data.notes,
        },
      });
    }
  }
  render() {
    //console.log(this.props);
    //在 render 里面有最新的 props 值（因为每次更新都会调用），但是不能使用 setState 方法！
    // this.setState({
    //   data: {
    //     time: this.props.data.time,
    //     title: this.props.data.title,
    //     notes: this.props.data.notes,
    //   },
    // });
    const { condition1, condition2, confirm } = this.props;
    if (condition1 || condition2) {
      return (
        <div className="modal-overlay">
          {condition1 && !condition2 ? (
            <div className="delete-dialog">
              确认删除吗？该操作不可逆
              <div className="close-button" onClick={() => confirm(1)}>
                取消
              </div>
              <div className="confirm-button" onClick={() => confirm(2)}>
                确认
              </div>
            </div>
          ) : (
            <div className="edit-dialog">
              <input
                type="text"
                placeholder="请输入时间"
                value={this.state.data.time}
                onChange={this.getInputValue("time")}
              ></input>
              <input
                type="text"
                placeholder="请输入事件标题"
                value={this.state.data.title}
                onChange={this.getInputValue("title")}
              ></input>
              <input
                type="text"
                placeholder="请输入备注"
                value={this.state.data.notes}
                onChange={this.getInputValue("notes")}
              ></input>
              <div className="close-button" onClick={() => confirm(3)}>
                取消
              </div>
              <div
                className="confirm-button"
                onClick={() => confirm(4, this.state.data)}
              >
                确认
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}
