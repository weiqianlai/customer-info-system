const app = getApp()
Page({
  data:{
    post:[{}]
  },
  onLoad: function(options) {
    wx.setStorageSync("id", options.id);
    wx.setStorageSync("add-type", options.type);
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
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
      }
    })
  },
  formSubmit: function(e) {
    var type = wx.getStorageSync("add-type");
    var phone_no = wx.getStorageSync('phone_no'); //获取缓存的phone_no
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
