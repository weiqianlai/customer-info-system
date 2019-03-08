// pages/user/my-team/my-team.js
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
    var phone_no = wx.getStorageSync('phone_no');
    console.log(phone_no);
    var _this = this;
    wx.request({
      url: app.host.url+'getGroupMemberAllInfo', 
      method: "GET",
      data: {
        "phone_no": phone_no
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        
        _this.setData({
          introduce: res.data.groupinfo,
          post: res.data.data,
          user_no: phone_no
        }) 
      },
    })
  },
  onDel: function (e) {
    var phone_no = e.target.dataset.phone_no; 
    console.log("onDel" + phone_no);
    var that = this;
    wx.request({
      url: app.host.url+'deleteMember', //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
      method: "GET",
      data: {
        "phone_no": phone_no
      },
      headers: {
        'Content-Type': 'application/json'
      },

      success: function (e) {
        that.setData({
          post: e.data.data
        }) //这里想写一个点击删除后自动更新页面的代码

        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据 //TODO这里需要改进
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      }
    })
  },
  goAddPlayer:function(event) {
    wx.navigateTo({
      url: '../addplayer/addplayer',
    })
  },
  seePlayer:function(e) {
      wx.navigateTo({
        url: 'player-info/player-info',
      })
  },
  quit_team:function(e) {
    var phone_no = wx.getStorageSync('phone_no');
    wx.request({
      url: app.host.url + 'quitGroup', 
      method: "GET",
      data: {
        "phone_no": phone_no
      },
      headers: {
        'Content-Type': 'application/json'
      },

      success: function (e) {
        var info = JSON.stringify(e.data.info);
        console.log(info);
        wx.showModal({
          title: "信息提示",
          content: info
        })
      }
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
    var phone_no = wx.getStorageSync('phone_no');
    console.log(phone_no);
    var _this = this;
    wx.request({
      url: app.host.url + 'getGroupAllInfo', //json数据地址
      method: "GET",
      data: {
        "phone_no": phone_no
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          user_info: res.data.user
        })
      }
    })
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