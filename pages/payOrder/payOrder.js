// pages/payOrder/payOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [], //地址信息
    select_address: [], //改变后的地址 
    all_Order: [], //商品列表
    total_number: "", //总数量
    total_money: "", //总价格
    datetimeTo: "", //关闭时间
    waitPaidOrder: {}, //待支付订单
    waitReceivedOrder:{},//待收货订单
    userWord:"",//用户留言
    freight:0//运费
  },

  //修改支付的个人信息
  change_address() {
    wx.navigateTo({
      url: '/pages/myaddress/myaddress',
    })
  },

  //前往添加地址信息
  add_address() {
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },

  getTime() {
    var timestamp =
      Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp *
      1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() +
      1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() <
      10 ? '0' + date.getDate() :
      date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var now_time = Y + "/" + M + "/" + D + " " + h + ": " + m + ":" + s + " GMT+0800";

    //加一天的时间戳：  
    var tomorrow_timetamp = timestamp + 24*60*60;
    //加一天的时间：  
    var n_to = tomorrow_timetamp * 1000;
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
    this.setData({
      datetimeTo: datetimeTo,
    })
  },

  //提交订单
  submitOrder() {
    var that = this;
    that.getTime();
    var datetimeTo = that.data.datetimeTo;
    //判断地址是否有重新选择
    if (!that.data.select_address) {
      var address = that.data.addressList
    } else {
      var address = that.data.select_address
    }
    wx.showModal({
      title: '提示',
      content: '您确定要提交订单吗？',
      success: (result) => {
        //确认支付即为待收货订单
        if (result.confirm) {
          wx.request({
            url: 'http://localhost:8888/wx/createOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              address: JSON.stringify(address),
              state: "待收货",
              goods: JSON.stringify(that.data.all_Order),
              totalPrice: that.data.total_money,
              datetimeTo:datetimeTo
            },
            success(res) {
              //将数据渲染给本地appData
              that.setData({
                waitReceivedOrder: res.data.order
              });
              //跳转时携带参数
              wx.navigateTo({
                url: '/pages/waitReceived/waitReceived?datetimeTo=' + datetimeTo + '&waitReceivedOrder=' + JSON.stringify(that.data.waitReceivedOrder)
              })
            },
            fail() {}
          })
        } else {
          //取消则为待付款订单
          wx.request({
            url: 'http://localhost:8888/wx/createOrder',
            method: 'POST',
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              address: JSON.stringify(address),
              state: "待付款",
              goods: JSON.stringify(that.data.all_Order),
              totalPrice: that.data.total_money,
              datetimeTo:datetimeTo
            },
            success(res) {
              //将数据渲染给本地appData
              that.setData({
                waitPaidOrder: res.data.order
              });
              //跳转时携带参数
              wx.navigateTo({
                url: '/pages/waitPaid/waitPaid?datetimeTo=' + datetimeTo + '&waitPaidOrder=' + JSON.stringify(that.data.waitPaidOrder)
              })
            },
            fail() {}
          });
        }
      }
    })
  },

  //获取用户留言
  getUserWord(e){
    this.setData({
      userWord:e.detail.value
    })
  },

  //获取默认地址
  getDefaultAddress() {
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/getDefaultAddress',
      method: 'GET',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {},
      success(res) {
        that.setData({
          addressList: res.data.defaultAddress
        })
      },
      fail() {}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //每次刷新页面判断默认地址或选择地址
    this.getDefaultAddress();
    //如果缓存中有修改的地址信息，优先选择
    var select = wx.getStorageSync("select_address");
    if (!select.cosignee)
      this.setData({
        select_address: select
      })
    wx.removeStorageSync("select_address");
    //提取缓存中的购物车信息
    var cart = wx.getStorageSync("cart");
    var total = 0;
    var order = [];
    //计算每个商品的价格和总商品的价格
    for (var i = 0; i < cart.length; i++) {
      cart[i].all_money = cart[i].buyNumber * Number(cart[i].specification[cart[i].specificationIndex].price);
      total = total + cart[i].all_money;
      //将商品显示的数据存入order数组
      order[i] = {
        name: cart[i].name,
        url: cart[i].url,
        specification: cart[i].specification[cart[i].specificationIndex].name,
        buyNumber: cart[i].buyNumber,
        message: '三天无理由退款',
        unitPrice: cart[i].specification[cart[i].specificationIndex].price,
        goodPrice: JSON.stringify(cart[i].all_money)
      }
    };
    if(total>100)
    this.setData({
      freight:20
    })
    this.setData({
      all_Order: order,
      total_number: cart.length,
      total_money: total
    })
  },
})