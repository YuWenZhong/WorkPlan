// pages/ing/ing.js
var util = require('../../utils/utils.js')
var clientXstart = 0
Page({
  data: {
    list: [],
    list_show: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.nickName)
              console.log(res.userInfo.avatarUrl)
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.getStorage({
      key: 'tasklist',
      success: function (res) {
        console.log(res.data)
        var s2 = new Date();
        var list = JSON.parse(res.data)
        var list_show = []
        for (var i = 0; i < list.length; i++) {
          if (list[i].flag == '0') {
            var item = list[i]
            var s1 = new Date((item.time2).replace(/-/g, "/"));//结束时间
            var s3 = new Date((item.time1).replace(/-/g, "/"));//开始时间
            var days = s1.getTime() - s2.getTime();
            var days_start = s3.getTime() - s2.getTime();
            var time = Math.ceil(days / (1000 * 60 * 60 * 24));
            var time_start = Math.ceil(days_start / (1000 * 60 * 60 * 24))
            item.time = time;
            item.time_start = time_start;
            list_show.push(item)
          }
        }
        //按天数从小到大排序
        list_show.sort(function (a, b) {
          return a.time - b.time
        })
        that.setData({
          list_show: list_show,
          list: list
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  TapNew: function (e) {
    wx.navigateTo({
      url: '../new/new'
    })
  },
  touchstart: function (e) {
    // console.log(e.touches[0].clientX)
    clientXstart = e.touches[0].clientX;
  },
  touchmove: function (e) {
    // console.log(e.touches[0].clientX)
    console.log(clientXstart - e.touches[0].clientX)
  },
  rwywc: function (e) {
    var that = this
    console.log(e.target.dataset.item)
    var s1 = new Date((e.target.dataset.item.time1).replace(/-/g, "/"))
    var s2 = new Date();
    var days = s2.getTime() - s1.getTime();
    console.log(days / (1000 * 60 * 60 * 24));
    var time = Math.ceil(days / (1000 * 60 * 60 * 24));

    wx.showModal({
      title: '确认完成',
      content: '当前任务已完成，共用时' + time + '天',
      cancelColor: '#b6b6b6',
      confirmColor: '#009966',
      success: function (res) {
        if (res.confirm) {
          // 用户点击确定
          var list = that.data.list;
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == e.target.dataset.item.id) {
              console.log('提示提示')
              list[i].flag = '1'    //0正在进行，1完成，2取消
              list[i].time3 = util.changTimeFomatt()
              list[i].wcsj = new Date().getTime()
              wx.setStorage({
                key: "tasklist",
                data: JSON.stringify(list)
              })
              // break;
            }
          }
          wx.getStorage({
            key: 'tasklist',
            success: function (res) {
              console.log(res.data)
              var s2 = new Date();
              var list = JSON.parse(res.data)
              var list_show = []
              for (var i = 0; i < list.length; i++) {
                if (list[i].flag == '0') {
                  var item = list[i]
                  var s1 = new Date((item.time2).replace(/-/g, "/"));//结束时间
                  var s3 = new Date((item.time1).replace(/-/g, "/"));//开始时间
                  var days = s1.getTime() - s2.getTime();
                  var days_start = s3.getTime() - s2.getTime();
                  var time = Math.ceil(days / (1000 * 60 * 60 * 24));
                  var time_start = Math.ceil(days_start / (1000 * 60 * 60 * 24))
                  item.time = time;
                  item.time_start = time_start;
                  list_show.push(item)
                }
              }
              //按天数从小到大排序
              list_show.sort(function (a, b) {
                return a.time - b.time
              })
              that.setData({
                list_show: list_show,
                list: list
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  tipItem: function (e) {
    var that = this
    wx.showModal({
      title: '任务详情',
      content: '任务名称：' + e.currentTarget.dataset.item.title + '\r\n\r\n任务开始时间：' + e.currentTarget.dataset.item.time1 + '\r\n\r\n计划结束时间：' + e.currentTarget.dataset.item.time2,
      cancelText: '关闭',
      cancelColor: '#009966',
      confirmText: '任务取消',
      confirmColor: '#ff0000',
      success: function (res) {
        console.log(res)
        console.log(e)
        if (res.confirm) {
          // 用户点击确定
          var list = that.data.list;
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == e.target.dataset.item.id) {
              list[i].flag = '2'    //0正在进行，1完成，2取消
              list[i].time3 = util.changTimeFomatt()
              list[i].wcsj = new Date().getTime()
              wx.setStorage({
                key: "tasklist",
                data: JSON.stringify(list)
              })
              // break;
            }
          }
          wx.getStorage({
            key: 'tasklist',
            success: function (res) {
              console.log(res.data)
              var s2 = new Date();
              var list = JSON.parse(res.data)
              var list_show = []
              for (var i = 0; i < list.length; i++) {
                if (list[i].flag == '0') {
                  var item = list[i]
                  var s1 = new Date((item.time2).replace(/-/g, "/"));//结束时间
                  var s3 = new Date((item.time1).replace(/-/g, "/"));//开始时间
                  var days = s1.getTime() - s2.getTime();
                  var days_start = s3.getTime() - s2.getTime();
                  var time = Math.ceil(days / (1000 * 60 * 60 * 24));
                  var time_start = Math.ceil(days_start / (1000 * 60 * 60 * 24))
                  item.time = time;
                  item.time_start = time_start;
                  list_show.push(item)
                }
              }
              //按天数从小到大排序
              list_show.sort(function (a, b) {
                return a.time - b.time
              })
              that.setData({
                list_show: list_show,
                list: list
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})