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
    freight: "",//运费
    coupon: {},//优惠卷
    expressNumber: "",//快递单号
    createDate: "",//订单创建日期
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
          datetimeTo: res.data.order.datetimeTo,
          coupon: res.data.order.coupon,
          expressNumber: res.data.order.expressNumber,
          createDate: res.data.order.createDate,
          havedPaid:res.data.order.havedPaid,
          timestamp:res.data.order.timestamp
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
            //订单超时自动转为交易成功订单
            wx.request({
              url: common.apiHost+'wx/changeOrderState',
              method: 'POST',
              header: { //请求头
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": wx.getStorageSync('LocalToken')
              },
              data: {
                _id: that.data.orderId,
                state: "待收货转交易成功"
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

  //确认收货
  toReceive() {
    var that = this;
    //显示是否确认收货弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要确认收货吗？',
      success: (result) => {
        if (result.confirm) {
          var _id = that.data.orderId;
          wx.request({
            url: common.apiHost+'wx/changeOrderState',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              _id: _id,
              state: "待收货转交易成功"
            },
            success(res) {
              var aShow = wx.getStorageSync('aShow');
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
              let prevPage = pages[pages.length - 2];
              var tabs = prevPage.data.tabs;
              if (aShow = "待收货")
                tabs[3].isActive = true;
              if (aShow = "全部")
                tabs[0].isActive = true;
              //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
              prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                tabs: tabs
              })
              wx.navigateBack({
                delta: 1
              })
            },
            fail() { }
          })
        } else
          return;
      }
    })
  },

  //查看物流信息
  viewLogistics(){
    var expressNumber=this.data.expressNumber;
    var that=this;
    wx.request({
      url: common.apiHost+`wx/kuaidi/${expressNumber}`,
      method: 'GET',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {},
      success(res) {
        wx.navigateTo({
          url: '/pages/logisticsInformation/logisticsInformation?data='+JSON.stringify(res.data.data)+'&expressNumber='+expressNumber+'&createDate='+that.data.createDate,
        })
      },
      fail() { }
    })
  },

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
    //获取页面标志
    var aShow = wx.getStorageSync("aShow");
    if (!aShow) {
      //将该页面参数放入缓存
      var type = 4;
      wx.setStorageSync("type", type);
    }
    wx.removeStorageSync("aShow")
  },
});