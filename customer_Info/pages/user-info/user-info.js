// pages/user-info/user-info.js
/*Page({ 
  data:  {
    post:[{
      user_name:"",
      vip_grade:"2"
    }], 
    list01: [{ item_id: 1 }, { item_id: 11 },{ item_id: 11 },], 
    list02: [{ item_id: 11 }, { item_id: 11 }],
    list03: [{ item_id: 11 },{ item_id: 11 },{ item_id: 11 }], 
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
    wx.request({
      url: 'http://localhost:8086/wudi/test',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res) {
        console.log(res);
        thit.setData({

        })
      },
      fail:function(res) {
        console.log("啊嗷...获取数据失败了")
      }
    })
  }
})  */
Page({
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

})
