// pages/LogisticsInformation/LogisticsInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsInformation: [],//物流信息
    expressNumber: "",//快递编号
    createDate: ""//订单创建日期
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的物流信息参数
    var data = JSON.parse(currentPage.options.data);
    var expressNumber = currentPage.options.expressNumber;
    var createDate = currentPage.options.createDate
    //将data的第一个数组设置激活标志
    if (data.length != 1) {
      data[0].isActive = 'top';
      data[data.length - 1].isActive = "bottom";
    } else if (data.length == 1) {
      data[0].isActive = 'center';
    }
    this.setData({
      logisticsInformation: data,
      expressNumber: expressNumber,
      createDate: createDate
    })
  },
  onUnload()
  {
    var aShow=wx.getStorageSync('aShow');
    //如果是从全部订单查看物流，销毁页面时返回全部订单
    if(aShow=="全部"){
      wx.setStorageSync('type', 1)
    }else{
      wx.setStorageSync('type', 4)
    }
  }
})