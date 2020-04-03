//Page Object
import {request} from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  data: {
    cateList: [{
        cateName: "推荐",
        productList: [{
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
            buyMaxNumber: 25,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名1",
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
          buyMaxNumber: 25,
          lableCurrentIndex: -1,
          buyNumber: 1,
          specifiationIndex: -1,
          checked : 1
        }]
      },
      {
        cateName: "分类名2",
        productList: [{
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
            buyMaxNumber: 25,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名3",
        productList: [{
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
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
            buyMaxNumber: 25,
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
            buyMaxNumber: 25,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名4",
        productList: [{
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 9,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 10,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名5",
        productList: [{
            id: 11,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 12,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名6",
        productList: [{
            id: 13,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 14,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名7",
        productList: [{
            id: 15,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          },
          {
            id: 16,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
      {
        cateName: "分类名8",
        productList: [{
            id: 17,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
          },
          {
            id: 18,
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
            buyMaxNumber: 25,
            lableCurrentIndex: -1,
            buyNumber: 1,
            specifiationIndex: -1,
            checked : 1
          }
        ]
      },
    ],
    currentIndex: 0,
    toView: 'index0',
    distance: [],
    //判断是否为点击左侧菜单分类
    isLeft: 0,
    ifCalc: 0,
    isFirst:1,
    index1: 0,
    index2: 0,
    hideSpecifiation: 1,
    animationDataShadow: {},
    animationData: {},
  },
  // getCates() {
  //   request({
  //       url: "/categories"
  //     })
  //     .then(res => {
  //       this.setData({
  //         cateList:res
  //       })
  //     })
  // },

  // 点击左边菜单栏
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let toview = 'index' + index;
    this.setData({
      currentIndex: index,
      isLeft: 1,
      toView: toview
    })
  },
  // 滚动
  async scroll(e) {
    let ifCalc = this.data.ifCalc;
    if (!ifCalc)
      await this.calc();
    let is = this.data.isLeft;
    if (is) {
      is = 0;
      this.setData({
        isLeft: is
      })
      return;
    }
    let cIndex = this.data.currentIndex;
    let i
    for (i = 0; i < this.data.distance.length; i++)
      if (e.detail.scrollTop < this.data.distance[i])
        break;
    if (i != cIndex)
      this.setData({
        currentIndex: i
      })
  },
  //获取视图高度
  getHeight() {
    var length = this.data.cateList.length;
    var distance = this.data.distance;
    var groupId;

    for (let i = 0; i < length - 1; i++) {
      groupId = "#group" + i;
      let query = wx.createSelectorQuery();
      query.select(groupId).boundingClientRect((rect) => {
        distance.push(rect.height);
      }).exec(
        this.setData({
          distance
        })
      );
    }
  },
  // 计算判断高度
  async calc() {
    var p = this.data.distance;
    if (p.length)
      p[0] -= 1;
    for (var i = 1; i < p.length; i++)
      p[i] = p[i - 1] + p[i];

    this.setData({
      distance: p,
      ifCalc: 1
    })
  },
  //判断是否为主页导航跳转
  isHomepage() {
    let categoriesIndex = wx.getStorageSync("categoriesIndex")
    if (categoriesIndex || categoriesIndex === 0) {
      if (categoriesIndex === -1)
        return;
      categoriesIndex+=1;
      let toView = 'index' + categoriesIndex;
      categoriesIndex = -1;
      wx.setStorageSync("categoriesIndex", categoriesIndex)
      this.setData({
        toView
      })
    }
  },
  cart(e) {
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    index1 = e.currentTarget.dataset.index1;
    index2 = e.currentTarget.dataset.index2

    this.setData({
      index1,
      index2,
      hideSpecifiation: 0,
    })
    this.guigeselect();
  },
  //阻止底层页面滑动
  prevent(){
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
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let lableCurrentIndex = this.data.cateList[index1].productList[index2].lableCurrentIndex;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;
    let buyMaxNumber = this.data.cateList[index1].productList[index2].buyMaxNumber;
    let stock = this.data.cateList[index1].productList[index2].stock;
    let index = e.currentTarget.dataset.index;

    if (lableCurrentIndex == index) {
      buyMaxNumber = stock;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].lableCurrentIndex']: -1,
        ['cateList[' + index1 + '].productList[' + index2 + '].buyMaxNumber']: buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.cateList[index1].productList[index2].specifiation[index].stock;
      if (buyNumber > buyMaxNumber)
        buyNumber = buyMaxNumber;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].lableCurrentIndex']: index,
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: buyNumber,
        ['cateList[' + index1 + '].productList[' + index2 + '].buyMaxNumber']: buyMaxNumber
      })
      return;
    }
  },
  // 减少商品数量
  reduceNumber() {
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;
    if (buyNumber == 1)
      return;
    else {
      buyNumber--;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: buyNumber
      })
    }
  },
  // 增加商品数量
  addNumber() {
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;
    let buyMaxNumber = this.data.cateList[index1].productList[index2].buyMaxNumber;
    if (buyNumber == buyMaxNumber)
      return;
    else {
      buyNumber++;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: buyNumber
      })
    }
  },
  //输入商品数量
  inputNumber(e) {
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let buyMaxNumber = this.data.cateList[index1].productList[index2].buyMaxNumber;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;
    if (e.detail.value > buyMaxNumber) {
      buyNumber = buyMaxNumber;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: buyNumber
      })
    } else {
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: e.detail.value
      })
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;
    if (e.detail.value < 1) {
      buyNumber = 1;
      this.setData({
        ['cateList[' + index1 + '].productList[' + index2 + '].buyNumber']: buyNumber
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
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let lableCurrentIndex = this.data.cateList[index1].productList[index2].lableCurrentIndex;
    let buyNumber = this.data.cateList[index1].productList[index2].buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.id === this.data.cateList[index1].productList[index2].id && v.specifiationIndex === lableCurrentIndex);

    if (index === -1) {
      this.data.cateList[index1].productList[index2].specifiationIndex = lableCurrentIndex;
      cart.push(this.data.cateList[index1].productList[index2])
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.cateList[index1].productList[index2].specifiation[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.cateList[index1].productList[index2].specifiation[lableCurrentIndex].stock;
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
    // this.getCates()


    //本地缓存
    // const cate = wx.getStorageSync("cateList");
    // if (!cate) {
    //   this.getCates();
    // } else {
    //   if (Date.now() - cate.time > 1000 * 10) {
    //     this.getCates();
    //   } else {
    //     this.setData({
    //       cateList: cate
    //     })
    //   }
    // }
  },
  onReady: function () {
    setTimeout(() => {
      this.getHeight();
    }, 0);
    setTimeout(() => {
      this.isHomepage();
      this.setData({
        isFirst:0
      })
    }, 0);
  },
  onShow: function () {
    let isFirst=this.data.isFirst
    if(!isFirst)
      this.isHomepage();
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