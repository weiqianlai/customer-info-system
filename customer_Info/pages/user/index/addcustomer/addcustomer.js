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
        'type': e.detail.value.type,
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
  
}) 
