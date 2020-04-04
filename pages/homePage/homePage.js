//Page Object
import {
  request
} from "../../request/request.js";

Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 公告数据
    noticeList: [],
    //分类导航数据
    cateList: [],
    //楼层数据
    floorList: [],
    index1:0,
    index2:0,
    hideSpecification:1,
    animationDataShadow:{},
    animationData:{},
  },
  //options(Object)
  onLoad: function (options) {
    this.getHomePage();
  },

  //获取首页数据
  getHomePage(){
    var that = this;
    wx.request({
      url: 'http://localhost:8888/wx/homePage',
      method: 'GET',
      success(res) {
        let temp = res.data.data.floorList
        // console.log(temp)
        // 添加商品属性方便管理
        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < temp[i].goods.length; j++) {
            let maxPrice = temp[i].goods[j].specification[0].price
            let minPrice = temp[i].goods[j].specification[0].price
            let maxFreight = temp[i].goods[j].specification[0].freight
            let minFreight = temp[i].goods[j].specification[0].freight
            let stock = temp[i].goods[j].specification[0].stock
            

            for (let k = 1; k < temp[i].goods[j].specification.length; k++) {
              if(Number(maxPrice)<Number(temp[i].goods[j].specification[k].price))
                maxPrice=temp[i].goods[j].specification[k].price
              if(Number(minPrice)>Number(temp[i].goods[j].specification[k].price))
                minPrice=temp[i].goods[j].specification[k].price
              if(Number(maxFreight)<Number(temp[i].goods[j].specification[k].freight))
                maxFreight=temp[i].goods[j].specification[k].freight
              if(Number(minFreight)>Number(temp[i].goods[j].specification[k].freight))
                minFreight=temp[i].goods[j].specification[k].freight
              stock+=temp[i].goods[j].specification[k].stock
            }
            
            temp[i].goods[j].maxPrice=maxPrice
            temp[i].goods[j].minPrice=minPrice
            temp[i].goods[j].maxFreight=maxFreight
            temp[i].goods[j].minFreight=minFreight
            temp[i].goods[j].stock=stock
            temp[i].goods[j].buyMaxNumber = stock
            temp[i].goods[j].lableCurrentIndex=-1
            temp[i].goods[j].buyNumber=1
            temp[i].goods[j].specificationIndex=-1
            temp[i].goods[j].checked =1
          }

        }
        that.setData({
          swiperList:res.data.data.swiperList,
          noticeList:res.data.data.noticeList,
          cateList:res.data.data.cateList,
          floorList:res.data.data.floorList
        })
      },
      fail() {}
    })
  },
  // 保存分类ID
  categoriesIndex(e){
    let categoriesIndex=e.currentTarget.dataset.index;
    wx.setStorageSync("categoriesIndex", categoriesIndex)
  },
  //阻止底层页面滑动
  prevent(){
    return;
  },
  // 点击小购物车
  cart(e){
    let index1=this.data.index1;
    let index2=this.data.index2;
    index1 = e.currentTarget.dataset.index1;
    index2 = e.currentTarget.dataset.index2
    
    this.setData({
      index1,
      index2,
      hideSpecification: 0,
    })
    this.guigeselect();
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
  closeSpecification() {
    this.guigeno();
    setTimeout(() => {
      this.setData({
        hideSpecification: 1
      })
    }, 300)
  },
  //点击右上角关闭按钮
  closePopupTap() {
    this.guigeno();
    setTimeout(() => {
      this.setData({
        hideSpecification: 1
      })
    }, 300)
  },
  //点击标签
  labelTap(e) {
    
    let index1=this.data.index1;
    let index2=this.data.index2;  
    let lableCurrentIndex = this.data.floorList[index1].goods[index2].lableCurrentIndex;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;
    let buyMaxNumber = this.data.floorList[index1].goods[index2].buyMaxNumber;
    let stock = this.data.floorList[index1].goods[index2].stock; 
    let index = e.currentTarget.dataset.index;
    
    

    if (lableCurrentIndex == index) {
      buyMaxNumber = stock;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].lableCurrentIndex']: -1,
        ['floorList['+index1+'].goods['+index2+'].buyMaxNumber']:buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.floorList[index1].goods[index2].specification[index].stock;
      if (buyNumber > buyMaxNumber)
        buyNumber = buyMaxNumber;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].lableCurrentIndex']: index,
        ['floorList['+index1+'].goods['+index2+'].buyNumber']:buyNumber,
        ['floorList['+index1+'].goods['+index2+'].buyMaxNumber']:buyMaxNumber
      })
      return;
    }
  },
  // 减少商品数量
  reduceNumber() {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;
    if (buyNumber == 1)
      return;
    else {
      buyNumber--;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].buyNumber']:buyNumber
      })
    }
  },
  // 增加商品数量
  addNumber() {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;
    let buyMaxNumber = this.data.floorList[index1].goods[index2].buyMaxNumber;
    if (buyNumber == buyMaxNumber)
      return;
    else {
      buyNumber++;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].buyNumber']:buyNumber
      })
    }
  },
  //输入商品数量
  inputNumber(e) {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyMaxNumber = this.data.floorList[index1].goods[index2].buyMaxNumber;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;
    if (e.detail.value > buyMaxNumber) {
      buyNumber = buyMaxNumber;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].buyNumber']:buyNumber
      })
    } else {
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].buyNumber']: e.detail.value
      })
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;
    if (e.detail.value < 1) {
      buyNumber = 1;
      this.setData({
        ['floorList['+index1+'].goods['+index2+'].buyNumber']:buyNumber
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
    let index1=this.data.index1;
    let index2=this.data.index2;
    let lableCurrentIndex = this.data.floorList[index1].goods[index2].lableCurrentIndex;
    let buyNumber = this.data.floorList[index1].goods[index2].buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.id === this.data.floorList[index1].goods[index2].id && v.specificationIndex === lableCurrentIndex);

    if (index === -1) {
      this.data.floorList[index1].goods[index2].specificationIndex = lableCurrentIndex;
      cart.push(this.data.floorList[index1].goods[index2])
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.floorList[index1].goods[index2].specification[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.floorList[index1].goods[index2].specification[lableCurrentIndex].stock;
        wx.setStorageSync("cart", cart);
        wx.showToast({
          title: '加入购物车数量已达最大值',
          icon: 'none',
          mask: true
        });
        return ;
      }
    }
    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true,
    });
  },
  onReady: function () {
    this.initialization()
  },
  onShow: function () {

  },
  onHide: function () {
    let hideSpecification = this.data.hideSpecification;
    if(hideSpecification==0)
      this.closeSpecification()
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