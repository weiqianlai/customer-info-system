Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData();
  },

  getData: function (e) {
    var that = this;
    var post = {
      name: "",
      tel_no:"",
      sex:"",
      disclose:"",
      age:"",
      work_address:"",
      comments:"",

    }
    wx.request({
      url: 'http://localhost:8086/wudi/getSpecialPromotiom',//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data:{
          name:'张三'
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          post: res.data
        })

      },
      fail: function (err) {
        console.log("失败")
      }
    })
  },
  addCustomer: function () {
    wx.navigateTo({
      url: '../addcustomer/addcustomer',
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