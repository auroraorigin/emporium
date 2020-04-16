// pages/overOrder/overOrder.js  
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    addressList: [],//地址信息
    all_Order: [],//商品列表
    total_number: "",//总数量
    total_money: "",//总价格
    orderId: "", //订单id
    freight: "",//运费
    state: "",//订单状态
    coupon: {},//优惠卷 
    createDate:"",//订单创建日期
    havedPaid:""//实付款
  },

  //根据orderId加载订单详情
  getOrderDetail() {
    var that = this;
    wx.request({
      url: common.apiHost+'wx/getOrderDetail',
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
          state: res.data.order.state,
          coupon: res.data.order.coupon,
          createDate:res.data.order.createDate,
          havedPaid:res.data.order.havedPaid
        })
      },
      fail() { }
    })
  },

  /*//删除订单
  deleteOrder() {
    //显示是否删除订单弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要删除该订单吗？',
      success: (result) => {
        if (result.confirm) {
          var that = this;
          wx.request({
            url: 'http://localhost:8888/wx/deleteOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: that.data.orderId
            },
            success(res) {
              console.log(res.data.message)
            },
            fail() { }
          });
          wx.navigateBack({ 
            delta: 1
          })
        } else
          return;
      }
    })
  },*/

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    //将该页面参数放入缓存
    var type = 1;
    wx.setStorageSync("type", type);
  },
})