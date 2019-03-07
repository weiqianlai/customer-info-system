const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  formSubmit: function (e) {
    var that = this;
    var name = that.data.captain_name;
    var phone = that.data.captain_phone;
    var password = that.data.group_info;
    var enpassword = that.data.group_name;
    wx.request({
      url: app.host.url + "createGroupinfo",
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
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
 