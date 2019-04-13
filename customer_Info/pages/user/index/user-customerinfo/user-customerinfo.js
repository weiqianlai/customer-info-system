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
    wx.setStorageSync("user-type",options.type);
  },
  onDel: function(e) {
    var id = e.target.dataset.id; //从绑定的控件列的data-id传过来
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否删除该条记录！",
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.host.url + "delCustomerInfo", //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
            method: "GET",
            data: {
              "id": id,
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              var newList = that.data.post;
              for (var i = 0; i < newList.length; i++) {
                if (newList[i].id == id) {
                  newList.splice(i, 1);
                }
              }
              that.setData({  //主动刷新
                post: newList
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onUpdate: function(e) {
    var id = e.target.dataset.id;
    var type = wx.getStorageSync("user-type");
    wx.redirectTo({
      url: '../updateinfo/updateinfo?id=' + id + "&&type=" + type,
    })
  },

  addCustomer: function(e) {
    var type = wx.getStorageSync("user-type");
    wx.redirectTo({
      url: '../addcustomer/addcustomer?type=' + type,
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
    var _this = this;
    var type = wx.getStorageSync("user-type");
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: app.host.url + "queryCustomerList", 
      method: "GET",
      data: {
        "user_id": user_id, 
        "type": type
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