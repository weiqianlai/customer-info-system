const app = getApp()
Page({
  data: {},
  userPhone_no: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  passwordinput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  onLoad: function(options) {

  },
  signin: function() {
    var that = this;
    var phone = that.data.phone;
    var pwd = that.data.password;
    console.log(phone, pwd)
    if (phone == "") {
      wx.showModal({
        title: "信息提示",
        content: "手机号不能为空!"
      })
    } else if (pwd == "") {
      wx.showModal({
        title: "信息提示",
        content: "密码不能为空!"
      })
    } else if (pwd.length < 5) {
      wx.showModal({
        title: "信息提示",
        content: "密码至少为六位!"
      })
    } else { //TODO
      console.log("手机号：" + phone + "密码：" + pwd)
      //发送ajax请求到服务器-登录
      wx.request({
        url: app.host.url + 'userLogin',
        method: "GET",
        data: {
          phone: phone,
          password: pwd,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function(res) {
          console.log(res.data)
          var msg = res.data.code;
          var per = res.data.permission;
          var sta = res.data.data.status;
          console.log("aa"+per);         
          wx.setStorageSync("user_id", res.data.data.id); //缓存用户id，首页接后便于读取后台数据
          wx.setStorageSync("team_id", res.data.data.id );
          wx.setStorageSync("userinfo", res.data.data);
          if (sta == 0) {
            wx.showModal({
              title: '信息提示',
              content: '用户未审核',
            })
          }

            else  if (msg == 0 && per == 1 && sta == 1) {
            wx.showToast({
              title: '登录成功',
              icon: 'loading',
              duration: 3000
            })
            wx.switchTab({
              url: '../user/index/index',
            })
          } else if (msg == 0 && per == 2 || per == 3) {
            wx.showToast({
              title: '登录成功',
              icon: 'loading',
              duration: 3000
            })
            wx.redirectTo({
              url: '../admin/index/index',
            })
          } else if (msg ==  1) {
            wx.showToast({
              title: '信息提示',
              icon: '用户不存在',
              duration: 3000
            })
          } else if(msg == 2){
            wx.showToast({
              title: '信息提示',
              icon: '密码错误',
              duration: 3000
            })
          } 
        },
        fail: function(res) {
          wx.showToast({
            title: '服务器网络错误,请稍后重试',
            icon: 'loading',
            duration: 1500
          })
        },
      })
    }
  },
  register: function() {
    wx.navigateTo({
      url: "../regist/regist"
    })
  }
})