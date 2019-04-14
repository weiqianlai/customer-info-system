// pages/user-info/user-info.js
const app = getApp()
Page({
  data: {
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
      url: app.host.url + 'userGetCust',
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
      url: app.host.url + 'userGetCust',
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
      url: app.host.url + 'userGetCust',
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
    var userdata = wx.getStorageSync("userinfo");
        thit.setData({
          user_info: userdata
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
  }
})