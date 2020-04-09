// pages/myCoupon/myCoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canUseCoupon: []
  },

  //使用优惠卷
  useCoupon(e) {
    var that=this;
    //显示是否使用此优惠卷
    wx.showModal({
      title: '提示',
      content: '您确定要使用此优惠卷吗？',
      success: (result) => {
        if (result.confirm) {
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          //prevPage 是获取上一个页面的js里面的pages的所有信息,-2 是上一个页面
          let prevPage = pages[pages.length - 2];
          //获取选择的数组下标
          var index=e.currentTarget.dataset.id;
          //将上一级的选择优惠卷数组赋值
          prevPage.setData({
            selectCoupon:that.data.canUseCoupon[index]
          })
          //回到上一级页面
          wx.navigateBack({
            delta: 1
          })
        } else
          return;
      }
    })
  },

  onLoad(options) {
    this.setData({
      canUseCoupon: JSON.parse(options.canUseCoupon)
    })
  }
})