// pages/couponCenter/couponCenter.js
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [], //通用优惠卷列表 
  },

  //加载优惠卷中心列表
  getCouponCenter() {
    var that = this;
    wx.request({
      url: common.apiHost+'wx/getCouponCenter',
      method: "GET",
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      success(res) {
        if (res.data.status == "ok") {
          that.setData({
            couponList: res.data.couponList
          })
        }
      },
      fail() {}
    })
  },

  //领取优惠卷
  getCoupon(e) {
    var that = this;
    //弹框提示是否获取优惠卷
    wx.showModal({
      title: '提示',
      content: '您确定要获取该优惠卷吗？', 
      success: (result) => {
        //确定则执行以下内容
        if (result.confirm) {
          //获取data-id
          var index = e.currentTarget.dataset.id;
          wx.request({
            url: common.apiHost+'wx/getCoupon',
            method: "POST",
            header: { //请求头
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": wx.getStorageSync('LocalToken')
            },
            data: {
              id: that.data.couponList[index]._id,
              number: that.data.couponList[index].number
            },
            success(res) {
              //如果领取成功，激活isActive，用户不可再领取
              if (res.data.status == "ok") {
                let couponList = that.data.couponList;
                couponList[index].isActive = true;
                couponList[index].number = couponList[index].number - 1;
                that.setData({
                  couponList: couponList
                });
                //领取成功model
                wx.showToast({
                  title: '领取成功',
                  duration: 1000,
                  mask: true,
                  icon: 'success',
                  success: function() {},
                  fail: function() {},
                  complete: function() {}
                })
              }
            },
            fail() {}
          })
        } else
          return;
      }
    })
  },

  onLoad() {
    this.getCouponCenter();
  }
})