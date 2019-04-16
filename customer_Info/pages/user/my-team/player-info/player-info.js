// pages/user/my-team/player-info/player-info.js
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
  onLoad: function(options) {
    var _this = this;
    var user_id = options.user_id;
    wx.request({
      url: app.host.url + "queryCustomerList",
      method: "GET",
      data: {
        "user_id": user_id,
        "status": -2
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          post: res.data.data
        })
      }
    })
  },
  onfollow_up: function(e) {
    var id = e.target.dataset.id;
    var playerno = e.target.dataset.playerno;
    var type = e.target.dataset.type;
    console.log("hahah"+type)
    wx.redirectTo({
      url: '../play-cs-info/play-cs-info?id=' + id + '&&type=' + type,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})