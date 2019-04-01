const app = getApp()
var utils = require('../../utils/utils.js')
Page({
  data: {
    showModalStatus: false
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  getUserName: function(e) {
    this.setData({
      user_name: e.detail.value
    })
  },
  getPhoneNo: function(e) {
    this.setData({
      phone_no: e.detail.value
    })
  },
  getUserPassword: function(e) {
    this.setData({
      user_password: e.detail.value
    })
  },
  getEnsurePassword: function(e) {
    this.setData({
      ensurePassword: e.detail.value
    })
  },
  formSubmit: function(e) {
    var that = this;
    var name = that.data.user_name;
    var phone = that.data.phone_no;
    var password = that.data.user_password;
    var enpassword = that.data.ensurePassword;
    if (utils.checkName(name)) {
      wx.showModal({
        title: "信息提示",
        content: "姓名不能含有数字"
      })
    } else if (utils.checkPhone(phone)) {
      wx.showModal({
        title: "信息提示",
        content: "手机号码错误"
      })
    } else if (password.length < 6) {
      wx.showModal({
        title: "信息提示",
        content: "密码至少为六位！"
      })
    } else if (password !== enpassword) {
      wx.showModal({
        title: "信息提示",
        content: "请确认密码是否相同！"
      })
    } else if (!e.detail.value.xieyi) {
      wx.showModal({
        title: "信息提示",
        content: "请勾选协议书！"
      })
      }else if (password && enpassword) {
      wx.request({
        url: app.host.url + 'saveUserinfo',
        data: {
          'user_name': e.detail.value.user_name,
          'user_sex': e.detail.value.user_sex,
          'phone_no': e.detail.value.phone_no,
          'user_password': e.detail.value.user_password,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data)
          var info = JSON.stringify(res.data.info)
          var msg = JSON.stringify(res.data.code)
          if (msg == 2) {
            wx.showModal({
              title: "信息提示",
              content: info + "",
              icon: 'loading',
              duration: 2000
            })
            wx.redirectTo({
              url: '../login/login?phone_no=&user_password',
            })
          } else if (msg == 1) {
            wx.showModal({
              title: "信息提示",
              content: info + "",
              icon: ' ',
              duration: 1500
            })
          } else if (msg == 0) {
            wx.showModal({
              title: "信息提示",
              content: info + "",
              icon: ' ',
              duration: 1500
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
  goLogin: function() {
    wx.redirectTo({
      url: '../login/login',
    })
  }
})