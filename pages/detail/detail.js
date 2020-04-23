//Page Object 
// import{request} from "../../request/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({
  data: {
    detail: {
    },
    hideSpecifiation: 1,
    hideSelect: 1,
    lableCurrentIndex: -1,
    discountCurrentIndex: 0,
    deliveryCurrentIndex: 0,
    buyNumber: 1,
    buyMaxNumber: 0,
    buyType: 0,
    selectType: 0,
    animationData: {}, //动画
    animationDataShadow: {}, //背景阴影渐变动画
    animationFloatData: {},
    lastY: 0,
    direction: 1,
    discount: 0,
    url: []
  },
  // 服务器获取数据
  getGoodsDetail(_id) {
    let that = this
    wx.request({
      url: common.apiHost+"wx/detail", data: { _id }, method: 'GET', success(res) {
        let discount = res.data.data.discount
        let url = res.data.data.detail
        let goods = res.data.data.goods
        let maxPrice = goods.specification[0].price
        let minPrice = goods.specification[0].price
        let maxFreight = goods.specification[0].freight
        let minFreight = goods.specification[0].freight
        let stock = goods.specification[0].stock
        for (let i = 1; i < goods.specification.length; i++) {
          if (Number(maxPrice) < Number(goods.specification[i].price))
            maxPrice = goods.specification[i].price
          if (Number(minPrice) > Number(goods.specification[i].price))
            minPrice = goods.specification[i].price
          if (Number(maxFreight) < Number(goods.specification[i].freight))
            maxFreight = goods.specification[i].freight
          if (Number(minFreight) > Number(goods.specification[i].freight))
            minFreight = goods.specification[i].freight
          stock += goods.specification[i].stock
        }
        goods.maxPrice = maxPrice
        goods.minPrice = minPrice
        goods.maxFreight = maxFreight
        goods.minFreight = minFreight
        goods.stock = stock

        let detail = {
          goods,
          discount: [`广东省内满${discount}包邮`],
          delivery: ["快递", "送货上门 (仅限博贺镇内)"]
        }
        that.setData({
          detail,
          buyMaxNumber: stock,
          discount,
          url
        })
      }, fail() { }
    })
  },
  //点击轮播图，放大预览图片
  handlePrevewImage(e) {
    const urls = this.data.detail.goods.swiperUrl;
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      current,
      urls
    });
  },
  //点击添加购物车按钮
  add() {
    this.setData({
      buyType: 1,
      hideSpecifiation: 0,
    })
    this.guigeselect();
  },
  //点击立即购买按钮
  buy() {
    this.setData({
      buyType: 2,
      hideSpecifiation: 0
    })
    this.guigeselect();
  },
  //点击选择规格
  selectSpecifiation() {
    this.setData({
      buyType: 3,
      hideSpecifiation: 0
    })
    this.guigeselect();
  },
  //点击促销
  selectDiscount() {
    this.setData({
      selectType: 0,
      hideSelect: 0
    })
    this.guigeselect();
  },
  //点击配送
  selectDelivery() {
    this.setData({
      selectType: 1,
      hideSelect: 0
    })
    this.guigeselect();
  },
  //选择配送方式
  deliveryTap(e) {
    let deliveryCurrentIndex = e.currentTarget.dataset.index;
    this.guigeno();
    this.setData({
      deliveryCurrentIndex
    })
    setTimeout(() => {
      this.setData({
        hideSelect: 1
      })
    }, 300);
  },
  //选择促销方式
  discountTap(e) {
    let discountCurrentIndex = e.currentTarget.dataset.index;
    this.guigeno();
    this.setData({
      discountCurrentIndex,
    })
    setTimeout(() => {
      this.setData({
        hideSelect: 1
      })
    }, 300);
  },
  //选择促销及配送方式页面点击阴影部分
  closeSelect() {
    this.guigeno();
    setTimeout(() => {
      this.setData({
        hideSelect: 1
      })
    }, 300)
  },

  //阻止页面滑动
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
    let lableCurrentIndex = this.data.lableCurrentIndex;
    let buyNumber = this.data.buyNumber;
    let buyMaxNumber = this.data.buyMaxNumber;
    let stock = this.data.detail.goods.stock;
    let index = e.currentTarget.dataset.index;

    if (this.data.detail.goods.specification[index].stock === 0)
      return

    if (lableCurrentIndex == index) {
      buyMaxNumber = stock;
      this.setData({
        lableCurrentIndex: -1,
        buyMaxNumber
      })
      return;
    } else {
      buyMaxNumber = this.data.detail.goods.specification[index].stock;
      if (buyNumber > buyMaxNumber)
        buyNumber = buyMaxNumber;
      this.setData({
        lableCurrentIndex: index,
        buyNumber,
        buyMaxNumber
      })
      return;
    }
  },
  // 减少商品数量
  reduceNumber() {
    let buyNumber = this.data.buyNumber;
    if (buyNumber == 1)
      return;
    else {
      buyNumber--;
      this.setData({
        buyNumber
      })
    }
  },
  // 增加商品数量
  addNumber() {
    let buyNumber = this.data.buyNumber;
    let buyMaxNumber = this.data.buyMaxNumber;
    if (buyNumber == buyMaxNumber)
      return;
    else {
      buyNumber++;
      this.setData({
        buyNumber
      })
    }
  },
  //输入商品数量
  inputNumber(e) {
    let buyMaxNumber = this.data.buyMaxNumber;
    let buyNumber = this.data.buyNumber
    if (e.detail.value > buyMaxNumber) {
      buyNumber = buyMaxNumber;
      this.setData({
        buyNumber
      })
    } else {
      this.setData({
        buyNumber: e.detail.value
      })
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let buyNumber = this.data.buyNumber;
    if (e.detail.value < 1) {
      buyNumber = 1;
      this.setData({
        buyNumber
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
  //分享商品
  onShareAppMessage: function () {
    let goods = this.detail
    return {
      title: goods.name,
      desc: goods.desc,
      path: `/page/detail?_id=${goods._id}` // 路径，传递参数到指定页面。
    }
  },
  //规格页面点击添加购物车按钮
  addCart() {
    let lableCurrentIndex = this.data.lableCurrentIndex;
    let buyNumber = this.data.buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }

    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v._id === this.data.detail.goods._id && v.specificationIndex === lableCurrentIndex);

    if (index === -1) {
      this.data.detail.goods.checked = 1;
      this.data.detail.goods.buyNumber = buyNumber;
      this.data.detail.goods.specificationIndex = lableCurrentIndex;
      this.data.detail.goods.buyMaxNumber = this.data.buyMaxNumber;
      cart.push(this.data.detail.goods);
    } else {
      cart[index].buyNumber += buyNumber;
      if (cart[index].buyNumber > this.data.detail.goods.specification[lableCurrentIndex].stock) {
        cart[index].buyNumber = this.data.detail.goods.specification[lableCurrentIndex].stock;
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
  // 隐藏浮动图标
  hideFloat() {
    let that = this;
    //规格窗口弹出
    let animal = wx.createAnimation({
      timingFunction: 'linear'
    }).translate(150, 0).step({
      duration: 300
    });
    that.setData({
      animationFloatData: animal.export()
    })
  },
  showFloat() {
    let that = this;
    //规格窗口弹出
    let animal = wx.createAnimation({
      timingFunction: 'linear'
    }).translate(0, 0).step({
      duration: 300
    });
    that.setData({
      animationFloatData: animal.export()
    })
  },
  handletouchstart: function (event) {
    this.data.lastY = event.touches[0].pageY
  },
  handletouchend: function (event) {
    const ty = this.data.lastY - event.changedTouches[0].pageY
    const direction = this.data.direction
    //向上滑 方向向上
    if (ty < 0 && direction)
      return
    //向下滑 方向向下
    else if (ty > 0 && !direction)
      return
    //向上滑 方向向下
    else if (ty < 0 && !direction) {
      this.data.direction = !direction
      this.showFloat()
    }
    else if (ty > 0 && direction) {
      this.data.direction = !direction
      this.hideFloat()
    }
  },
  tobuy() {
    let lableCurrentIndex = this.data.lableCurrentIndex;
    let buyNumber = this.data.buyNumber;

    if (lableCurrentIndex === -1) {
      wx.showToast({
        title: '请先选择商品规格',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if (!wx.getStorageSync('LocalToken')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    else{
      let cart = []
      cart.push(this.data.detail.goods)
      cart[0].specificationIndex = lableCurrentIndex
      cart[0].buyNumber = buyNumber
      let data = JSON.stringify({ cart: cart, isCart: false })
      wx.navigateTo({
        url: `/pages/payOrder/payOrder?cart=${data}`,
       })
    }
  },
  onLoad: function (_id) {
    this.getGoodsDetail(_id)
  },
  onReady: function () {
    this.initialization()
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