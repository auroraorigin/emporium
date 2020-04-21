const util = require('../../utils/util/util.js')
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({
  data: {
    addressList: [], //地址信息
    all_Order: [], //商品列表
    total_number: "", //总数量
    total_money: "", //总价格
    timestamp: "", // 关闭时间戳
    timeLeft: "", // 剩下的时间（天时分秒）
    orderId: "", //订单id,
    freight: "", //运费
    coupon: {},//优惠卷
    createDate: "",//订单创建日期
    waitToPaid: ""//待付款
  },

  //根据orderId加载订单详情
  getOrderDetail() {
    var that = this;
    wx.request({
      url: common.apiHost + 'wx/getOrderDetail',
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
          timestamp: res.data.order.timestamp,
          coupon: res.data.order.coupon,
          createDate: res.data.order.createDate,
          waitToPaid: res.data.order.havedPaid
        });
        var timestamp = that.data.timestamp;
        //加一天的时间：  
        var n_to = timestamp * 1000;
        var tomorrow_date = new Date(n_to);
        //加一天后的年份  
        var Y_tomorrow = tomorrow_date.getFullYear();
        //加一天后的月份  
        var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
        //加一天后的日期  
        var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
        //加一天后的时刻  
        var h_tomorrow = tomorrow_date.getHours();
        //加一天后的分钟  
        var m_tomorrow = tomorrow_date.getMinutes();
        //加一天后的秒数  
        var s_tomorrow = tomorrow_date.getSeconds();
        var datetimeTo = Y_tomorrow + "/" + M_tomorrow + "/" + D_tomorrow + " " + h_tomorrow + ": " + m_tomorrow + ":" + s_tomorrow + " GMT+0800";
        that.data.timer = setInterval(() => { //注意箭头函数！！
          that.setData({
            timeLeft: util.getTimeLeft(datetimeTo) //使用了util.getTimeLeft
          });
          if (that.data.timeLeft == "0天0时0分0秒" || that.data.timeLeft == "订单关闭") {
            clearInterval(that.data.timer);
            that.setData({
              timeLeft: "订单关闭"
            });
            //订单超时自动转为交易失败订单
            wx.request({
              url: common.apiHost + 'wx/changeOrderState',
              method: 'POST',
              header: { //请求头
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": wx.getStorageSync('LocalToken')
              },
              data: {
                _id: that.data.orderId,
                state: "待付款"
              },
              success(res) { },
              fail() { }
            })
          }
        }, 1000);
      },
      fail() { }
    })
  },

  //取消订单
  cancelOrder() {
    var that = this;
    //显示是否删除订单弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要取消该订单吗？',
      success: (result) => {
        if (result.confirm) {
          //获取订单id
          var id = that.data.orderId;
          wx.request({
            url: common.apiHost + 'wx/deleteOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: id
            },
            success(res) {
              var tip = wx.getStorageSync("tip");
              var aShow = wx.getStorageSync("aShow")
              //如果从生产订单跳转过来
              if (tip) {
                wx.reLaunch({
                  url: '/pages/orderList/orderList?type=2',
                })
              } else {
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                var tabs = prevPage.data.tabs;
                if (aShow = "待付款")
                  tabs[1].isActive = true;
                if (aShow = "全部")
                  tabs[0].isActive = true;
                //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
                prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                  tabs: tabs
                })
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            fail() { }
          });
        } else
          return;
      }
    })
  },

  //确认付款
  toPaid() {
    var that = this;
    //显示是否确认付款弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要付款吗？',
      success: (result) => {
        if (result.confirm) {
          //待付款订单转待发货订单
          wx.request({
            url: common.apiHost + 'wx/changeOrderState',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: that.data.orderId,
              state: "待付款转待发货"
            },
            success(res) {
              var stockMessage = res.data.stockMessage;
              var stateMessage = res.data.stateMessage;
              if (stockMessage == "库存减少成功" && stateMessage == "商品上架中") {
                //获取状态转换后的待发货orderId
                var orderId = that.data.orderId;
                wx.reLaunch({
                  url: '/pages/waitSent/waitSent?orderId=' + orderId,
                })
              } else if (stockMessage == "库存不足") {
                //显示是否退出登录弹窗
                wx.showModal({
                  title: '提示',
                  content: '存在商品库存不足，已为您自动关闭订单',
                  success: (result) => {
                    if (result.confirm) {
                      wx.request({
                        url: common.apiHost + 'wx/changeOrderState',
                        method: 'POST',
                        header: { //请求头
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": wx.getStorageSync('LocalToken')
                        },
                        data: {
                          _id: that.data.orderId,
                          state: "待付款转交易关闭"
                        },
                        success(res) {
                          var orderId = that.data.orderId;
                          wx.reLaunch({
                            url: '/pages/overOrder/overOrder?orderId=' + orderId,
                          })
                        },
                        fail() { }
                      })
                    } else {
                      wx.request({
                        url: common.apiHost + 'wx/changeOrderState',
                        method: 'POST',
                        header: { //请求头
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": wx.getStorageSync('LocalToken')
                        },
                        data: {
                          _id: that.data.orderId,
                          state: "待付款转交易关闭"
                        },
                        success(res) {
                          var orderId = that.data.orderId;
                          wx.reLaunch({
                            url: '/pages/overOrder/overOrder?orderId=' + orderId,
                          })
                        },
                        fail() { }
                      })
                    }
                  }
                })
              } else if (stateMessage == "商品已下架") {
                //显示是否退出登录弹窗
                wx.showModal({
                  title: '提示',
                  content: '存在商品已下架，已为您自动关闭订单',
                  success: (result) => {
                    if (result.confirm) {
                      wx.request({
                        url: common.apiHost + 'wx/changeOrderState',
                        method: 'POST',
                        header: { //请求头
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": wx.getStorageSync('LocalToken')
                        },
                        data: {
                          _id: that.data.orderId,
                          state: "待付款转交易关闭"
                        },
                        success(res) {
                          var orderId = that.data.orderId;
                          wx.reLaunch({
                            url: '/pages/overOrder/overOrder?orderId=' + orderId,
                          })
                        },
                        fail() { }
                      })
                    } else {
                      wx.request({
                        url: common.apiHost + 'wx/changeOrderState',
                        method: 'POST',
                        header: { //请求头
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": wx.getStorageSync('LocalToken')
                        },
                        data: {
                          _id: that.data.orderId,
                          state: "待付款转交易关闭"
                        },
                        success(res) {
                          var orderId = that.data.orderId;
                          wx.reLaunch({
                            url: '/pages/overOrder/overOrder?orderId=' + orderId,
                          })
                        },
                        fail() { }
                      })
                    }
                  }
                })
              }
            },
            fail() { }
          })
        } else
          return;
      }
    })
  },

  onShow(options) {
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
    if (orderId) {
      this.getOrderDetail();
    } else {
      var timestamp = currentPage.options.timestamp;
      var waitPaidOrder = JSON.parse(currentPage.options.waitPaidOrder);
      var _id = currentPage.options._id;
      //判断是否有使用优惠卷
      if (waitPaidOrder.coupon)
        this.setData({
          addressList: waitPaidOrder.address,
          all_Order: waitPaidOrder.goods,
          total_money: Number(waitPaidOrder.totalPrice),
          freight: Number(waitPaidOrder.freight),
          timestamp: timestamp,
          coupon: waitPaidOrder.coupon,
          createDate: waitPaidOrder.createDate,
          orderId: waitPaidOrder._id
        });
      else {
        this.setData({
          addressList: waitPaidOrder.address,
          all_Order: waitPaidOrder.goods,
          total_money: Number(waitPaidOrder.totalPrice),
          freight: Number(waitPaidOrder.freight),
          timestamp: timestamp,
          createDate: waitPaidOrder.createDate,
          orderId: waitPaidOrder._id
        });
      };
      //加一天的时间：  
      var n_to = timestamp * 1000;
      var tomorrow_date = new Date(n_to);
      //加一天后的年份  
      var Y_tomorrow = tomorrow_date.getFullYear();
      //加一天后的月份  
      var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
      //加一天后的日期  
      var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
      //加一天后的时刻  
      var h_tomorrow = tomorrow_date.getHours();
      //加一天后的分钟  
      var m_tomorrow = tomorrow_date.getMinutes();
      //加一天后的秒数  
      var s_tomorrow = tomorrow_date.getSeconds();
      var datetimeTo = Y_tomorrow + "/" + M_tomorrow + "/" + D_tomorrow + " " + h_tomorrow + ": " + m_tomorrow + ":" + s_tomorrow + " GMT+0800";
      this.data.timer = setInterval(() => { //注意箭头函数！！
        this.setData({
          timeLeft: util.getTimeLeft(datetimeTo) //使用了util.getTimeLeft
        });
        if (this.data.timeLeft == "0天0时0分0秒" || this.data.timeLeft == "订单关闭") {
          clearInterval(this.data.timer);
          this.setData({
            timeLeft: "订单关闭"
          });
          //订单超时自动转为交易失败订单 
          wx.request({
            url: common.apiHost + 'wx/changeOrderState',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: _id,
              state: "待付款转交易关闭"
            },
            success(res) { },
            fail() { }
          })
        }
      }, 1000);
    };
  },

  //页面关闭时执行
  onUnload() {
    //获取页面标志
    var aShow = wx.getStorageSync("aShow");
    if (aShow == "待付款") {
      wx.setStorageSync('type', 2)
    } else if (aShow == "全部") {
      wx.setStorageSync('type', 1)
    }
  },
});