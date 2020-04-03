//const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    list: [], //可用优惠卷列表
    overList: [], //不可用优惠卷列表
  },

  //切换优惠卷功能
  tabFun(e) {
    //获取切换设置的index
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
    //切换页面时发送请求获取数据
    this.getCouponList();
  },

  getCouponList() {
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/getCouponList',
      method: 'POST',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {
        state: that.data.tabIndex
      },
      success(res) {
        if (that.data.tabIndex == 1) {
          that.setData({
            list: res.data.coupon
          })
        } else if (that.data.tabIndex == 2) {
          that.setData({
            overList: res.data.coupon
          })
        }
      },
      fail() {}
    })
  },

  //进入页面就发送请求获取数据
  onLoad() {
    this.getCouponList();
  }
})