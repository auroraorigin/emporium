//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],//地址列表
  },
  select_address(e){
    var index = e.currentTarget.dataset.index;
    var list = this.data.addressList;
    wx.setStorageSync("select_address", list[index]);
    wx.navigateBack({
      delta:1
    })
  },
  //获取地址列表
  getAddressList: function () {
    var that = this;
    wx.request({
      url: common.apiHost+'wx/getAddressList',
      method: 'GET',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {},
      success(res) {
        //本地appData赋值
        that.setData({
          addressList: res.data.address.addressList
        })
      },
      fail() { }
    })
  },
  onShow: function () {
    this.getAddressList();
  }
})