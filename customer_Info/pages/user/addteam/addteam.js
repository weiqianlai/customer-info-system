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
    var remark = e.detail.value.remark;
    var name = e.detail.value.name;
    var captain_id = wx.getStorageSync('user_id');
    console.log(remark, name, captain_id);
    wx.request({
      url: app.host.url + "createTeam",
      data: {
        'user_id': captain_id,
        'remark': remark,
        'name': name
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var info = JSON.stringify(res.data.info)
        var msg = JSON.stringify(res.data.code)
        if (msg == 0) {
          wx.showModal({
            title: "信息提示",
            content: "恭喜注册",
            icon: 'loading',
            duration: 2000
          })
          wx.switchTab({
            url: "../my-team/my-team",
          })
        } else if(msg == -1){
          wx.showModal({
            title: "信息提示",
            content: "创建失败",
            icon: 'loading',
            duration: 1500
          })
        } else if(msg == 1){
          wx.showModal({
            title: "信息提示",
            content: "团队名已存在",
            icon: 'loading',
            duration: 1500
          })
        } else if(msg == 2) {
          wx.showModal({
            title: "信息提示",
            content: "您已存在团队",
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
 