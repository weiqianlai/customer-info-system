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
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  onLoad: function(options) {
    var thit = this;
    var phone = wx.getStorageSync('phone');
    var password = wx.getStorageSync('password'); //获取登录时缓存的手机号码以便读取属于这个用户的数据
    wx.request({
      url: app.host.url + 'getUserAllInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "phone": phone,
        "password": password
      },
      success: function(res) {
        console.log(res.data);
        //var infos = res.data.infos;
        // var customers = res.data.customers;
        // var followupList = new Array();
        // var pendinglist = new Array();
        // var completedlist = new Array();
        // for (var i = 0; i < customers.length; i++) {
        //   switch (customers[i].status) {
        //     case 2:
        //       followupList.push(customers[i]);
        //       break;
        //     case 3:
        //       pendinglist.push(customers[i]);
        //       break;
        //     case 6:
        //       completedlist.push(customers[i]);
        //       break;
        //   }
        // }
        thit.setData({
          user_info: res.data.user,
          // followupList: followupList,
          // pendinglist: pendinglist,
          // completedlist: completedlist,
          // user_msg: res.data.infos
        })
      },
      fail: function(res) {
        console.log("啊嗷...获取数据失败了")
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