const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[{
 
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var phone_no = wx.getStorageSync("phone_no");
    var type = options.type;
    console.log("user-file onLoad:"+phone_no, "  from options(before set) ==>" + type);
    wx.setStorageSync("user-type",options.type);
    console.log("user-file onLoad:" +phone_no, "from options(after set) ==>" + type);
    wx.request({
      url: app.host.url+"getCustomerByPhoneNo", //json数据地址
      method: "GET",
      data: {
        "phone_no": phone_no,
        "type":type
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
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
            url: app.host.url + "delCustomerById", //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
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
    // console.log("客户信息记录的id:" + id + " index=" + e.target.dataset.index);
    console.log("user-file"," onUpdate==> 客户信息记录的id=" + id);
    wx.navigateTo({
      url: '../addcustomer/addcustomer?id=' + id,
    })
  },

  addCustomer: function(e) {
    var type = wx.getStorageSync("user-type");
    console.log("user-file addCustomer==> type=", type);
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
    console.log("user-file onShow==> ");
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