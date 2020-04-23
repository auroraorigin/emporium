// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "" //用于判断token，来显示退出登录按钮
  },

  //退出登录
  outLogin() {
    //显示是否退出登录弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: (result) => {
        if (result.confirm) {
          let cart=wx.getStorageSync('cart');
          //将缓存全部清空
          wx.clearStorage();
          //将购物车缓存重新存入缓存
          wx.setStorageSync('cart', cart);
          //回到上一级页面
          wx.navigateBack({
            delta: 1
          })
        } else
          return;
      }
    })
  },

  onLoad(){
    //获取缓存中的token，判断是否存在token
    this.setData({
      token: wx.getStorageSync("LocalToken")
    });
  }
})