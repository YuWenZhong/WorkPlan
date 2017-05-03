// pages/new/new.js
var util = require('../../utils/utils.js')
Page({
  data: {
    time1: '2017-09-01',
    time2: '2017-09-01',
    time_start: '2017-09-01',
    time_end: '2020-12-31',
    zyx: 0,   //标识重要性,
    title: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var myDate = new Date();
    myDate.toLocaleDateString();  //获取当前日期
    myDate.getFullYear();
    that.setData({
      time1: util.changTimeFomatt(),
      time2: util.changTimeFomatt(),
      time_start: util.changTimeFomatt2(),
      time_end: (myDate.getFullYear()+3)+'-12-31'
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  bindDateChange1: function (e) {
    var that = this
    // var timestamp1 = Date.parse(new Date(e.detail.value));
    // timestamp1 = timestamp1 / 1000;
    // console.log(timestamp1)
    // var timestamp2 = Date.parse(new Date(that.data.time2));
    // timestamp2 = timestamp2 / 1000;
    // console.log(timestamp2)
    if (Date.parse(new Date(e.detail.value)) > Date.parse(new Date(that.data.time2))) {
      that.setData({
        time2: e.detail.value
      })
    }
    that.setData({
      time1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    var that = this
    if (Date.parse(new Date(e.detail.value)) < Date.parse(new Date(that.data.time1))) {
      that.setData({
        time1: e.detail.value
      })
    }
    that.setData({
      time2: e.detail.value
    })
  },
  tap_zy: function (e) {
    var that = this;
    //点击重要性进度条
    console.log(e.currentTarget.id)
    that.setData({
      zyx: parseInt(e.currentTarget.id)
    })
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    var that = this
    this.setData({
      title: e.detail.value
    })
  },
  TapOk: function () {
    var that = this;
    var tasklist = [];
    if (that.data.title == "") {
      console.log("请输入任务名称");
    } else {
      wx.getStorage({
        key: 'tasklist',
        success: function (res) {
          console.log(res.data)
          tasklist = JSON.parse(res.data);
          tasklist.push({
            id: new Date().getTime(),
            title: that.data.title,
            zyx: that.data.zyx,
            time1: that.data.time1,
            time2: that.data.time2,
            flag: '0'
          })
          wx.setStorage({
            key: "tasklist",
            data: JSON.stringify(tasklist)
          })
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function (res) {
          tasklist.push({
            id: new Date().getTime(),
            title: that.data.title,
            zyx: that.data.zyx,
            time1: that.data.time1,
            time2: that.data.time2,
            flag: '0'
          })
          wx.setStorage({
            key: "tasklist",
            data: JSON.stringify(tasklist)
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  }
})