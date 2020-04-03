//Page Object
import {
  request
} from "../../request/request.js";

Page({
  data: {
    // 轮播图数据
    swiperList: [{
        src: "../../images/homePage/swiper.jpg"
      },
      {
        src: "../../images/homePage/swiper.jpg"
      },
      {
        src: "../../images/homePage/swiper.jpg"
      }
    ],
    // 公告数据
    noticeList: [
      "公告示例1",
      "公告示例2",
      "公告示例3"
    ],
    //分类导航数据
    cateList: [{
        title: "分 类 1",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 2",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 3",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 4",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 5",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 6",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 7",
        src: "../../images/homePage/navigator.png"
      },
      {
        title: "分 类 8",
        src: "../../images/homePage/navigator.png"
      }
    ],
    //楼层数据
    floorList: [{
        titleSrc: "../../images/homePage/floorTitle.jpg",
        productList: [{
            id: 1,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 2,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 3,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 4,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
        ]
      },
      {
        titleSrc: "../../images/homePage/floorTitle.jpg",
        productList: [{
            id: 5,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 6,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 7,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 8,
            name: "商品名称",
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
            buyMaxNumber:25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      }
    ],
    index1:0,
    index2:0,
    hideSpecifiation:1,
    animationDataShadow:{},
    animationData:{},
  },
  //options(Object)
  onLoad: function (options) {
    // this.getSwiperList();
    // this.getCateList();
    // this.getFloorList();
  },

  //获取轮播图数据
  // getSwiperList(){
  //   request({ url:"/home/swiperdata" })
  //   .then(result=>{
  //     this.setData({
  //       swiperList:result.data.message
  //     })
  //   })
  // },
  //获取分类导航数据
  // getCateList(){
  //   request({ url:"/home/catitems" })
  //   .then(result=>{
  //     this.setData({
  //       cateList:result.data.message
  //     })
  //   })
  // },
  //获取楼层数据
  // getFloorList(){
  //   request({ url:"/home/floordata" })
  //   .then(result=>{
  //     this.setData({
  //       floorList:result.data.message
  //     })
  //   })
  // },
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
      hideSpecifiation: 0,
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
    let index1=this.data.index1;
    let index2=this.data.index2;
    let lableCurrentIndex = this.data.floorList[index1].productList[index2].lableCurrentIndex;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;
    let buyMaxNumber = this.data.floorList[index1].productList[index2].buyMaxNumber;
    let stock = this.data.floorList[index1].productList[index2].stock;
    let index = e.currentTarget.dataset.index;

    if (lableCurrentIndex == index) {
      buyMaxNumber = stock;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].lableCurrentIndex']: -1,
        ['floorList['+index1+'].productList['+index2+'].buyMaxNumber']:buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.floorList[index1].productList[index2].specifiation[index].stock;
      if (buyNumber > buyMaxNumber)
        buyNumber = buyMaxNumber;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].lableCurrentIndex']: index,
        ['floorList['+index1+'].productList['+index2+'].buyNumber']:buyNumber,
        ['floorList['+index1+'].productList['+index2+'].buyMaxNumber']:buyMaxNumber
      })
      return;
    }
  },
  // 减少商品数量
  reduceNumber() {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;
    if (buyNumber == 1)
      return;
    else {
      buyNumber--;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].buyNumber']:buyNumber
      })
    }
  },
  // 增加商品数量
  addNumber() {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;
    let buyMaxNumber = this.data.floorList[index1].productList[index2].buyMaxNumber;
    if (buyNumber == buyMaxNumber)
      return;
    else {
      buyNumber++;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].buyNumber']:buyNumber
      })
    }
  },
  //输入商品数量
  inputNumber(e) {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyMaxNumber = this.data.floorList[index1].productList[index2].buyMaxNumber;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;
    if (e.detail.value > buyMaxNumber) {
      buyNumber = buyMaxNumber;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].buyNumber']:buyNumber
      })
    } else {
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].buyNumber']: e.detail.value
      })
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let index1=this.data.index1;
    let index2=this.data.index2;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;
    if (e.detail.value < 1) {
      buyNumber = 1;
      this.setData({
        ['floorList['+index1+'].productList['+index2+'].buyNumber']:buyNumber
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
    let lableCurrentIndex = this.data.floorList[index1].productList[index2].lableCurrentIndex;
    let buyNumber = this.data.floorList[index1].productList[index2].buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.id === this.data.floorList[index1].productList[index2].id && v.specifiationIndex === lableCurrentIndex);

    if (index === -1) {
      this.data.floorList[index1].productList[index2].specifiationIndex = lableCurrentIndex;
      cart.push(this.data.floorList[index1].productList[index2])
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.floorList[index1].productList[index2].specifiation[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.floorList[index1].productList[index2].specifiation[lableCurrentIndex].stock;
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
    let hideSpecifiation = this.data.hideSpecifiation;
    if(hideSpecifiation==0)
      this.closeSpecifiation()
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