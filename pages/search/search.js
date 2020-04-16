import {
  request 
} from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

//Page Object
Page({
  data: {
    searchList: [],
    tempList: [],
    value: '',
    type: 1,
    hideSpecifiation: 1,
    animationDataShadow: {},
    animationData: {},
    index: 0,
    first:1,
    isSearch:0,
    searchWord:[],
    searchKey:[]
  },
  getSearchKey(){
    var that = this;
    wx.request({
      url: common.apiHost+'wx/searchKey',
      method: 'GET',
      success(res) {
        that.setData({
          searchKey:res.data.data
        })
      },
      fail() {}
    })
  },
  //options(Object)
  inputValue(e) {
    let value = e.detail.value;
    this.setData({
      value
    })
  },
  searchKey(e)
  {
    let value = e.currentTarget.dataset.name
    this.search(value)
    this.setData({
      isSearch:1,
      value
    })

    let searchWord = this.data.searchWord || []

    if(!searchWord.includes(value))
    {
      searchWord.push(value)
     this.setData({
       searchWord
      })
     wx.setStorageSync('searchWord', searchWord)
    }
  },
  //重置输入框内容
  clear() {
    this.setData({
      value: '',
      isSearch:0
    })
  },
  //点击垃圾桶
  trash()
  {
    this.setData({
      searchWord:[]
    })
    wx.setStorageSync('searchWord', [])
  },
  //点击输入法搜索
  complete(e) {
    const value = e.detail.value.trim();
    if (!value)
      return;
    this.search(value);
    this.setData({
      isSearch:1
    })

    
    let searchWord = this.data.searchWord || []

    if(!searchWord.includes(value))
    {
      searchWord.push(value)
     this.setData({
       searchWord
      })
     wx.setStorageSync('searchWord', searchWord)
    }
  },
  //将搜索框数据发送至服务器并接受服务器返回数据
  search(query) {
    var that = this;
    let first=this.data.first;
    wx.request({
      url: common.apiHost+'wx/search',
      method: 'GET',
      data: {
        query
      },
      success(res) {
        let temp = res.data.data

        for (let i = 0; i < temp.length; i++) {
        
        let maxPrice = temp[i].specification[0].price
        let minPrice = temp[i].specification[0].price
        let maxFreight = temp[i].specification[0].freight
        let minFreight = temp[i].specification[0].freight
        let stock = temp[i].specification[0].stock

          for (let j = 1; j < temp[i].specification.length; j++) {
            if(Number(maxPrice)<Number(temp[i].specification[j].price))
                maxPrice=temp[i].specification[j].price
              if(Number(minPrice)>Number(temp[i].specification[j].price))
                minPrice=temp[i].specification[j].price
              if(Number(maxFreight)<Number(temp[i].specification[j].freight))
                maxFreight=temp[i].specification[j].freight
              if(Number(minFreight)>Number(temp[i].specification[j].freight))
                minFreight=temp[i].specification[j].freight
              stock+=temp[i].specification[j].stock
          }
          
            temp[i].maxPrice=maxPrice
            temp[i].minPrice=minPrice
            temp[i].maxFreight=maxFreight
            temp[i].minFreight=minFreight
            temp[i].stock=stock
            temp[i].buyMaxNumber = stock
            temp[i].lableCurrentIndex=-1
            temp[i].buyNumber=1
            temp[i].specificationIndex=-1
            temp[i].checked =1
        }

        let searchList = temp;
        let tempList = temp.slice(0);
        that.setData({
          searchList,
          tempList,
          first:0
        })
      },
      fail() {}
    });
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

    if(this.data.searchList[index].specification[labIndex].stock===0)
        return
      
    if (lableCurrentIndex == labIndex) {
      buyMaxNumber = stock;
      this.setData({
        ['searchList[' + index + '].lableCurrentIndex']: -1,
        ['searchList[' + index + '].buyMaxNumber']: buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.searchList[index].specification[labIndex].stock;
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

    let index1 = cart.findIndex(v => v._id === this.data.searchList[index]._id && v.specificationIndex === lableCurrentIndex);

    if (index1 === -1) {
      this.data.searchList[index].specificationIndex = lableCurrentIndex;
      cart.push(this.data.searchList[index])
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.searchList[index].specification[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.searchList[index].specification[lableCurrentIndex].stock;
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
  pay_goods(){
    let index = this.data.index;
    let lableCurrentIndex = this.data.searchList[index].lableCurrentIndex;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = []
    cart.push(this.data.searchList[index])
    cart[0].specificationIndex=lableCurrentIndex
    let data = JSON.stringify({cart:cart,isCart:false})
  
    wx.navigateTo({
      url: `/pages/payOrder/payOrder?cart=${data}`,
    })
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    let searchWord = wx.getStorageSync('searchWord')
    this.setData({
      searchWord
    })
    this.getSearchKey()
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