Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lastX:0
  },

  /*//获取微信信息
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
  },*/

  tap() {
    wx.showToast({
      title: '该功能尚未开放',
      icon: 'none',
      duration: 1500
    })
  },

  //前往全部订单
  toAll() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderList/orderList?type=1',
      })
    }
  },

  //前往待付款订单
  toWaitPaid() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderList/orderList?type=2',
      })
    }
  },

  //前往待发货订单
  toWaitSent() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderList/orderList?type=3',
      })
    }
  },

  //前往待收货订单
  toWaitReceived() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderList/orderList?type=4',
      })
    }
  },

  //前往退款中订单
  toReturn() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderList/orderList?type=5',
      })
    }
  },

  //前往个人信息页面
  toPersonalMessage() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/personalMessage/personalMessage',
      })
    }
  },

  //前往收货地址页面
  toAddressList() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/addressList/addressList',
      })
    }
  },

  //前往优惠卷页面
  toCoupon() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/coupon/coupon',
      })
    }
  },

  //前往优惠卷中心页面
  toCouponCenter() {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面 
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/couponCenter/couponCenter',
      })
    }
  },



  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  },

  handletouchstart: function (event) {
    // this.data.lastX = event.touches[0].pageX
  },
  handletouchend: function (event) {
    // if(event.changedTouches[0].pageX -this.data.lastX > 180)
    // {
    //   wx.switchTab({
    //     url: "../shoppingCart/shoppingCart"
    //   })
    // }
  }
})