const app = getApp()
Page({
  data: {

  },
  formSubmit: function (e) {
    var phone_no = wx.getStorageSync('phone_no');
    wx.request({
      url: app.host.url +'joinGroup',
      data: {
        'captain_phone': phone_no,
        phone_no: e.detail.value.being_phone_no

      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var info = JSON.stringify(res.data.info)
        var msg = JSON.stringify(res.data.code)
        if (msg == 1) {
          wx.showModal({
            title: "信息提示",
            content: info + "",
            icon: 'loading',
            duration: 2000
          })
          wx.switchTab({
            url: "../my-team/my-team",
          })
        } else {
          wx.showModal({
            title: "信息提示",
            content: info + "",
            icon: 'loading',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({

          title: '服务器网络错误,请稍后重试',

          icon: 'loading',

          duration: 1500

        })
      },
    })
  }


})