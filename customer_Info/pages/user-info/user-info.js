// pages/user-info/user-info.js
const app = getApp()
Page({
  data: {
    showModal: false,
    followupList: [{},
      {}
    ],
    pendinglist: [{
      item_id: 11
    }],
    completedlist: [{
      item_id: 11
    }],
    myteaminfo: [{
      item_id: 11
    }],
    // 展开折叠 
    selectedFlag: [false, false, false, false, false],
  },
  // 展开折叠选择  
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("user_id");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  chatMsg:function(e) {
    var thit = this;
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("user_id");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    wx.request({
      url: app.host.url + 'getNewsList',
      method: "GET",
      data: {
        "user_id": user_id,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data);
        thit.setData({
          selectedFlag: thit.data.selectedFlag,
          msginfo: res.data.list
        })
      },
      fail: function(res) {},
    })
  },
  Padding: function (e) {
    var thit = this;
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("user_id");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    wx.request({
      url: app.host.url + 'queryCustomerList',
      method: "GET",
      data: {
        "user_id": user_id,
        "status":1
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        thit.setData({
          selectedFlag: thit.data.selectedFlag,
          padding: res.data.data
        })
      },
      fail: function (res) { },
    })
  },
  Following: function (e) {
    var thit = this;
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("user_id");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    wx.request({
      url: app.host.url + 'queryCustomerList',
      method: "GET",
      data: {
        "user_id": user_id,
        "status":2
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        thit.setData({
          selectedFlag: thit.data.selectedFlag,
          following: res.data.data
        })
      },
      fail: function (res) { },
    })
  },
  Completed: function (e) {
    var thit = this;
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("user_id");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    wx.request({
      url: app.host.url + 'queryCustomerList',
      method: "GET",
      data: {
        "user_id": user_id,
        "status":6
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        thit.setData({
          selectedFlag: thit.data.selectedFlag,
          completed: res.data.data
        })
      },
      fail: function (res) { },
    })
  },
  
  
  
  onLoad: function(options) {
    var thit = this;
    var phone = wx.getStorageSync("phone");
    var pwd = wx.getStorageSync("pwd");
    wx.request({
      url: app.host.url + 'userLogin',
      method: "GET",
      data: {
        phone: phone,
        password: pwd,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success:function(res) {
        console.log(res.data);
        thit.setData({
          user_info: res.data.data,
          integras: res.data.integra
        })
      }
    })
  },
  onShow: function() {
    var page = getCurrentPages().pop();
    if (page == undefined || page == null) return;
    page.onLoad();

  },

  goAddTean: function(event) {
    wx.navigateTo({
      url: '../user/addteam/addteam',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },
  hideModal: function () { //隐藏模态对话框
    this.setData({
      showModal: false
    });
  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
  formSubmit: function (e) {
    var user_id = wx.getStorageSync('user_id');
    console.log(user_id, e.detail.value.phone_no);
    console.log(team_id)
    wx.request({
      // url: app.host.url + 'addTeamer',
      data: {
        "user_id": user_id,
        "phone": e.detail.value.phone_no,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var info = JSON.stringify(res.data.info)
        var msg = JSON.stringify(res.data.code)
        if (msg == 0) {
          wx.showModal({
            title: "信息提示",
            content: "加入管理成功",
            icon: 'loading',
            duration: 2000
          })
          wx.switchTab({
            url: "../user/my-team/my-team",
          })
        } else if (msg == -1) {
          wx.showModal({
            title: "信息提示",
            content: "加入管理失败",
            icon: 'loading',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({

          title: '服务器网络错误,请稍后重试',

          icon: 'loading',

          duration: 1500

        })
      },
    })
  }

})