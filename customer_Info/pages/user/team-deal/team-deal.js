// pages/user/team-deal/team-deal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // post:[
      //   {name:"剑圣",
      //    player_name:"剑豪",
      //    deal_time:"2019.03.02" },
      //    {
      //      name: "瞎子",
      //      player_name: "蛮王",
      //      deal_time: "2019.03.27"
      //    }
      //   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thit = this;
    var captain_phone = options.phone_no;
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: app.host.url + "queryTeamCustomerList",
      method: "GET",
      data: {
        "user_id": user_id
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) { 
        console.log(res.data);
        thit.setData({
          post: res.data.data
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