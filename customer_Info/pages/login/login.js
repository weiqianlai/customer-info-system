Page({
  data: {
    account: '',
    password: ''
  },

  // 获取输入账号
  getLoginName: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  // 获取输入密码
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () {
    var account = this.data.account
    var passwd = this.data.password
    //TODO 账号和密码的规范化
    if (account.length == 0 || passwd.length == 0) {
      wx.showToast({
        title: '非法输入',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    
      if (account == 'user' && passwd == '0000') {
        console.log("登录学生界面");
        wx.switchTab({
          url: '../user/index/index',
        })
      }
      if (account == 'tea' && passwd == '111') {
        console.log("登录教师界面");
      }
      if (account == 'lead' && passwd == '222') {
        console.log("登录主管界面");
      }
    }
  }
})