const app = getApp()
var utils = require('../../../utils/utils.js')
Page({
  data: {
  },
  onLoad: function (options) {
    wx.setStorageSync("id", options.id);
    wx.setStorageSync("add-type", options.type);
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
      success: function (res) {
        if (res.data.data) {
          _this.setData({
            post: res.data.data
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    var type = wx.getStorageSync("add-type");
    var phone_no = wx.getStorageSync('phone_no');
    if (utils.checkName(e.detail.value.name)) {
      wx.showModal({
        title: "信息提示",
        content: "姓名有误"
      })
    } else if (e.detail.value.tel_no) {
      wx.showModal({
        title: "信息提示",
        content: "手机号有误"
      })
    } else if (e.detail.value.age) {
      wx.showModal({
        title: "信息提示",
        content: "年龄有误"
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
        success: function (res) {
          console.log(res.data);
          wx.redirectTo({
            url: '../admin-customerinfo/admin-customerinfo?type=' + type,
          })
        },
      })  
    }
  },
})