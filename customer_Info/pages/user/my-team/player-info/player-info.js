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
    wx.setStorageSync("player_phone_no", options.player_phone_no);

  },
  onfollow_up: function(e) {
    var id = e.target.dataset.id;
    var type = e.target.dataset.type;
    console.log("第一次拿", type)
    var playerno = e.target.dataset.playerno;
    wx.redirectTo({
      url: '../play-cs-info/play-cs-info?id=' + id + '&type=' + type + '&playerno=' + playerno,
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
    var status= 1;
    var player_phone_no = wx.getStorageSync("player_phone_no");
    console.log("lalal" + player_phone_no);
    wx.request({
      url: app.host.url + "getCustomersByUser",
      method: "GET",
      data: {
        "phone_no": player_phone_no,
        "status":1
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