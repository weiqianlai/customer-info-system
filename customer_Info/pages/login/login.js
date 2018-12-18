// pages/login/login.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName: '',
    password: ' '
  },
  goregist: function (e) {
    wx.redirectTo({
      url: '/pages/regist/regist',
    })
  },
  getLoginName: function (e) {
    console.log(e.detail.value)
    this.setData({
      loginName: e.detail.value
    })
  },
  getPassword: function (e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  login: function (e) {
    if (this.data.loginName && this.data.password) {
      wx.setStorageSync("username", this.data.loginName)
      wx.request({   
        url: app.addressUrl + '/login?loginName=' + this.data.loginName + "&password=" + this.data.password,
        method: 'POST', 
        success: function (res) {
          var result = res.data.resultObj;
          console.log(res.data);
          //result=1表示登录成功
          if (this.data.loginName == 'user' && this.data.password =='000') {
            //存储用户名
            wx.redirectTo({
              url: '/pages/user/index/index',
            })
            wx.set
          }
          if (this.data.loginName == 'admin' && this.data.password == '111'){
              wx.redirectTo({
                url: '/pages/admin/index/index',
              })
          }
           else {
            wx.showModal({
              title: '温馨提示',
              content: '用户名密码错误',
              showCancel: false,
              success: function (res) {

              }
            })
          }
          console.log('submit success');
        },
        fail: function (res) {
          wx.showToast({
            title: '您的网络开小差啦~~~',
            icon: "none"
          })
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    } else {
      wx.showToast({
        title: '请将信息填写完整后登录',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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