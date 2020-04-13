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
    timestamp: "", //关闭时间戳
    waitPaidOrder: {}, //待支付订单
    waitSentOrder: {},//待发货订单 
    userWord: "无",//用户留言
    freight: 0,//运费
    cheap: "",//优惠
    canUseCoupon: [],//可用优惠卷数组
    selectCoupon: {},//选择的优惠卷
    isCart: Boolean,//判断是否是从购物车来的数据
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
    var tomorrow_timetamp = timestamp + 20 * 60 * 60;
    this.setData({
      timestamp: tomorrow_timetamp,
    })
  },

  //提交订单
  submitOrder() {
    var that = this;
    that.getTime();
    var timestamp = that.data.timestamp;
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
        //确认支付即为待发货订单
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
              state: "待发货",
              goods: JSON.stringify(that.data.all_Order),
              totalPrice: that.data.total_money,
              coupon: JSON.stringify(that.data.selectCoupon),
              userWord: that.data.userWord
            },
            success(res) {
              if (res.data.stockMessage == "库存减少成功") {
                //将数据渲染给本地appData
                that.setData({
                  waitSentOrder: res.data.order,
                });
                //跳转时携带参数
                wx.reLaunch({
                  url: '/pages/waitSent/waitSent?waitSentOrder=' + JSON.stringify(that.data.waitSentOrder)
                });
                //如果数据从购物车传过来的，提交订单成功后情况对应购物车缓存
                if (that.data.isCart == true) {
                  //获取缓存中的购物车列表
                  var cart = wx.getStorageSync('cart');
                  //假如购物车的商品全选结算
                  if (cart.length == that.data.all_Order.length)
                    //提交订单成功后情况购物车
                    wx.removeStorageSync('cart');
                  //如果选择的是购物车的某些商品结算
                  else if (cart.length > that.data.all_Order.length) {
                    cart.forEach(function (v, i) {
                      that.data.all_Order.forEach(function (value, index) {
                        //找到购物车与订单商品相同的，就删除购物车对应商品的数据
                        if (v._id == value._id) {
                          cart.splice(i, 1)
                        }
                      })
                    });
                    //将购物车列表重新放入缓存
                    wx.setStorageSync('cart', cart);
                  }
                }
              } else if (res.data.stockMessage == "库存不足") {
                //显示提交失败信息
                wx.showModal({
                  title: '提交失败',
                  content: '存在商品库存不足，请重新添加商品',
                  success: (result) => {
                    if (result.confirm) {
                      //回到上一级页面
                      wx.navigateBack({
                        delta: 1
                      })
                    } else
                      return;
                  }
                })
              } else if (res.data.stateMessage = "存在商品下架") {
                //显示提交失败信息
                wx.showModal({
                  title: '提交失败',
                  content: '存在商品已下架，请重新添加商品',
                  success: (result) => {
                    if (result.confirm) {
                      //回到上一级页面
                      wx.navigateBack({
                        delta: 1
                      })
                    } else
                      return;
                  }
                })
              }
            },
            fail() { }
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
              timestamp: timestamp,
              coupon: JSON.stringify(that.data.selectCoupon),
              userWord: that.data.userWord
            },
            success(res) {
              if (res.data.stockMessage == "库存减少成功") {
                //将数据渲染给本地appData
                that.setData({
                  waitPaidOrder: res.data.order,
                });
                //跳转时携带参数
                wx.reLaunch({
                  url: '/pages/waitPaid/waitPaid?timestamp=' + timestamp + '&waitPaidOrder=' + JSON.stringify(that.data.waitPaidOrder) + '&_id=' + that.data.waitPaidOrder._id
                });
                //设置从生产订单页面跳转的标志
                wx.setStorageSync('tip', true)
                //如果数据从购物车传过来的，提交订单成功后情况对应购物车缓存
                if (that.data.isCart == true) {
                  //获取缓存中的购物车列表
                  var cart = wx.getStorageSync('cart');
                  //假如购物车的商品全选结算
                  if (cart.length == that.data.all_Order.length)
                    //提交订单成功后情况购物车
                    wx.removeStorageSync('cart');
                  //如果选择的是购物车的某些商品结算
                  else if (cart.length > that.data.all_Order.length) {
                    cart.forEach(function (v, i) {
                      that.data.all_Order.forEach(function (value, index) {
                        //找到购物车与订单商品相同的，就删除购物车对应商品的数据
                        if (v._id == value._id) {
                          cart.splice(i, 1)
                        }
                      })
                    });
                    //将购物车列表重新放入缓存
                    wx.setStorageSync('cart', cart);
                  }
                }
              } else if (res.data.stockMessage == "库存不足") {
                //显示提交失败信息
                wx.showModal({
                  title: '提交失败',
                  content: '存在商品库存不足，请重新添加商品',
                  success: (result) => {
                    if (result.confirm) {
                      //回到上一级页面
                      wx.navigateBack({
                        delta: 1
                      })
                    } else
                      return;
                  }
                })
              } else if (res.data.stateMessage = "存在商品下架") {
                //显示提交失败信息
                wx.showModal({
                  title: '提交失败',
                  content: '存在商品已下架，请重新添加商品',
                  success: (result) => {
                    if (result.confirm) {
                      //回到上一级页面
                      wx.navigateBack({
                        delta: 1
                      })
                    } else
                      return;
                  }
                })
              }
            },
            fail() { }
          });
        }
      }
    })
  },

  //获取用户留言
  getUserWord(e) {
    this.setData({
      userWord: e.detail.value
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
      fail() { }
    })
  },

  //优惠状态(暂无可用，有可用优惠卷)
  cheapState() {
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/cheapState',
      method: "POST",
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {
        totalMoney: that.data.total_money
      },
      success(res) {
        if (res.data.state == "有可用优惠卷") {
          that.setData({
            canUseCoupon: res.data.canUseCoupon,
            cheap: res.data.state
          })
        } else if (res.data.state == "无可用优惠卷") {
          that.setData({
            cheap: res.data.state
          })
        }
      },
      fail() { }
    })
  },

  //跳转到可使用优惠卷页面
  toUseCoupon() {
    if (this.data.cheap == "有可用优惠卷") {
      wx.navigateTo({
        url: '/pages/myCoupon/myCoupon?canUseCoupon=' + JSON.stringify(this.data.canUseCoupon),
      })
    }
  },

  onLoad(options) {
    //页面进入时，获取传过来的商品数据
    var cart = JSON.parse(options.cart).cart;
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
        goodPrice: JSON.stringify(cart[i].all_money),
        _id: cart[i]._id,
        specificationIndex: cart[i].specificationIndex
      }
    };
    if (total > 100)
      this.setData({
        freight: 20
      })
    this.setData({
      all_Order: order,
      total_number: cart.length,
      total_money: total,
      isCart: JSON.parse(options.cart).isCart
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    this.cheapState();
  },
})