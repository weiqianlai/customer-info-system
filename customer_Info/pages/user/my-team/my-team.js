// pages/user/my-team/my-team.js
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
    //var groupinfo = JSON.stringify(options.data.groupinfo.group_info);
    console.log(phone_no);
    var _this = this;
    wx.request({
      url: 'http://localhost:8086/wudi/getGroupMemberAllInfo', //json数据地址
      method: "GET",
      data: {
        "phone_no": phone_no
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        //将获取到的json数据，存在名字叫list_data的这个数组中
        _this.setData({
          post: res.data.data,
          //groupinfo: res.data.groupinfo//res.data后面需要加后台传过来的数组名
        })
        //console.log(groupinfo)
      }
    })
  },
  onDel: function (e) {
    var id = e.target.dataset.id;
    console.log("onDel" + id);
    var that = this;
    wx.request({
      url: 'http://localhost:8086/wudi/getGroupMemberAllInfo', //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
      method: "GET",
      data: {
        "id": id,
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