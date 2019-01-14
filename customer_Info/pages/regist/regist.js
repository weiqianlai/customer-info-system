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
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     var namepd = /^[\u4E00-\u9FA5A-Za-z]+$/;
     if (!namepd.test(name)) {
       wx.showModal({
         title: "信息提示",
         content: "姓名有误"
       })
     } else if (!myreg.test(phone)) {
       wx.showModal({
         title: "信息提示",
         content: "手机号码错误"
       })
     } else if (password.length <= 5) {
       wx.showModal({
         title: "信息提示",
         content: "密码至少为六位！"
       })
     } else if (password !== enpassword) {
       wx.showModal({
         title: "信息提示",
         content: "请确认密码是否相同！"
       })
     } else if (name && phone && password && enpassword) {
       wx.request({
         url: "http://localhost:8080/wudi/saveUserinfo",
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