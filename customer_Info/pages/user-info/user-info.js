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
    var user_id = wx.getStorageSync("phone");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  chatMsg:function() {
    var index = e.currentTarget.dataset.index;
    var user_id = wx.getStorageSync("phone");
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    wx.request({
      url: app.host.url + 'getNewsList',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "user_id": user_id,
      },
      success: function (res) {
        console.log(res.data);
        thit.setData({
          user_msg: res.data
        })
      },
      fail: function (res) {
        console.log("啊嗷...获取数据失败了")
      }
    })
  },
  
  onLoad: function(options) {
    var thit = this;
    var user_id =  wx.getStorageSync("phone"); //缓存用户电话，首页接后便于读取后台数据
    var pwd =  wx.getStorageSync("password");
    wx.request({
      url: app.host.url + 'userLogin',
      method: "GET",
      data: {
        "phone": user_id,
        "password": pwd,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        var info = res.data.data;
    thit.setData({
      user_info: info
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
  }
})