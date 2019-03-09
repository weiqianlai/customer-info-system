const app = getApp()
Page({
  data: {},
  userPhone_no: function(e) {
    this.setData({
      phone_no: e.detail.value
    })
  },
  passwordinput: function(e) {
    this.setData({
      user_password: e.detail.value
    })
  },
  onLoad: function(options) {

  },
  signin: function() {
    var that = this;
    var phone = that.data.phone_no;
    var pwd = that.data.user_password;
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
    } else if (pwd.length  < 6) {
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
          phone_no: phone,
          user_password: pwd,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function(res) {
          console.log(res.data)
          // console.log("返回的结果"+JSON.stringify(res.data.msg))
          // console.log("返回的结果" + JSON.stringify(res.data.status))
          var msg = JSON.stringify(res.data.code);
          var type = JSON.stringify(res.data.type);
          var info = JSON.stringify(res.data.info);
          wx.setStorageSync("phone_no", phone); //缓存用户电话，首页接后便于读取后台数据
          wx.setStorageSync("user_password", pwd);

          if (msg == 1 && type == 2) {
            wx.showToast({
              title: '登录成功',
              icon: 'loading',
              duration: 3000
            })
            // console.log(status)
            wx.switchTab({
              url: '../user/index/index',
            })
          } else if (msg == 1 && type == 1) {
            wx.showToast({
              title: '登录成功',
              icon: 'loading',
              duration: 3000
            })
            wx.redirectTo({
              url: '../admin/index/index',
            })
          } else if (msg == 2 && type == 0) {
            wx.showModal({
              title: "信息提示",
              content: info
            })
          } else {
            wx.showModal({
              title: "信息提示",
              content: info
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