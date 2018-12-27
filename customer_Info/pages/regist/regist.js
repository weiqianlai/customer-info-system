// pages/regist/regist.js
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
     userName:undefined,
     loginName:undefined,
     phone_no:undefined,
     password:undefined,
     ensurepassword:undefined,
     passwordFlag:undefined,
     //标示用户名是否可用，1为可用，0为不可用
     flag:undefined
  },
  regist:function(){ 
    if (this.data.userName && this.data.loginName && this.data.phone_no&&this.data.password&&this.data.ensurepassword){
       if(!this.data.flag){          //这里的判断不太清楚
          wx.showToast({
            title: '用户名已经被占用，请修改',
            icon:"none"
          })  
       }else if(!this.data.passwordFlag){
         wx.showToast({
           title: '两次密码不一致',
           icon:"none"
         }) 
       }
    else{
       wx.showToast({ 
         title: '注册成功',
         success:(res)=>{
           wx.redirectTo({
             url: '/pages/login/login',
           })
         }
       })
         wx.request({
           url: app.addressUrl+'/regist', 
           data: {
             loginName: this.data.loginName,
             password: this.data.password,
             email:this.data.email,
             userName: this.data.userName
           },
           header: {
             "Content-Type": "application/json"
           },
           success: function (res) {
             console.log(res)
           }
         })
       }
     }else{
       wx.showModal({
         title: '提示',
         content: '请将信息填写完整后提交',
         showCancel:false
       })
     }
  },
  goLogin:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  getUsername:function(e){
    if (e.detail.value) {
      this.setData({
        userName:e.detail.value
      })
    }
    console.log(this.data.userName);
  },   
  getPassword:function(e){
    if (e.detail.value) {
    this.setData({
      password :e.detail.value
    })
    }
  },
  getLoginName:function(e){
    if(e.detail.value){
      this.setData({
        loginName:e.detail.value
      })
      var currentFlag= 1;
      var that = this;
      wx.request({
        url: app.addressUrl+'/getUserByLoginName?loginName='+this.data.loginName,
       header:{
         'content-type':'application/json'
       },
       success:function(res){
         if(res.data.resultObj==1){
           //用户名可用
           currentFlag = 1
           that.setData({
             flag: currentFlag
           })
         }else{
           //用户名非法（已经在数据库中存在）
           currentFlag = 0
           wx.showToast({
             title: '该用户名已经被占用',
             icon:"none",
           })
           that.setData({
             flag: currentFlag
           })
         }
       } 
      }) 
    }else{
      this.setData({
        loginName: undefined
      })
    }
  },
  getEmail:function(e){
    if (e.detail.value) {
      this.setData({
        email:e.detail.value
      })
    }
  },
  getEnsurePassword:function(e){
    if (e.detail.value) {
      this.setData({
        ensurepassword:e.detail.value
      })
      var currentFlag = 1
      var that = this;
      if(this.data.ensurepassword!=this.data.password){
          wx.showToast({
            title: '两次密码不一致',
            icon:"none"
          })
          currentFlag = 0
          that.setData({
            passwordFlag:0
          })
      }else{
        that.setData({
          passwordFlag: 1
        })
      }
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