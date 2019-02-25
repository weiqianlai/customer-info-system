const app = getApp()
Page({
  data:{
    post:[{}]
  },
  onLoad: function (options) {
    var id = options.id;
    var _this = this;
    wx.request({
      url: app.host.url +'getupdateSpecialPromotiom', //json数据地址
      method: "GET",
      data: {
        id: id
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        //将获取到的json数据，存在名字叫list_data的这个数组中
        // _this.setData({
        //   post: res.data.data //res.data后面需要加后台传过来的数组名
        // })

      }
    })
  },
  formSubmit: function (e) {
    var type = wx.getStorageSync('type');
    var phone_no = wx.getStorageSync('phone_no');//获取缓存的phone_no
    console.log(type); 
    wx.request({
      url: 'http://localhost:8086/wudi/saveOrUpdateCustomer',
      data: {
        "id": e.detail.value.id,
        'name': e.detail.value.name,
        'tel_no': e.detail.value.tel_no,
        'sex': e.detail.value.sex,
        'disclose': e.detail.value.disclose,
        'age': e.detail.value.age,
        'work_address': e.detail.value.work_address,
        'comments': e.detail.value.comments,
        'phone_no': phone_no,
        'nation': e.detail.value.nation,
        'type':1001,
        'status':1
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("formSubmit Ok" + res.data)
        wx.redirectTo({
          url: '../user-customerinfo/user-customerinfo',
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
