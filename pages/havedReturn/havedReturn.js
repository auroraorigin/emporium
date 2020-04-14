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
    freight: "",//运费
    coupon: "",//优惠卷
    returnReason: "",//退款原因
    expressNumber: "",//快递单号
    createDate:"",//订单创建日期
    havedPaid:""//实付款
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
          freight: Number(res.data.order.freight),
          coupon: res.data.order.coupon,
          returnReason: res.data.order.returnReason,
          expressNumber: res.data.order.expressNumber,
          createDate:res.data.order.createDate,
          havedPaid:res.data.order.havedPaid
        })
      },
      fail() { }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的orderId参数
    var orderId = currentPage.options.orderId;
    this.setData({
      orderId: orderId,
    })
    this.getOrderDetail();
  },

  //页面关闭时执行
  onUnload() {
    //获取页面标志
    var aShow = wx.getStorageSync("aShow");
    if (aShow == "退款") {
      wx.setStorageSync('type', 5)
    } else if (aShow == "全部") {
      wx.setStorageSync('type', 1)
    }
  },
})