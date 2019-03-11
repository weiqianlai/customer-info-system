const app = getApp()
Page({
  data: {
  },
  onLoad: function (options) {
    wx.setStorageSync("id", options.id);
    var playerno = options.playerno;
    wx.setStorageSync("type", options.type);
    wx.setStorageSync("playerno", options.playerno);
    var _this = this;
    wx.request({
      url: app.host.url + 'getCustomerById',
      method: "GET",
      data: {
        id: options.id,
        type:options.type
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.data) {
          _this.setData({
            post: res.data.data
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    var type = wx.getStorageSync("type");
    var playerno = wx.getStorageSync('playerno');
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
          'phone_no': playerno,
          'nation': e.detail.value.nation,
          'type': type,
          'status': 1
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var player_phone_no = wx.getStorageSync("player_phone_no");
          wx.redirectTo({
            url: '../player-info/player-info?player_phone_no=' + player_phone_no,
          })
        },
      })
  },
})