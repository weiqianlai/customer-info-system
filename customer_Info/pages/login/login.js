//const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
      
  },
  goregist: function (e) {
    wx.redirectTo({
      url: '/pages/regist/regist',
    })
  },
  formSubmit: function (e) {
    wx.request({
      url: 'http://localhost:8086/admin/saveSpecialPromotiom',
      data:{
        'user_name':e.detail.value.user_name,
        'user_password':e.detail.value.user_password,
      },
      method:"GET",
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res.data)
        if(res.data.status == 1) {
        //存入缓存
        wx.setStorage({
          key: 'user_name',
          data: JSON.parse(res.data).user_name,
        })
        wx.redirectTo({
          url: 'user/index/index',
        })
      } else {
        wx.showToast({
          title: "...",
          icon:'loading',
          duration:2000
        })
      }
      }
    })
  },
  data:{}
})