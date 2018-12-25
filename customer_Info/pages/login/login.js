// pages/login/login.js
//获取应用实例
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
      //TODO：这里太丑了，要改,初步设想是：通过account在后台数据库中的搜寻，由服务器
      //      段返回一个类型码：学生、教师、主管（且有的教师和主管还有兼职的情况），
      //      由对应的类型码加载指定界面和数据，学生的最简单，所以先做学生的。
      //      有的主管（领导）比较关心各种统计数据，所以单独拎出来作一个UI
      if (account == 'user' && passwd == '0000') {
        console.log("登录用户界面");
        wx.switchTab({
          url: '../user/index/index',
        })
      }
      if (account == 'admin' && passwd == '111') {
        console.log("登录管理员界面");
        wx.redirectTo({
          url: '../admin/index/index',
        })
      }
    }
  }
})