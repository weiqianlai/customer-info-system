Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_list: [{
      customerId: "001",
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },

    {
      customerId: "002",
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      customerId: "003",
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      customerId: "004",
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    }, {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    }, {
      name: "张三",
      sex: '男',
      phone: '15231212122'
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* wx.request({
     *url: '',
     *method:'GET'
     *})
     */
  },

  onDel: function (e) {
    var customerId = e.currentTarget.dataset.customerId;
    var customer_list = this.data.customer_list;
    console.log(customerId);
    customer_list.splice(customerId, customerId)
    this.setData({
      customer_list: customer_list
    })
  },
  addCustomer: function () {
    wx.navigateTo({
      url: '../../addcustomer/addcustomer',
    })
  }


})

