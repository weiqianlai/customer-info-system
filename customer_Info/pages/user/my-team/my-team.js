// pages/user/my-team/my-team.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    var _this = this;
    wx.request({
      url: app.host.url + 'getTeamDetailInfo',
      method: "GET",
      data: {
        "user_id": user_id,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var player_list = res.data.list;
        console.log(player_list);
        var info = res.data.data;
        var user_no = wx.getStorageSync('user_id');
        wx.setStorageSync("team_id", res.data.data.id);
        for (var i = 0; i < player_list.length; i++){
          if (player_list[i].id == user_id) {
             player_list.splice(i, 1)
           }
         }
        _this.setData({
          post: player_list,
          introduce: info,
          user_no: user_no,
        })
      }
    })
  },
  onDel: function(e) {
    var user_id = e.target.dataset.id; //从绑定的控件列的data-id传过来
    var team_id = wx.getStorageSync('team_id');
    console.log("user_id:" + user_id, "team_id:"+team_id)
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否删除该队员！",
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.host.url + "delTeamer", //再次获取后台数据传输id,感觉这个方法不完美，后期再改进
            method: "GET",
            data: {
              "user_id": user_id,
              "team_id": team_id
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              var newList = that.data.post;
              console.log("列表"+newList)
              for (var i = 0; i < newList.length; i++) {
                if (newList[i].id == user_id) {
                  newList.splice(i, 1);
                }
              }
              that.setData({ //主动刷新
                post: newList
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goAddPlayer: function(event) {
    wx.navigateTo({
      url: '../addplayer/addplayer',
    })
  },
  seePlayer: function(e) {
    var user_id = e.target.dataset.id;
    wx.navigateTo({
      url: 'player-info/player-info?user_id=' + user_id,
    })
  },
  quit_team: function(e) {
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    var team_id = wx.getStorageSync("team_id");
    wx.request({
      url: app.host.url + 'exitTeam',
      method: "GET",
      data: {
        "user_id": user_id,
        "team_id": team_id
      },
      headers: {
        'Content-Type': 'application/json'
      },

      success: function(e) {
        var post = "";
        wx.showModal({
          title: "信息提示",
          content: "退出队伍成功"
        })
        that.setData({ //主动刷新
          post: post
        })
      }
    })
  },
  goTeam_deal: function(event){
    wx.navigateTo({
      url: '../team-deal/team-deal',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var page = getCurrentPages().pop();
    if (page == undefined || page == null) return;
    page.onLoad();
    //console.log("shux");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})