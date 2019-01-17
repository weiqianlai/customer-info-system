// pages/user-info/user-info.js
Page({ 
  data:  {
    post:[{
      user_name:"",
      vip_grade:"2"
    }], 
    list01: [{ item_id: 1 }],
    list02: [{ item_id: 11 }],
    list03: [{ item_id: 11 }],
    list04: [{ item_id: 11 }],
             // 展开折叠 
    selectedFlag: [false, false, false, false], },
    // 展开折叠选择  
    changeToggle:function(e){ 
      var index = e.currentTarget.dataset.index; 
      if (this.data.selectedFlag[index]){
        this.data.selectedFlag[index] = false;
        }else{
           this.data.selectedFlag[index] = true; 
        } 
        this.setData({ selectedFlag: this.data.selectedFlag }) 
        },
  onLoad: function (options) {
    var thit = this;
    var post = {};
    var phone_no = wx.getStorageSync('phone_no'); 
    var user_password = wx.getStorageSync('user_password');//获取登录时缓存的手机号码以便读取属于这个用户的数据
    wx.request({
      url: 'http://localhost:8086/wudi/userLogin',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      data:{
        "phone_no": phone_no,
        "user_password": user_password
      },
      success:function(res) {
        console.log(res.data);
        thit.setData({
          post: res.data.data
        })
      },
      fail:function(res) {
        console.log("啊嗷...获取数据失败了")
      }
    })
  },
  goAddTean:function(event) {
    wx.navigateTo({
      url: '../user/addteam/addteam',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})  
/*Page({
  data: {
  },
  onLoad: function () {
    this.getData();
  },
  getData: function (e) {
    var that = this;
    var post={
      user_name:"",
      
    }
    wx.request({
      url: 'http://localhost:8086/wudi/test',//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
       
        that.setData({
          post:res.data
        })
      
      },
      fail: function (err) {
        console.log("失败")
      }
    })
  }

}) */
 