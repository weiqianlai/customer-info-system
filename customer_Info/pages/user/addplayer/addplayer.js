const app = getApp()
Page({
  data: {

  },
  formSubmit: function (e) {
    var user_id = wx.getStorageSync('user_id');
    console.log(user_id, e.detail.value.being_phone_no);
    var team_id = wx.getStorageSync("team_id");
    console.log(team_id)
    wx.request({
      url: app.host.url +'addTeamer',
      data: {
        "user_id": user_id,
        "phone": e.detail.value.being_phone_no,
        "team_id": team_id

      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.ata)
        var info = JSON.stringify(res.data.info)
        var msg = JSON.stringify(res.data.code)
        if (msg == 0) {
          wx.showModal({
            title: "信息提示",
            content: "邀请成功",
            icon: 'loading',
            duration: 2000
          })
          wx.switchTab({
            url: "../my-team/my-team",
          })
        } else {
          wx.showModal({
            title: "信息提示",
            content:"邀请失败",
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