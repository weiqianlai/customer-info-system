const app = getApp()
Page({
  data: {
  },
  onLoad: function(options) {
    wx.setStorageSync("id", options.id);
    wx.setStorageSync("add-type", options.type);
    console.log("add-file", " onLoad==> id=" + options.id + " type=" + options.type);
    var _this = this;
    wx.request({
      url: app.host.url + 'getCustomerById',
      method: "GET",
      data: {
        id: options.id
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.data) {
          _this.setData({
            post: res.data.data
          })
        }
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
        wx.setStorageSync("add-back", 1);
        wx.redirectTo({
          url: '../user-customerinfo/user-customerinfo?type=' + type,
        })
      },
    })
  },
})