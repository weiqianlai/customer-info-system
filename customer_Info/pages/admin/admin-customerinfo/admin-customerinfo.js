// pages/admin/customerinfo/customerinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: [{
      name: '韦乾来',
      sex: '男',
      tel_no: '18224995161'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var phone_no = wx.getStorageSync("phone_no");
    var type = options.type;
    console.log("user-file onLoad:" + phone_no, "  from options(before set) ==>" + type);
    wx.setStorageSync("user-type", options.type);
    console.log("user-file onLoad:" + phone_no, "from options(after set) ==>" + type);
    wx.request({
      url: app.host.url + "getCustomerByPhoneNo", //json数据地址
      method: "GET", 
      data: {
        "phone_no": phone_no,
        "type": type
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        var post_data = JSON.stringify(res.data);
        //console.log(post_data);
        //将获取到的json数据，存在名字叫list_data的这个数组中
        _this.setData({
          post: res.data.data //res.data后面需要加后台传过来的数组名
        })
      }
    })
  },
  onfollow_up: function(e) {
    var id = e.target.dataset.id;
    var type = wx.getStorageSync("user-type");
    console.log("user-file", " onUpdate==> 客户信息记录的id=" + id + "  type=" + type);
    wx.redirectTo({
      url: 'customerinfo-detail/customerinfo-detail?id=' + id + "&&type=" + type,
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