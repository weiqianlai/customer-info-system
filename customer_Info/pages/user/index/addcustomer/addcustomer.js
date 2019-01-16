Page({
  formSubmit: function(e) {
    var phone_no = wx.getStorageSync('phone_no');//获取缓存的phone_no
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
        'phone_no': phone_no,
        'nation': e.detail.value.nation,  
        'type'  :"gaoshengzhuan"     //全部信息应传到后台
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("formSubmit Ok" + res.data)
        wx.redirectTo({
          url: '../special-promotiom/special-promotiom',
        })
      },
      fail: function (res) {
        console.log('submit fail' + res.data);
      },
      complete: function (res) {
        console.log('submit complete' + res.data);
      } 
    })
  },
 
}) 
