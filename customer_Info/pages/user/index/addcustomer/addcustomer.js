const app = getApp()
var utils = require('../../../../utils/utils.js')
Page({
  data: {
  },
  onLoad: function(options) {
    wx.setStorageSync("id", options.id);
    wx.setStorageSync("add-type", options.type);
    var _this = this;
    wx.request({
      url: app.host.url + 'queryCustomerInfo',
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
    var user_id = wx.getStorageSync('user_id');
    var age = e.detail.value.age;
    if (utils.checkName(e.detail.value.name)) {
      wx.showModal({
        title: "信息提示",
        content: "姓名有误"
      })
    } else if (utils.checkPhone(e.detail.value.tel)) {
      wx.showModal({
        title: "信息提示",
        content: "手机号有误"
      })
    } else if (!e.detail.value.sex) {
      wx.showModal({
        title: "信息提示",
        content: "性别必选"
      })
    } else if (!e.detail.value.disclose) {
      wx.showModal({
        title: "信息提示",
        content: "是否透漏信息必选"
      })
    } else {
      wx.request({
        url: app.host.url + 'addCustomerInfo',
        data: {
          "id": e.detail.value.id,
          'name': e.detail.value.name,
          'tel': e.detail.value.tel,
          'sex': e.detail.value.sex,
          'disclose': e.detail.value.disclose,
          'addr': e.detail.value.addr,
          'age': age,
          'user_id': user_id,
          'nation': e.detail.value.nation,
          'remark': e.detail.value.remark,
          'type': type,
          'otherinfo': "aaa",
          'status': 1
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data);
          var code = res.data.code;
          if (code==-1){
            wx.showModal({
              title: "信息提示",
              content: "已存在该手机号"
            })
          }else{
          wx.redirectTo({
            url: '../user-customerinfo/user-customerinfo?type=' + type,
          })
        }
        },
      })
    }
  },
})