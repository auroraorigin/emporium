Page({

  /**
   * 页面的初始数据 
   */
  data: {
    addressList: [], //地址信息
    all_Order: [], //商品列表
    total_number: "", //总数量
    total_money: "", //总价格
    orderId: "", //订单id,
    freight: ""//运费
  },

  //获取订单详情
  getOrderDetail() {
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/getOrderDetail',
      method: 'POST',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {
        _id: that.data.orderId
      },
      success(res) {
        that.setData({
          addressList: res.data.order.address,
          all_Order: res.data.order.goods,
          total_money: Number(res.data.order.totalPrice),
          freight:Number(res.data.order.freight)
        })
      },
      fail() {}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的orderId参数
    var {
      orderId
    } = currentPage.options;
    this.setData({
      orderId: orderId
    })
    this.getOrderDetail();
    //获取页面标志
    var aShow=wx.getStorageSync("aShow");
    if(!aShow)
    {
    //将该页面参数放入缓存
    var type = 5;
    wx.setStorageSync("type", type);
    }
    wx.removeStorageSync("aShow")
  },
})