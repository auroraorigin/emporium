import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWx.js"; //导入异步函数
import regeneratorRuntime from '../../lib/runtime/runtime.js';
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [], //地址列表
    tip: "",//订单确认跳转收货地址标志
    address: {}//跳转传过来的地址
  },
  /*
  1 获取用户的收货地址
    1 绑定点击事件
    2 调用小程序内置api 获取用户的收货地址 wx.chooseAddress

  2 获取 用户对小程序所授予获取地址的权限 状态 scope
    1 假设用户点击获取收货地址的提示框 确定 authSetting scope.address
    scope 值 true 直接调用 获取收货地址
    2 假设用户从来没有调用过收货地址的api
    scope undefined 直接调用 获取收货地址
    3 假设用户点击获取收货地址的提示框 取消
    scope 值 false
      1 诱导用户自己打开授权设置页面（wx.openSetting）当用户重新结予获取地址权限的时候
      2 获取收货地址
    4 把获取到的收货地址 存入到 本地存储中
  3 页面加载完毕
    1 获取本地存储中的收货地址数据
    2 把数据 设置给data中的一个变量
   */
  //点击获取收货地址
  async getAddress() {
    try {
      //1 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //2 判断权限状态
      if (scopeAddress === true || scopeAddress === undefined) {
        //3 调用获取收货地址的api
        let address = await chooseAddress();
        //将获取到的值放入wxAddress对象中
        let wxAddress = {
          consignee: address.userName,
          detail_address: address.detailInfo,
          mobile: address.telNumber,
          region_name: address.provinceName + address.cityName + address.countyName,
        }
        //将wxAddress对象转为数组
        var creatArr = [];
        creatArr.push(wxAddress);
        var array = wx.getStorageSync('addressList') || [];
        //判断缓存中的地址列表是否为空，为空则直接放进地址列表，不为空则拼接进去
        if (!array) {
          wx.setStorageSync('addressList', creatArr)
        } else {
          //判断标志
          var flag = 1;
          //判断是否与原地址有重复
          for (var i = 0; i < array.length; i++) {
            if (wxAddress.consignee == array[i].consignee && wxAddress.mobile == array[i].mobile && wxAddress.detail_address == array[i].detail_address && wxAddress.region_name == array[i].region_name) {
              flag = 0;
            }
          }
          //如果地址不重复，则插入地址列表
          if (flag == 1) {
            wx.setStorageSync('addressList', array.concat(creatArr))
          }
        }
      } else {
        //3 先诱导用户打开授权页面
        await openSetting();
      }
    } catch (error) {

    }
  },

  //添加收货地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },

  //删除
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.currentTarget.dataset.index;
    //获取地址列表
    var list = this.data.addressList;
    var defaultAddress = wx.getStorageSync('defaultAddress');
    //如果要删除的地址是默认地址
    if (defaultAddress.consignee == list[index].consignee && defaultAddress.mobile == list[index].mobile && defaultAddress.region_name == list[index].region_name && defaultAddress.detail_address == list[index].detail_address) {
      //如果地址列表中只有一个地址，则将默认地址缓存清空
      if (list.length == 1) {
        wx.removeStorageSync('defaultAddress')
      }
      //如果地址列表中有多个地址，则将下一个地址标记为默认地址
      if (list.length > 1) {
        list[1].isActive = true;
        wx.setStorageSync('defaultAddress', list[1]);
      }
    }
    //移除列表中下标为index的项
    list.splice(index, 1);
    wx.setStorageSync("addressList", list);
    //更新列表的状态
    this.setData({
      addressList: list
    });
  },

  //编辑地址
  ref: function (e) {
    //获取要编辑的地址所在地址列表的位置
    var index = e.currentTarget.dataset.index;
    this.data.addressList[index].id = index;
    this.setData(
      this.data.addressList[index].id
    )
    var list = this.data.addressList;
    //将要修改的地址信息存入缓存
    wx.setStorageSync("changeAddress", list[index]);
    wx.navigateTo({
      url: '../../pages/addAddress/addAddress'
    })
  },

  //选择收货地址中的编辑地址
  ref: function (e) {
    //获取要编辑的地址所在地址列表的位置
    var index = e.currentTarget.dataset.index;
    this.data.addressList[index].id = index;
    this.setData(
      this.data.addressList[index].id
    )
    var list = this.data.addressList;
    //将要修改的地址信息存入缓存
    wx.setStorageSync("changeAddress", list[index]);
    //表示从选择地址中修改地址信息
    var tip = true;
    wx.navigateTo({
      url: '../../pages/addAddress/addAddress?tip=' + tip + '&index=' + index
    })
  },

  //获取地址列表
  getAddressList: function () {
    var that = this;
    wx.request({
      url: common.apiHost + 'wx/getAddressList',
      method: 'GET',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      data: {},
      success(res) {
        if (res.data.status == "ok") {
          //将获取到的地址分别存入缓存
          wx.setStorageSync('addressList', res.data.address.addressList);
          wx.setStorageSync('defaultAddress', res.data.address.defaultAddress);
          //本地appData赋值
          that.setData({
            addressList: res.data.address.addressList
          })
        }
      },
      fail(res) {

      }
    })
  },

  //将地址列表存入数据库
  saveAddressList: function () {
    var that = this;
    wx.request({
      url: common.apiHost + 'wx/saveAddressList',
      method: 'PUT',
      header: { //请求头
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": wx.getStorageSync('LocalToken')
      },
      //将地址转为字符提交
      data: {
        addressList: JSON.stringify(that.data.addressList),
        defaultAddress: JSON.stringify(wx.getStorageSync("defaultAddress")),
      },
      success() {
        //保存成功则清空地址缓存
        wx.removeStorageSync('addressList');
      },
      fail() { }
    })
  },

  //选择地址
  selectAddress(e) {
    var index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    //显示是否选择改地址弹窗
    wx.showModal({
      title: '提示',
      content: '您确定要选择该地址吗？',
      success: (result) => {
        if (result.confirm) {
          wx.setStorageSync('select_address', addressList[index]);
          addressList.forEach((v, i) => {
            v.selectActive = false;
          });
          this.setData({
            addressList: addressList
          })
          wx.navigateBack({
            delta: 1
          })
        } else
          return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //每次进入前判断缓存是否有token，没有表示未登录，强制进入登录授权页面
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      //刷新页面时获取缓存中的地址列表，并赋值给appData
      var arr = wx.getStorageSync('addressList') || [];
      //每次刷新,在地址列表不为空的情况下,都设置列表头为默认地址
      if (arr.length != 0) {
        arr[0].isActive = true;
        wx.setStorageSync("defaultAddress", arr[0])
      };
      this.setData({
        addressList: arr
      });
      //如果点击左上角返回，获取编辑缓存的标志
      let aShow = wx.getStorageSync("aShow");
      if (aShow) {
        wx.removeStorageSync('changeAddress');
        wx.removeStorageSync('aShow');
      }
      wx.removeStorageSync('array');

      //判断是否从订单确认跳转过来
      //1.获取当前小程序的页面栈-数组 最大长度为10页面
      let pages = getCurrentPages();
      //2.数组中索引最大的页面就是当前页面
      let currentPage = pages[pages.length - 1];
      //3.获取页面标志参数tip
      var tip = currentPage.options.tip;
      if (tip) {
        //获取传过来的地址
        var address = JSON.parse(currentPage.options.address);
        this.setData({
          tip: true,
          address: address
        }, function () {
          var addressList = this.data.addressList;
          addressList.forEach((v, i) => {
            if (v.consignee == address.consignee && v.mobile == address.mobile &&
              v.region_name == address.region_name && v.detail_address == address.detail_address) {
              v.selectActive = true
            } else {
              v.selectActive = false;
            }
          })
          this.setData({
            addressList: addressList
          }, function () {
            var selectToChange = wx.getStorageSync('selectToChange')
            if (selectToChange) {
              var addressList = this.data.addressList;
              wx.removeStorageSync('selectToChange');
              for (var index = 0; index < addressList.length; index++) {
                if (addressList[index].consignee == selectToChange.consignee && addressList[index].mobile == selectToChange.mobile &&
                  addressList[index].region_name == selectToChange.region_name && addressList[index].detail_address == selectToChange.detail_address) {
                  addressList[index].selectActive = true
                } else {
                  addressList[index].selectActive = false;
                }
              }
              this.setData({
                addressList: addressList
              })
            }
          })
        })
      }
    }
  },

  //进入页面
  onLoad() {
    this.getAddressList();
  },

  //退出页面
  onUnload() {
    this.saveAddressList();
    if (this.data.tip) {
      var addressList = this.data.addressList;
      addressList.forEach((v, i) => {
        if (v.selectActive == true)
          wx.setStorageSync('select_address', v)
      })
    }
  }
})