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
    wx.request({
      url: 'http://localhost:8086/wudi/getSpecialPromotiom', //json数据地址
      method: "GET",
      data: {
        phone_no: "11111"
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //console.log(res.data)
        var post_data = JSON.stringify(res.data);
        console.log("special-onLoad" + post_data);
        //var postId = res.currentTarget.item.id;
        //console.log(postId);
        //将获取到的json数据，存在名字叫list_data的这个数组中
        _this.setData({
          post: res.data.data //res.data后面需要加后台传过来的数组名
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
        wx.setStorageSync("lalala", res.data.data);
      }
    })
  },
  onDel: function(e) {
    var id = e.target.dataset.id;
    //console.log(id);
    var that = this;
    wx.request({
      url: 'http://localhost:8086/wudi/getSpecialPromotiom', //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
      method: "GET",
      data: {
        "id": id,
      },
      headers: {
        'Content-Type': 'application/json'
      },

      success: function(e) {
        that.setData({
          post: e.data.data
        }) //这里想写一个点击删除后自动更新页面的代码
        //console.log(e)
      }
    })
  },
  onUpdate: function(e) {
    var id = e.target.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../addcustomer/addcustomer?id=' + id,
    })
  },

  addCustomer: function(e) {
    wx.navigateTo({
      url: '../addcustomer/addcustomer',
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
  onShow: function(res) {
    // var post1 = wx.getStorageSync('lalala', res.data.data);
    // console.log("onShow" + post1);
    // //console.log(post1);
    // this.setData({
    //   post: post1
    // })
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