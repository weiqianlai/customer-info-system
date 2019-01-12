 Page({
  formSubmit: function (e) {
    wx.request({
      url:"",
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
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})

