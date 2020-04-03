Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {} //微信信息(包括头像和昵称)
  },
  
  //获取微信信息
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
  },

  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  }
})