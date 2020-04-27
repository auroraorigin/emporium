//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    modalHidden: true,
    textmess: "", //编辑框同步内容
    name: "", //姓名
    mobile: "", //手机号
    wxNumber: "", //微信号
    detailAddress: "", //详细地址
    temp: "", //存储编辑框内容
    date: '', //日期
    region: ['', '', ''], //地区选择器
    _region: '', //页面显示地区
    sex: ['暂不选择', '男', '女'], //性别选择器
    _sex: '', //页面显示性别
    customItem: '请选择', //地区选择器的第一行
    ch: [{
      id: 0,
      title: ""
    },], //编辑框title，默认为空
    Id: [{
      id: ""
    },]
  },

  //弹框功能
  ShowModal: function (e) {
    //获取设置id属性
    var ID = e.currentTarget.dataset.id;
    var da = this.data.Id;
    da.id = ID;
    var data = this.data.ch;
    var i = data.length;
    //弹框标题
    data[i - 1].title = e.currentTarget.dataset.title;
    //编辑框弹出显示已保存内容
    switch (da.id) {
      //0表示弹框title为name,1表示手机号，2表示微信号，3表示详细地址
      case "0":
        this.setData({
          modalHidden: !this.data.modalHidden, //不隐藏弹框
          ch: data,
          textmess: this.data.name //同步弹框的输入显示为已保存的信息
        });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.mobile
        });
        break;
      case "2":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.wxNumber
        });
        break;
      case "3":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.detailAddress
        });
        break;
    }
  },

  //同步编辑框
  settext(e) {
    this.setData({
      temp: e.detail.value
    });
  },

  //确定model
  modalBindconfirm: function (e) {
    var da = this.data.Id;
    //确定后修改本地内容为编辑内容
    switch (da.id) {
      case "0":
        this.setData({
          modalHidden: !this.data.modalHidden, //将弹框隐藏
          name: this.data.temp //将编辑框内容赋值给对应显示信息
        });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          mobile: this.data.temp
        });
        break;
      case "2":
        this.setData({
          modalHidden: !this.data.modalHidden,
          wxNumber: this.data.temp
        });
        break;
      case "3":
        this.setData({
          modalHidden: !this.data.modalHidden,
          detailAddress: this.data.temp
        });
        break;
    }
    //显示修改成功的model
    wx.showToast({
      title: '修改成功',
      duration: 1000,
      mask: true,
      icon: 'success',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },

  //取消model
  modalBindcancel: function (e) {
    var da = this.data.Id;
    //取消修改则本地内容不变，不与编辑框同步
    switch (da.id) {
      case "0":
        this.setData({
          modalHidden: !this.data.modalHidden, //隐藏编辑框
          temp: this.data.name, //取消已修改的内容，存储为修改前的内容
        });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          temp: this.data.mobile,
        });
        break;
      case "2":
        this.setData({
          modalHidden: !this.data.modalHidden,
          temp: this.data.wxNumber,
        });
        break;
      case "3":
        this.setData({
          modalHidden: !this.data.modalHidden,
          temp: this.data.detailAddress,
        });
        break;
    }
  },

  //性别选择器
  bindPickerChange: function (e) {
    //将选择的性别赋值进显示的变量中
    this.setData({
      _sex: this.data.sex[e.detail.value]
    }),
      //弹框修改成功model
      wx.showToast({
        title: '修改成功',
        duration: 1000,
        mask: true,
        icon: 'success',
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },

  //日期选择器
  bindDateChange: function (e) {
    //将选择的日期赋值进显示的变量中
    this.setData({
      date: e.detail.value
    }),
      wx.showToast({
        title: '修改成功',
        duration: 1000,
        mask: true,
        icon: 'success',
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },

  //地区选择器
  bindRegionChange: function (e) {
    //将选择的地区赋值进显示的变量中
    this.setData({
      _region: e.detail.value[0] + ' ' + e.detail.value[1] + ' ' + e.detail.value[2]
    }),
      wx.showToast({
        title: '修改成功',
        duration: 1000,
        mask: true,
        icon: 'success',
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },

  //跳转到收货地址
  jumpToHarvestAddress: function (e) {
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },

  //加载个人信息
  getMessage() {
    var that = this; // 重置data{}里数据时候setData方法的this应为函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: common.apiHost + 'wx/getUserMessage',
      method: 'GET',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {},
      success: function (res) {
        //判断返回状态
        if (res.data.status == "ok")
        //将收到的数据赋值给appData
        {
          that.setData({
            name: res.data.message.name,
            mobile: res.data.message.mobile,
            _sex: res.data.message.sex,
            date: res.data.message.birthday,
            _region: res.data.message.region,
            wxNumber: res.data.message.wxNumber,
            detailAddress: res.data.message.detailAddress
          })
        }
      },
      fail: function (res) { }
    })
  },

  //更新个人信息
  messageUpdata() {
    wx.request({
      url: common.apiHost + 'wx/userMessageUpdata',
      method: 'PUT',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      //传递修改后的数据
      data: {
        name: this.data.name,
        mobile: this.data.mobile,
        sex: this.data._sex,
        birthday: this.data.date,
        region: this.data._region,
        wxNumber: this.data.wxNumber,
        detailAddress: this.data.detailAddress
      },
      success: function (res) { },
      fail: function (res) { }
    })
  },

  //打开页面显示个人信息
  onShow: function (options) {
      this.getMessage();
  },

  onLoad(){
    
  },

  //关闭页面存储修改后的信息
  onUnload: function (options) {
    this.messageUpdata();
  }
})