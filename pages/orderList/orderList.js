import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presentType: 0,
    //页面切换
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true
    },
    {
      id: 1,
      value: "待付款",
      isActive: false
    },
    {
      id: 2,
      value: "待发货",
      isActive: false
    },
    {
      id: 3,
      value: "待收货",
      isActive: false
    },
    {
      id: 4,
      value: "退款",
      isActive: false
    }
    ],
    all_Order: [],//全部订单
    wait_Paid: [],//待付款订单
    wait_Sent: [],//待发货订单
    wait_Received: [],//待收货订单
    haved_Return: [],//退款
  },

  //根据标题索引来激活选中 标题数组 
  changeTitleByIndex(index) {
    //2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },

  handleTabsItemChange(e) {
    //1 获取被点击标题的索引
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
    this.setData({
      presentType: index + 1
    })
    //页面切换时，发送请求获取数据
    this.getOrder();
  },

  //加载订单列表
  getOrder() {
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/getOrder',
      method: 'POST',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {
        state: that.data.presentType
      },
      success(res) {
        if (that.data.presentType == 1) {
          let all_Order = res.data.goods;
          for (var i = 0; i < all_Order.length; i++) {
            all_Order[i].totalPrice = Number(all_Order[i].totalPrice);
            all_Order[i].freight = Number(all_Order[i].freight);
            all_Order[i].havedPaid = Number(all_Order[i].havedPaid);
          };
          that.setData({
            all_Order: all_Order
          })
        } else if (that.data.presentType == 2) {
          let wait_Paid = res.data.goods;
          for (var i = 0; i < wait_Paid.length; i++) {
            wait_Paid[i].totalPrice = Number(wait_Paid[i].totalPrice);
            wait_Paid[i].freight = Number(wait_Paid[i].freight);
            wait_Paid[i].havedPaid = Number(wait_Paid[i].havedPaid);
          };
          that.setData({
            wait_Paid: wait_Paid
          })
        } else if (that.data.presentType == 3) {
          let wait_Sent = res.data.goods;
          for (var i = 0; i < wait_Sent.length; i++) {
            wait_Sent[i].totalPrice = Number(wait_Sent[i].totalPrice);
            wait_Sent[i].freight = Number(wait_Sent[i].freight);
            wait_Sent[i].havedPaid = Number(wait_Sent[i].havedPaid);
          };
          that.setData({
            wait_Sent: wait_Sent
          })
        } else if (that.data.presentType == 4) {
          let wait_Received = res.data.goods;
          for (var i = 0; i < wait_Received.length; i++) {
            wait_Received[i].totalPrice = Number(wait_Received[i].totalPrice);
            wait_Received[i].freight = Number(wait_Received[i].freight);
            wait_Received[i].havedPaid = Number(wait_Received[i].havedPaid);
          };
          that.setData({
            wait_Received: wait_Received
          })
        } else if (that.data.presentType == 5) {
          let haved_Return = res.data.goods;
          for (var i = 0; i < haved_Return.length; i++) {
            haved_Return[i].totalPrice = Number(haved_Return[i].totalPrice);
            haved_Return[i].freight = Number(haved_Return[i].freight);
            haved_Return[i].havedPaid = Number(haved_Return[i].havedPaid);
          };
          that.setData({
            haved_Return: haved_Return
          })
        }
      },
      fail() { }
    });
  },

  /*deleteOrder(e) {
    //显示是否删除订单弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要删除该订单吗？',
      success: (result) => {
        if (result.confirm) {
          //获取订单id
          var id = e.currentTarget.dataset.id;
          let allOrder = this.data.all_Order;
          for (var i = 0; i < allOrder.length; i++) {
            if (allOrder[i]._id == id) {
              allOrder.splice(i, 1);
              this.setData({
                all_Order: allOrder
              });
              break;
            }
          };
          wx.request({
            url: 'http://localhost:8888/wx/deleteOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: id
            },
            success(res) { },
            fail() { }
          });
        } else
          return;
      }
    })
  },*/

  //取消订单
  cancelOrder(e) {
    var that = this;
    //显示是否删除订单弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要取消该订单吗？',
      success: (result) => {
        if (result.confirm) {
          //获取订单id
          var id = e.currentTarget.dataset.id;
          wx.request({
            url: 'http://localhost:8888/wx/deleteOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: id
            },
            success(res) {
              that.getOrder();
            },
            fail() { }
          });
        } else
          return;
      }
    })
  },

  //跳转到全部订单页面
  overOrder(e) {
    var id = e.currentTarget.dataset.id;
    var state = e.currentTarget.dataset.state;
    //根据全部订单的状态，分别进入不同的页面
    if (state == "交易关闭" || state == "交易成功") {
      wx.navigateTo({
        url: '/pages/overOrder/overOrder?orderId=' + id,
      })
    } else if (state == "待付款") {
      wx.navigateTo({
        url: '/pages/waitPaid/waitPaid?orderId=' + id,
      })
    } else if (state == "待发货") {
      wx.navigateTo({
        url: '/pages/waitSent/waitSent?orderId=' + id,
      })
    } else if (state == "待收货") {
      wx.navigateTo({
        url: '/pages/waitReceived/waitReceived?orderId=' + id,
      })
    } else if (state == "退款中") {
      wx.navigateTo({
        url: '/pages/havedReturn/havedReturn?orderId=' + id,
      })
    };
    wx.setStorageSync("aShow", "全部")
  },

  //跳转到待付款订单页面
  waitPaid(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/waitPaid/waitPaid?orderId=' + id,
    });
    wx.setStorageSync("aShow", "待付款")
  },

  //跳转到待发货详情页面
  waitSent(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/waitSent/waitSent?orderId=' + id,
    });
    wx.setStorageSync("aShow", "待发货")
  },

  //跳转到待收货详情页面
  waitReceived(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/waitReceived/waitReceived?orderId=' + id,
    });
    wx.setStorageSync("aShow", "待收货")
  },

  //跳转到退款详情页面
  havedReturn(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/havedReturn/havedReturn?orderId=' + id,
    });
    wx.setStorageSync("aShow", "退款")
  },

  //申请退款
  toReturn(e) {
    //显示是否申请退款弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要申请退款吗？',
      success: (result) => {
        if (result.confirm) {
          var _id = e.currentTarget.dataset.id;
          wx.navigateTo({
            url: '/pages/returnReason/returnReason?orderId=' + _id
          })
        } else
          return;
      }
    })
  },

  //取消退款
  cancelReturn(e) {
    //显示是否取消退款弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要取消退款吗？',
      success: (result) => {
        if (result.confirm) {
          var that = this;
          var _id = e.currentTarget.dataset.id;
          var expressNumber = e.currentTarget.dataset.expressnumber;
          let all_Order = that.data.all_Order;
          let haved_Return = that.data.haved_Return;
          if (expressNumber) {
            var toState = "待收货"
          } else {
            var toState = "待发货"
          }
          wx.request({
            url: 'http://localhost:8888/wx/changeOrderState',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: _id,
              toState: toState,
              state: "取消退款",
            },
            success(res) {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 1000,
                mask: true
              });
              that.getOrder();
            },
            fail() { }
          })
        } else
          return;
      }
    })
  },

  //确认收货
  toReceive(e) {
    var that=this;
    //显示是否确认收货弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要确认收货吗？',
      success: (result) => {
        if (result.confirm) {
          var _id = e.currentTarget.dataset.id;
          wx.request({
            url: 'http://localhost:8888/wx/changeOrderState',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: _id,
              state: "待收货"
            },
            success(res) { 
              that.getOrder()
            },
            fail() { }
          })
        } else
          return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //清除所有跳转标志缓存
    if (wx.getStorageInfoSync("aShow"))
      wx.removeStorageSync('aShow')
    if (wx.getStorageInfoSync("tip"))
      wx.removeStorageSync('tip')
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的type参数
    var {
      type
    } = currentPage.options;
    var t = wx.getStorageSync("type");
    if (t) {
      var type = wx.getStorageSync("type");
      wx.removeStorageSync("type");
    }
    this.setData({
      presentType: type
    })
    //4.激活选中页面标题 当type=1时，index=0 
    this.changeTitleByIndex(type - 1);
    this.getOrder();
  },
})