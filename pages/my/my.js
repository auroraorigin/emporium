Page({

  /**
   * 页面的初始数据
   */
  data: { 
  },
  
  /*//获取微信信息
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
  },*/

  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  }
})