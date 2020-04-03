import {
  request
} from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
//Page Object
Page({
  data: {
    searchList: [{
        id: 4,
        name: "商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "100.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "100.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 5,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "20.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "20.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 6,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "120.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "120.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 7,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "130.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "130.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      }
    ],
    tempList: [{
        id: 4,
        name: "商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "100.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "100.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 5,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "20.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "20.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 6,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "120.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "120.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      },
      {
        id: 7,
        name: "商品名称",
        src: "../../images/homePage/floor.jpg",
        maxPrice: "200.00",
        minPrice: "130.00",
        maxFreight: "20.00",
        minFreight: "10.00",
        stock: 25,
        specifiation: [{
          name: "一斤",
          price: "130.00",
          stock: 8,
          freight: "10.00"
        }, {
          name: "两斤",
          price: "150.00",
          stock: 5,
          freight: "15.00"
        }, {
          name: "三斤",
          price: "200.00",
          stock: 12,
          freight: "20.00"
        }],
        buyMaxNumber: 25,
        lableCurrentIndex: -1,
        buyNumber: 1,
        specifiationIndex: -1,
        checked: 1
      }
    ],
    value: '',
    type: 1,
    hideSpecifiation: 1,
    animationDataShadow: {},
    animationData: {},
    index: 0,
    first:1
  },
  //options(Object)
  inputNumber(e) {
    let value = e.detail.value;
    this.setData({
      value
    })
  },
  //重置输入框内容
  clear() {
    this.setData({
      value: ''
    })
  },
  //点击输入法搜索
  complete(e) {
    const value = e.detail.value;
    if (!value.trim())
      return;
    //this.search(value);
  },
  //将搜索框数据发送至服务器并接受服务器返回数据
  async search(query) {
    let first=this.data.first;
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(res);
    let searchList = res;
    let tempList = res;
    this.setData({
      searchList,
      tempList,
      first:0
    })
    
  },
  //点击左边排序
  left() {
    let type = this.data.type;
    let searchList = this.data.searchList;
    let tempList = this.data.tempList;
    if (type == 1)
      return;
    else {
      searchList = tempList.slice(0);
      this.setData({
        searchList,
        type: 1
      })
    }
  },
  //点击右边排序
  right() {
    let type = this.data.type;
    let searchList = this.data.searchList;
    if (type == 1 || type == 3) {
      var compare = function (obj1, obj2) {
        var val1 = Number(obj1.minPrice);
        var val2 = Number(obj2.minPrice);
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      searchList.sort(compare);
      this.setData({
        searchList,
        type: 2
      })
    } else {
      var compare = function (obj1, obj2) {
        var val1 = Number(obj1.minPrice);
        var val2 = Number(obj2.minPrice);
        if (val1 < val2) {
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      }
      searchList.sort(compare);
      this.setData({
        searchList,
        type: 3
      })
    }
  },
  //点击小购物车
  cart(e) {
    let index
    index = e.currentTarget.dataset.index;

    this.setData({
      index,
      hideSpecifiation: 0,
    })
    this.guigeselect();
  },
  //阻止底层页面滑动
  prevent() {
    return;
  },
  //选择规格页面弹出
  guigeselect() {
    let that = this;
    //规格窗口弹出
    let animal = wx.createAnimation({
      timingFunction: 'linear'
    }).translate(0, -350).step({
      duration: 300
    });
    //阴影背景逐渐变深
    let animalShadow = wx.createAnimation({}).opacity(1).step({
      duration: 300
    });

    that.setData({
      animationDataShadow: animalShadow.export(),
      animationData: animal.export()
    })
  },
  // 选择规格页面隐藏
  guigeno() {
    let that = this;
    //规格窗口隐藏
    let animal = wx.createAnimation({
      timingFunction: 'linear'
    }).translate(0, 350).step({
      duration: 300
    })
    //阴影背景逐渐变浅
    let animalShadow = wx.createAnimation({}).opacity(0).step({
      duration: 300
    });

    that.setData({
      animationDataShadow: animalShadow.export(),
      animationData: animal.export()
    })
  },
  //点击阴影部分
  closeSpecifiation() {
    this.guigeno();
    setTimeout(() => {
      this.setData({
        hideSpecifiation: 1
      })
    }, 300)
  },
  //点击右上角关闭按钮
  closePopupTap() {
    this.guigeno();
    setTimeout(() => {
      this.setData({
        hideSpecifiation: 1
      })
    }, 300)
  },
  //点击标签
  labelTap(e) {
    let index = this.data.index;
    let lableCurrentIndex = this.data.searchList[index].lableCurrentIndex;
    let buyNumber = this.data.searchList[index].buyNumber;
    let buyMaxNumber = this.data.searchList[index].buyMaxNumber;
    let stock = this.data.searchList[index].stock;
    let labIndex = e.currentTarget.dataset.index1;

    if (lableCurrentIndex == labIndex) {
      buyMaxNumber = stock;
      this.setData({
        ['searchList[' + index + '].lableCurrentIndex']: -1,
        ['searchList[' + index + '].buyMaxNumber']: buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.searchList[index].specifiation[labIndex].stock;
      if (buyNumber > buyMaxNumber)
        buyNumber = buyMaxNumber;
      this.setData({
        ['searchList[' + index + '].lableCurrentIndex']: labIndex,
        ['searchList[' + index + '].buyNumber']: buyNumber,
        ['searchList[' + index + '].buyMaxNumber']: buyMaxNumber
      })
      return;
    }
  },
  // 减少商品数量
  reduceNumber() {
    let index = this.data.index;
    let buyNumber = this.data.searchList[index].buyNumber;
    if (buyNumber == 1)
      return;
    else {
      buyNumber--;
      this.setData({
        ['searchList[' + index + '].buyNumber']: buyNumber
      })
    }
  },
  // 增加商品数量
  addNumber() {
    let index = this.data.index;
    let buyNumber = this.data.searchList[index].buyNumber;
    let buyMaxNumber = this.data.searchList[index].buyMaxNumber;
    if (buyNumber == buyMaxNumber)
      return;
    else {
      buyNumber++;
      this.setData({
        ['searchList[' + index + '].buyNumber']: buyNumber
      })
    }
  },
  //输入商品数量
  inputNumber(e) {
    let index = this.data.index;
    let buyMaxNumber = this.data.searchList[index].buyMaxNumber;
    let buyNumber = this.data.searchList[index].buyNumber;
    if (e.detail.value > buyMaxNumber) {
      buyNumber = buyMaxNumber;
      this.setData({
        ['searchList[' + index + '].buyNumber']: buyNumber
      })
    } else {
      this.setData({
        ['searchList[' + index + '].buyNumber']: e.detail.value
      })
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let index = this.data.index;
    let buyNumber = this.data.searchList[index].buyNumber;
    if (e.detail.value < 1) {
      buyNumber = 1;
      this.setData({
        ['searchList[' + index + '].buyNumber']: buyNumber
      })
    }
  },
  //初始化阴影窗口透明
  initialization() {
    let animalShadow = wx.createAnimation({}).opacity(0).step({
      duration: 0
    });

    this.setData({
      animationDataShadow: animalShadow.export(),
    })
  },
  //规格页面点击添加购物车按钮
  addCart() {
    let index = this.data.index;
    let lableCurrentIndex = this.data.searchList[index].lableCurrentIndex;
    let buyNumber = this.data.searchList[index].buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = wx.getStorageSync("cart") || [];

    let index1 = cart.findIndex(v => v.id === this.data.searchList[index].id && v.specifiationIndex === lableCurrentIndex);

    if (index1 === -1) {
      this.data.searchList[index].specifiationIndex = lableCurrentIndex;
      cart.push(this.data.searchList[index])
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.searchList[index].specifiation[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.searchList[index].specifiation[lableCurrentIndex].stock;
        wx.setStorageSync("cart", cart);
        wx.showToast({
          title: '加入购物车数量已达最大值',
          icon: 'none',
          mask: true
        });
        return;
      }
    }
    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true,
    });
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});