Page({
  formSubmit: function(e) {
    wx.request({
      url: 'http://localhost:8086/admin/saveSpecialPromotiom',
      data: {
        'name': e.detail.value.name,
        'tel_no': e.detail.value.tel_no,
        'sex': e.detail.value.sex,
        'disclose': e.detail.value.disclose,
        'age': e.detail.value.age,
        'work_address': e.detail.value.work_address,
        'comments': e.detail.value.comments,
        'phone_no': e.detail.value.phone_no,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  goSP:function() {
    wx.redirectTo({
      url: '../special-promotiom/special-promotiom',
    })
  }
}) 
