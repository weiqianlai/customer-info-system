const app = getApp()
Page({
  data: {

  },
  formSubmit: function (e) {
    var that = this;
    var name = that.data.captain_name;
    var phone = that.data.captain_phone;
    var password = that.data.group_info;
    var enpassword = that.data.group_name;
      wx.request({
        url: app.host.url +"createGroupinfo",
        data: {
          'captain_name': e.detail.value.captain_name,
          'captain_phone': e.detail.value.captain_phone,
          'group_info': e.detail.value.group_info,
          'group_name': e.detail.value.group_name,
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