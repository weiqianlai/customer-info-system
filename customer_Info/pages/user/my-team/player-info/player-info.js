// pages/user/my-team/player-info/player-info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("上个页面传过来的队员号码" + options.player_phone_no);
    wx.setStorageSync("player_phone_no", options.player_phone_no);

  },
  onfollow_up: function(e) {
    var id = e.target.dataset.id;
    wx.redirectTo({
      url: '../play-cs-info/play-cs-info?id=' + id,
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
  onShow: function() {
    var _this = this;
    var player_phone_no = wx.getStorageSync("player_phone_no");
    console.log("lalal" + player_phone_no);
    wx.request({
      url: app.host.url + "getCustomersByUser",
      method: "GET",
      data: {
        "phone_no": player_phone_no,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          post: res.data.data
        })
      }
    })
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