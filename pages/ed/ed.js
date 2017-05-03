// pages/ed/ed.js
Page({
  data: {
    nickName: '',
    avatarUrl: '',
    tasklist: []
  },
  onLoad: function (options) {
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
        var list = JSON.parse(res.data)
        var list_show = []
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          if (list[i].flag == '1') {
            var s1 = new Date((list[i].time2).replace(/-/g, "/"));
            var s2 = new Date((list[i].time1).replace(/-/g, "/"));
            var days = s1.getTime() - s2.getTime();
            var yjhys = Math.ceil(days / (1000 * 60 * 60 * 24) + 1);
            list[i].yjhys = yjhys;
            s1 = new Date((list[i].time3).replace(/-/g, "/"));
            s2 = new Date((list[i].time1).replace(/-/g, "/"));
            days = s1.getTime() - s2.getTime();
            var sjys = Math.ceil(days / (1000 * 60 * 60 * 24) + 1);
            list[i].sjys = sjys
            list_show.push(list[i])
          }
        }
        //按完成时间从小到大排序
        list_show.sort(function (a, b) {
          return b.wcsj - a.wcsj
        })
        that.setData({
          tasklist: list_show
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
  tipItem: function (e) {
    wx.showModal({
      title: '任务详情',
      content: '任务名称：'+e.currentTarget.dataset.item.title+'\r\n\r\n任务开始时间：'+e.currentTarget.dataset.item.time1+'\r\n\r\n计划结束时间：'+e.currentTarget.dataset.item.time2+'\r\n\r\n实际结束时间：'+e.currentTarget.dataset.item.time3,
      confirmColor: '#009966',
      confirmText: 'ok',
      showCancel : false,
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
  }
})