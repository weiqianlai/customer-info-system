const app = getApp()
Page({
  data:{
    post:[{}]
  },
  onLoad: function(options) {
    wx.setStorageSync("id", options.id);
    wx.setStorageSync("add-type", options.type);
    console.log("add-file", " onLoad==> id=" + options.id + " type=" + options.type);
    var _this = this;
    wx.request({
      url: app.host.url + 'getCustomerById', //json数据地址
      method: "GET",
      data: {
        id: options.id
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var post_data = JSON.stringify(res.data);
        console.log(post_data);
        _this.setData({
          post: res.data.data //res.data后面需要加后台传过来的数组名
        })
      }
    })
  },
  formSubmit: function(e) {
    var type = wx.getStorageSync("add-type");
    var phone_no = wx.getStorageSync('phone_no'); //获取缓存的phone_no
    console.log("add-file", " formSubmit show e.detail begin : type=" + type + " phone_no=" + phone_no);
    console.log(e.detail.value);
    console.log("add-file", " formSubmit show e.detail end :");
    wx.request({
      url: app.host.url + 'saveOrUpdateCustomer', 
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
        'type': type,
        'status': 1
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("add-file formSubmit ", " (success) type=" + type);
        wx.redirectTo({
          url: '../user-customerinfo/user-customerinfo?type=' + type,
        })
      },
    })
    
  },

}) 
