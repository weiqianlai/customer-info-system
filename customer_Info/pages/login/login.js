//const app = getApp()
Page({
  data: {

  },
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
  //点击登陆的时候触发的事件
  signin: function() {
    var that = this;
    //登陆的时候要传过来的参数
    var phone = that.data.phone_no;
    var pwd = that.data.user_password;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    console.log(phone, pwd)
    if (phone == "") {
      wx.showModal({
        title: "信息提示",
        content: "手机号不能为空!"
      })
    } else if (!myreg.test(phone)) {
      wx.showModal({
        title: "信息提示",
        content: "手机号有误"
      })
    } else if (that.data.user_password == "") {
      wx.showModal({
        title: "信息提示",
        content: "密码不能为空!"
      })
    } else if (that.data.user_password <= 5) {
      wx.showModal({
        title: "信息提示",
        content: "密码至少为六位!"
      })
    } else if (phone) {

      console.log("手机号：" + phone + "密码：" + pwd)
      //发送ajax请求到服务器-登录
      wx.request({
        url: 'http://localhost:8080/wudi/userLogin',
        method:"GET",
        data: {
          phone_no: phone,
          user_password: pwd,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          console.log(res.data)
          // console.log("返回的结果"+JSON.stringify(res.data.msg))
          // console.log("返回的结果" + JSON.stringify(res.data.status))
          var msg = JSON.stringify(res.data.code);
          var type = JSON.stringify(res.data.type);
          //弹出提示
          /*wx.showToast({
            title: '登录成功',
            icon: 'loading',
            duration: 3000
          }) */
          if (msg == 1 && type == 2) {
            // console.log(status)
            //跳转到index页面
            wx.switchTab({
              url: '../user/index/index',
            })
          } else if(msg==1 && type == 1){ 
            //跳转到index页面
            wx.redirectTo({
              url: '../admin/index/index',
            })
          } else {
            wx.showModal({
              title: "信息提示",
              content: "异常"
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
        complete: function(res) {

        },
      })
    }
    var user_phone_no = {
      user_phone_no: phone
    }
    wx.setStorageSync('user_phone_no', user_phone_no); //缓存用户电话，首页接后便于读取后台数据
    console.log(user_phone_no);

  },
  //点击注册的时候触发的事件
  register: function() {
    wx.navigateTo({
      url: "../regist/regist"
    })
  }
})