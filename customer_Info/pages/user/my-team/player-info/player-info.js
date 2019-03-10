// pages/user/my-team/player-info/player-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: [{

    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("user-file onLoad:  from options(before set) ==>" + options.type);
    wx.setStorageSync("user-type", options.type);

  },
  onfollow_up: function(e) {
    var id = e.target.dataset.id;
    console.log("user-file", " onUpdate==> 客户信息记录的id=" + id + "  type=" + type);
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