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

  tap()
  {
    wx.showToast({
      title: '该功能尚未开放',
      icon: 'none',
      duration: 1500
    })
  },
  toPersonalMessage(){
    wx.navigateTo({
      url: '/pages/personalMessage/personalMessage',
    })
  },

  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  }
})