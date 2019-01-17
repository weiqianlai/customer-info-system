Page({
  data: {

  },
  formSubmit: function (e) {
    var that = this;
    var name = that.data.captain_name;
    var phone = that.data.captain_phone;
    var password = that.data.group_info;
    var enpassword = that.data.group_name;
    // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // var namepd = /^[\u4E00-\u9FA5A-Za-z]+$/;
    // if (!namepd.test(name)) {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "姓名有误"
    //   })
    // } else if (!myreg.test(phone)) {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "手机号码错误"
    //   })
    // } else if (password.length <= 5) {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "密码至少为六位！"
    //   })
    // } else if (password !== enpassword) {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "请确认密码是否相同！"
    //   })
    // } else if (name && phone && password && enpassword) {
      wx.request({
        url: "http://localhost:8080/wudi/saveGroupinfo",
        data: {
          'captain_name': e.detail.value.captain_name,
          'captain_phone': e.detail.value.captain_phone,
          'group_info': e.detail.value.group_info,
          'group_name': e.detail.value.group_name,
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          var info = JSON.stringify(res.data.info)
          var msg = JSON.stringify(res.data.code)
          if (msg == 1) {
            wx.showModal({
              title: "信息提示",
              content: info + "",
              icon: 'loading',
              duration: 2000
            })
            wx.switchTab({
              url: "../my-team/my-team",
            })
          } else {
            wx.showModal({
              title: "信息提示",
              content: info + "",
              icon: 'loading',
              duration: 1500
            })
          } 
        },
        fail: function (res) {
          wx.showToast({

            title: '服务器网络错误,请稍后重试',

            icon: 'loading',

            duration: 1500

          })
        },
      })
    }
  

})