// pages/addAddress/addAddress.js
import WxValidate from '../../utils/WxValidate/WxValidate.js';
//开发者可以通过 getApp 方法获取到全局唯一的 App 示例，获取App上的数据或调用开发者注册在 App 上的函数。
const app = getApp()
var region_name = [];
var addressList = null
Page({

  data: {
    region: '', //地区
    region_all: '', //地区显示
    detail_address: '', //详细地址
    consignee_name: '', //收货人
    mobile_number: '', //手机号码
    tip: '',//判断是否从选择地址中跳转过来的标志
    index: Number//选择地中传递过来数组下标
  },

  //获取地区选择器
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
    this.data.region_all = this.data.region[0] + this.data.region[1] + this.data.region[2];
    this.setData({
      region_all: this.data.region_all
    })
  },

  //获取微信定位
  getLocation() {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var address = res.address
        _this.setData({
          detail_address: address
        })
      },
    })
  },

  //不符合要求弹框
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //保存按钮
  saveAddress(e) {
    //保存判断
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.submitInfo(params);
    //获取index，如果index为1.则实现保存功能，若index为2，实现设置默认地址功能
    var index = e.detail.target.dataset.index;
    if (index == 1) {
      //判断缓存中是否有changeAddress
      var changeAddress = wx.getStorageSync("changeAddress");
      //如果通过新增收货地址点进来，执行if
      if (!changeAddress) {
        //新增地址页面内容赋值给addressList对象
        let addressList = {
          consignee: e.detail.value.consignee,
          mobile: e.detail.value.mobile,
          region_name: e.detail.value.region_name[0] + e.detail.value.region_name[1] + e.detail.value.region_name[2],
          detail_address: e.detail.value.detail_address
        }
        //获取缓存中的地址列表
        var array = wx.getStorageSync('addressList') || [];
        //判断标志
        var flag = 1;
        //与已存在的地址进行判断，重复则不添加
        for (var i = 0; i < array.length; i++) {
          if (addressList.consignee == array[i].consignee && addressList.mobile == array[i].mobile && addressList.detail_address == array[i].detail_address && addressList.region_name == array[i].region_name) {
            flag = 0;
          }
        }
        //如果不重复，则插入到地址列表末尾
        if (flag == 1) {
          array.push(addressList);
          wx.setStorageSync('addressList', array);
          wx.showToast({
            title: '保存成功！',
          })
          setTimeout(function () {
            wx.navigateBack({ //返回

            })

          }, 1000);
        } else {
          wx.showToast({
            title: '已存在相同地址',
            icon: "none"
          })
          setTimeout(function () {
            wx.navigateBack({ //返回

            })

          }, 1000);
        }
      } else { //编辑地址页面
        var addressList = wx.getStorageSync("addressList");
        var flag1 = false;
        var region_name = this.data.region_all;
        addressList.forEach(function (v, i) {
          if (v.consignee == e.detail.value.consignee && v.detail_address == e.detail.value.detail_address && v.mobile == e.detail.value.mobile && v.region_name == region_name && i != changeAddress.id) {
            flag1 = true;
          }
        })
        if (flag1 == false) {
          //将修改内容写入地址列表
          addressList[changeAddress.id].consignee = e.detail.value.consignee;
          addressList[changeAddress.id].detail_address = e.detail.value.detail_address;
          addressList[changeAddress.id].mobile = e.detail.value.mobile;
          addressList[changeAddress.id].region_name = this.data.region_all;
        } else if (flag1 == true) {
          //如果地址列表中存在与修改后的地址相同的地址，则删除该地址
          addressList.splice(changeAddress.id, 1);
        }
        //将修改好的内容放进缓存
        wx.setStorageSync("addressList", addressList)
        //获取默认地址
        var defaultAddress = wx.getStorageSync('defaultAddress')
        //点击编辑默认地址
        if (changeAddress.consignee == defaultAddress.consignee && changeAddress.mobile == defaultAddress.mobi1 && changeAddress.region_name == defaultAddress.region_name && changeAddress.detail_address == defaultAddress.detail_address) {
          defaultaddress.consignee = e.detail.value.consignee;
          defaultAddress.mobile = e.detail.value.mobile;
          defaultAddress.region_name = this.data.region_all;
          defaultAddress.detail_address = e.detail.value.detail_address;
        }
        //将默认地址放进缓存
        wx.setStorageSync('defaultAddress', defaultAddress);
        //如果从选择地址跳转修改，则在返回前将修改后的地址放入缓存
        if (this.data.tip) {
          var addressList = wx.getStorageSync('addressList')
          wx.setStorageSync('selectToChange', addressList[this.data.index]);
        }
        //延迟返回
        wx.showToast({
          title: '修改成功！',
        })
        setTimeout(function () {
          wx.navigateBack({ //返回

          })

        }, 1000);
      }
      //返回时将编辑缓存清空
      wx.removeStorageSync('changeAddress')
    } else if (index == 2) {
      //将编辑框的内容赋值给defaultAddress
      let defaultAddress = {
        consignee: e.detail.value.consignee,
        mobile: e.detail.value.mobile,
        region_name: this.data.region_all,
        detail_address: e.detail.value.detail_address,
        isActive: true
      };
      wx.setStorageSync('defaultAddress', defaultAddress);
      //判断进入方式，新增进入还是修改进入
      var changeAddress = wx.getStorageSync('changeAddress');
      //如果新增进入，就将默认地址放入缓存，并且插入地址列表头部
      if (!changeAddress) {
        //将默认地址存入新建数组中
        var arr = [];
        arr.push(defaultAddress);
        //获取缓存中的地址列表
        var addressList = wx.getStorageSync('addressList') || [];
        //如果地址列表为空，则直接插入
        if (addressList.length == 0) {
          wx.setStorageSync('addressList', arr)
        } else {
          var flag = 1;
          //将地址列表与默认列表相同的地址内容设置默认激活标志
          for (var i = 0; i < addressList.length; i++) {
            addressList[i].isActive = false;
            if (addressList[i].consignee == defaultAddress.consignee && addressList[i].detail_address == defaultAddress.detail_address && addressList[i].mobile == defaultAddress.mobile && addressList[i].region_name == defaultAddress.region_name) {
              flag = 0;
              //将默认地址显示在列表头
              addressList[i] = addressList[0];
              addressList[0] = defaultAddress;
              wx.setStorageSync('addressList', addressList);
            }
          }
          if (flag == 1) {
            //如果不为空且与地址列表无重复，则将第一条地址的isActive设置为false，并拼接默认地址
            addressList[0].isActive = false;
            wx.setStorageSync('addressList', arr.concat(addressList))
          }
        }
      } else {
        //获取地址列表缓存
        var addressList = wx.getStorageSync('addressList');
        var flag = 1;
        //将地址列表与默认列表相同的地址内容设置默认激活标志
        for (var i = 0; i < addressList.length; i++) {
          addressList[i].isActive = false;
          if (addressList[i].consignee == defaultAddress.consignee && addressList[i].detail_address == defaultAddress.detail_address && addressList[i].mobile == defaultAddress.mobile && addressList[i].region_name == defaultAddress.region_name) {
            //将默认地址显示在列表头
            flag = 0;
            addressList[i] = addressList[0];
            addressList[0] = defaultAddress;
            addressList[0].isActive = true;
            wx.setStorageSync('addressList', addressList);
          }
        }
        //若修改了默认地址
        if (flag == 1) {
          //将默认地址显示在列表头
          addressList[wx.getStorageSync('changeAddress').id] = addressList[0];
          addressList[0] = defaultAddress;
          wx.setStorageSync('addressList', addressList);
        }
      }
      wx.showToast({
        title: '设置成功！',
      })
      setTimeout(function () {
        wx.navigateBack({ //返回

        })

      }, 1000);
    }
  },

  //表单提交成功
  submitInfo(params) {
    // form提交
    let form = params;
  },

  //进入新增地址页面就实现表单验证
  onLoad: function (options) {
    this.initValidate();
  },

  //表单验证
  initValidate() {
    const rules = {
      consignee: {
        required: true,
        rangelength: [2, 4]
      },
      mobile: {
        required: true,
        digits: true,
        tel: true
      },
      region_name: {
        required: false,
        region_name: false,
      },
      detail_address: {
        required: true,
        maxlength: 60
      },
    }
    //验证字段提示信息
    const messages = {
      consignee: {
        required: '请输入姓名',
        rangelength: '请输入正确姓名！'
      },
      mobile: {
        required: '请输入手机号',
        digits: '请输入正确手机号!',
        rangelength: '请输入正确手机号!'
      },
      region_name: {
        required: '请选择地区',
        region_name: '请选择正确地区',
      },
      detail_address: {
        required: '请输入详细地址',
        maxlength: '请输入正确详细地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  onShow(options) {
    //页面刷新马上获取编辑缓存
    let changeAddress = wx.getStorageSync('changeAddress')
    //如果编辑缓存存在，更新编辑框显示内容
    if (changeAddress) {
        this.setData({
          region_all: changeAddress.region_name,
          consignee_name: changeAddress.consignee,
          mobile_number: changeAddress.mobile,
        })
        if(!this.data.detail_address){
          this.setData({
            detail_address:changeAddress.detail_address
          })
        }
      region_name = this.data.region_all;
    }
    //返回标志，放入缓存，若点击左上角返回，设置为true
    wx.setStorageSync('aShow', true)

    //判断是否从选择地址跳转过来
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取页面标志参数tip
    var tip = currentPage.options.tip;
    //获取数组下标
    var index = currentPage.options.index;
    if (tip) {
      this.setData({
        tip: true,
        index: index
      })
    }
  }
})