/*
 * @FilePath: index.jsx
 * @Author: Aron
 * @Date: 2023-06-19 14:06:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-03 14:28:56
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import React, { Component } from "react";
import List from "../../components/List";
import "./index.css";
import Dialog from "../../components/Dialog";
import { message } from "antd";
import {
  getAllData,
  addOneThing,
  deleteOneThing,
  editOneThing,
  completeOneThing,
  completeAllThing,
  isAllComplete,
} from "../../api/operate";
import { connect } from "react-redux";
class Staging extends Component {
  /*
    1.时间

    2.标题

    3.备注

    4.是否完成 isDid

    5.是否删除

    6.主键

    7.最后编辑时间 lastEditTime

    8.编辑人 userName

    9.创建时间 createTime
  */
  state = {
    input: {
      time: "",
      title: "",
      notes: "",
    },
    allData: [],
    editData: {},
    showDialogDelete: false,
    showDialogEdit: false,
    deleteId: null,
    isAllChecked: false,
    numAlready: null,
    numWill: null,
  };
  getAllTings = async () => {
    try {
      //await风格写法
      let res = await getAllData(); //调用方法
      console.log(res);
      if (res.code === 0) {
        let data = res.data || [];
        this.setState({
          allData: data,
        });
        this.getIsAllComplete();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  getIsAllComplete = async () => {
    try {
      //await风格写法
      let res = await isAllComplete(); //调用方法
      console.log(res);
      if (res.code === 0) {
        this.setState({
          isAllChecked: res.flag,
        });
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  getInputValue = (type) => {
    return (event) => {
      this.setState({
        input: { ...this.state.input, [type]: event.target.value },
      });
      //这样不行，会把之前的属性弄没
      // this.setState({
      //   data: { [type]: event.target.value },
      // });
      // console.log(this.state.input);
    };
  };
  addOneThing = async () => {
    try {
      let params = {
        time: this.state.input.time,
        title: this.state.input.title,
        notes: this.state.input.notes,
        userName: this.props.userInfo.username,
      };
      //await风格写法
      let res = await addOneThing(params); //调用方法
      if (res.code === 0) {
        this.setState({
          input: {
            time: "",
            title: "",
            notes: "",
          },
        });
        message.success("添加成功！");
        this.getAllTings();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  editOneThing = (data) => {
    this.setState({
      editData: data,
      showDialogEdit: true,
    });
  };
  saveTheEdit = async (data) => {
    //Object.assign合并两个对象，后面的会把前面已有的覆盖，没有的就添加到前面！
    const newItem = Object.assign(this.state.editData, data);
    newItem.createTime = newItem.createTime.toString();
    console.log(newItem);
    try {
      //await风格写法
      let res = await editOneThing(this.state.editData.id, newItem); //调用方法
      if (res.code === 0) {
        this.getAllTings();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  deleteOneThing = (id) => {
    this.setState({
      showDialogDelete: true,
      deleteId: id,
    });
  };
  confirmDelete = async (id) => {
    try {
      //await风格写法
      let res = await deleteOneThing(id); //调用方法
      if (res.code === 0) {
        this.getAllTings();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  getConfirm = (flag, data) => {
    this.setState({
      showDialogDelete: false,
      showDialogEdit: false,
    });
    if (flag === 2) {
      this.confirmDelete(this.state.deleteId);
    }
    if (flag === 4) {
      this.saveTheEdit(data);
    }
  };
  completeOneThing = async (id) => {
    try {
      //await风格写法
      let res = await completeOneThing(id); //调用方法
      if (res.code === 0) {
        this.getAllTings();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  completeAllThinds = async () => {
    try {
      //await风格写法
      let res = await completeAllThing(); //调用方法
      if (res.code === 0) {
        this.getAllTings();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  componentDidMount() {
    this.getAllTings();
  }
  componentDidUpdate(prevProps, prevState) {
    //这里实现了类似计算属性的功能，动态计算numAlready和numWill
    //注意：一定要判断prevState.numAlready !== num1 ||prevState.numWill !== this.state.num2，否则一直使用 setState，这个回调会永远进行下去，就栈溢出了！
    //实际上在初次打开页面的时候也会调用，因为在渲染完成之后调用了查询数据的接口，返回数据并赋值之后，就会执行这个更新的回调，所以可以被调用
    let num1 = 0;
    this.state.allData.forEach((e) => {
      if (e.isDid === 1) {
        num1 += 1;
      }
    });
    const num2 = this.state.allData.length;
    if (prevState.numAlready !== num1 || prevState.numWill !== num2) {
      this.setState({
        numAlready: num1,
        numWill: num2,
      });
    }
  }
  render() {
    return (
      <>
        <div className="search-wapper">
          <input
            type="text"
            placeholder="请输入时间"
            value={this.state.input.time}
            onChange={this.getInputValue("time")}
          ></input>
          <input
            type="text"
            placeholder="请输入事件标题"
            value={this.state.input.title}
            onChange={this.getInputValue("title")}
          ></input>
          <input
            type="text"
            placeholder="请输入备注"
            value={this.state.input.notes}
            onChange={this.getInputValue("notes")}
          ></input>
          <div className="button" onClick={this.addOneThing}>
            添加
          </div>
        </div>
        <div className="list-wapper">
          <List
            allData={this.state.allData}
            edit={this.editOneThing}
            delete={this.deleteOneThing}
            complete={this.completeOneThing}
          ></List>
        </div>
        <div className="end-wapper">
          <div className="radio-container">
            <input type="radio" checked={this.state.isAllChecked} readOnly />
            <span
              className="radio-custom"
              onClick={this.completeAllThinds}
            ></span>
            &nbsp;全部完成
          </div>
          <div className="text-did">
            已完成{this.state.numAlready}/{this.state.numWill}
          </div>
        </div>
        <Dialog
          condition1={this.state.showDialogDelete}
          condition2={this.state.showDialogEdit}
          data={this.state.editData}
          confirm={this.getConfirm}
        ></Dialog>
      </>
    );
  }
}
export default connect((state) => ({
  userInfo: state.user,
  token: state.token,
}))(Staging);
