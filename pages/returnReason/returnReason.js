// pages/returnReason/returnReason.js
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnReason: [
      "地址信息填错",
      "发货时间太久",
      "突然不想要了",
      "商品选错，想重新购买",
      "送达时间太长了",
      "客服态度差",
      "其他"
    ],//供选择的原因
    selectReason: "",//选择的原因
    value: "",//输入内容
    orderId: "",//申请退款的订单ID
    type: ""//进入前的页面参数
  },

  //原因选择器
  bindReasonChange(e) {
    //将选择的性别赋值进显示的变量中
    this.setData({
      selectReason: this.data.returnReason[e.detail.value]
    })
  },

  //将其他原因内容赋值给本地appData
  orderReason(e) {
    this.setData({
      value: e.detail.value
    })
  },

  //确定
  saveReason(e) {
    let value = this.data.value;
    let selectReason = this.data.selectReason;
    var orderState = this.data.orderState;
    //如果没有选择退款原因
    if (!selectReason) {
      wx.showToast({
        title: '请填写退款原因',
        duration: 1000,
        icon: 'none',
        mask: true,
      })
    } else if (selectReason == '其他' && (!value)) {//如果选择退款原因为其他，但没有填写
      wx.showToast({
        title: '请填写其他原因',
        duration: 1000,
        icon: 'none',
        mask: true,
      })
    } else {
      var that = this;
      //如果为选择的原因
      if (!value) {
        var returnReason = selectReason;
      } else if (value) {
        //如果为自己填写的原因
        var returnReason = value
      }
      wx.request({
        url: common.apiHost + 'wx/changeOrderState',
        method: 'POST',
        header: { //请求头
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('LocalToken')
        },
        data: {
          _id: that.data.orderId,
          state: "申请退款",
          returnReason: returnReason
        },
        success(res) {
          wx.reLaunch({
            url: '/pages/havedReturn/havedReturn?orderId=' + that.data.orderId,
          })
        },
        fail() { }
      })
    }
  },

  onShow(options) {
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的type参数
    var orderId = currentPage.options.orderId;
    var type = currentPage.options.type;
    //渲染
    this.setData({
      orderId: orderId,
      type: type
    })
  },

  onUnload() {
    var type = this.data.type;
    wx.setStorageSync('type', type)
  }
})