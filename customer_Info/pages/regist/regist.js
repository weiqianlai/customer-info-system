const app = getApp()
var utils = require('../../utils/utils.js')
 Page({
   data: {

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
     } else if (password && enpassword) {
       wx.request({
         url: app.host.url +'saveUserinfo',
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