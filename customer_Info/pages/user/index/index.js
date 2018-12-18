// pages/user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_list:[{
        name:"张三",
        sex:'男',
        phone:'15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      method:'GET'
    })
    db.collection("customer_list").get({
      success: res => {
        this.setData({
          customer_list: res.data
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
  },
  goSet: function () {
    wx.navigateTo({
      url: '../set/set',
    })

  }, onDel: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("customer_list").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()//删除成功重新加载
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log(id)
  }, onUpdate: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../set/set?id=' + id,
    })
  }
})
