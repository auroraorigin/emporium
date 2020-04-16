//导入接口api公共域名
var common = require("../../utils/util/conmonApi.js");

Page({
  data: {
    cart: [],
    isEdit: 0,
    isAll: 0,
    sum: 0,
    select: 0,
    count: 0,
    hideSpecifiation: 1,
    currentIndex: 0,
    animationDataShadow: {},
    animationData: {}
  },
  //获取缓存中的购物车信息
  getProduct() {
    let that = this
    const cart = wx.getStorageSync("cart") || [];
    wx.request({
      url: common.apiHost+'wx/cart',
      method: 'GET',
      data:{cart},
      success(res) {
        that.setData({
          cart:res.data.data
        },function(){
          that.setCart(cart)
          wx.setStorageSync('cart', res.data.data)
        })
      },
      fail() {}
    })
  },
  toDecimal(x) {   
    var f = parseFloat(x);   
    if (isNaN(f)) {   
      return;   
    }   
    f = Math.round(x*100)/100;   
  return f;   
  },
  //更新购物车信息
  setCart(cart) {
    let sum = 0;
    let select = 0;
    let count = 0;
    let isAll = true;

    cart.forEach(v => {
      if (v.checked) {
        sum += v.specification[v.specificationIndex].price * v.buyNumber;
        select += v.buyNumber;
        count++;
      } else
        isAll = false;
    })

    isAll = cart.length ? isAll : false;
    
    this.setData({
      cart,
      isAll,
      sum:this.toDecimal(sum),
      select,
      count
    })
    wx.setStorageSync("cart", cart);
  },
  //选择商品
  select(e) {
    const index = e.currentTarget.dataset.index
    let cart = this.data.cart;
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  //全选
  selectAll(e) {
    let isAll = this.data.isAll;
    let cart = this.data.cart;
    isAll = !isAll;
    cart.forEach(v => v.checked = isAll);
    this.setCart(cart);
  },
  // 减少商品数量
  reduceNumber(e) {
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    if (cart[index].buyNumber == 1) {
      wx.showModal({
        title: '提示',
        content: '您确定要删除该商品吗？',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          } else
            return;
        }
      });
    } else {
      cart[index].buyNumber -= 1;
      this.setCart(cart);
    }
  },
  //增加商品数量
  addNumber(e) {
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    if (cart[index].buyNumber == cart[index].buyMaxNumber)
      return;
    cart[index].buyNumber += 1;
    this.setCart(cart);
  },
  //输入商品数量
  inputNumber(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    let cart = this.data.cart;

    if (value == '' || value == 0) {
      return;
    } else if (value > cart[index].buyMaxNumber) {
      cart[index].buyNumber = cart[index].buyMaxNumber;
      this.setCart(cart);
    } else {
      cart[index].buyNumber = Number(value);
      this.setCart(cart);
    }
  },
  //退出输入商品数量
  inputNumberOut(e) {
    let cart = this.data.cart;
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;

    if (value == '' || value == 0) {
      cart[index].buyNumber = 1;
      this.setCart(cart);
    }
  },
  //删除商品
  delProduct(e) {
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    wx.showModal({
      title: '提示',
      content: '您确定要删除该商品吗？',
      success: (result) => {
        if (result.confirm) {
          cart.splice(index, 1);
          this.setCart(cart);
        } else
          return;
      }
    })
  },
  //进入编辑状态
  edit() {
    let cart = this.data.cart;
    cart.forEach(v => v.originChecked = v.checked);
    cart.forEach(v => v.checked = false);
    this.setData({
      isEdit: 1,
    })
    this.setCart(cart);
  },
  //完成编辑状态
  editComplete() {
    let cart = this.data.cart;
    cart.forEach(v => {
      v.checked = v.originChecked
    });
    this.setData({
      isEdit: 0
    })
    this.setCart(cart);
  },
  //编辑状态中删除商品
  delete() {
    const count = this.data.count;
    if (!count)
      return;
    let cart = this.data.cart;

    wx.showModal({
      title: '提示',
      content: '您确定要删除选中的商品吗？',
      success: (result) => {
        if (result.confirm) {
          //splice会破坏数组序列，使用逆向循环
          for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].checked == true)
              cart.splice(i, 1);
          }
          this.setCart(cart);
        } else
          return;
      }
    });
  },
  //获取需要修改商品规格的下标
  getIndex(e) {
    let currentIndex = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    cart[currentIndex].tempIndex = cart[currentIndex].specificationIndex;
    this.setData({
      currentIndex,
      hideSpecifiation: 0
    })
    this.setCart(cart);
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
    const currentIndex = this.data.currentIndex;
    let cart = this.data.cart;
    let index = e.currentTarget.dataset.index;

    if(cart[currentIndex].specification[index].stock===0)
        return
    
    if (cart[currentIndex].tempIndex != index) {
      cart[currentIndex].tempIndex = index;
      this.setCart(cart)
    }
  },
  //点击完成
  compelete() {
    this.closeSpecifiation();
    let cart = this.data.cart;
    const currentIndex = this.data.currentIndex;
    if (cart[currentIndex].tempIndex != cart[currentIndex].specificationIndex) {
      cart[currentIndex].specificationIndex = cart[currentIndex].tempIndex;
      cart[currentIndex].buyMaxNumber = cart[currentIndex].specification[cart[currentIndex].specificationIndex].stock;
      //更新购买数量
      if (cart[currentIndex].buyNumber > cart[currentIndex].buyMaxNumber)
        cart[currentIndex].buyNumber = cart[currentIndex].buyMaxNumber
      //合并相同商品
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id == cart[currentIndex]._id && cart[i].specificationIndex == cart[currentIndex].specificationIndex && currentIndex != i) {
          //合并至最前面商品中
          let less = i > currentIndex ? currentIndex : i;
          let more = i > currentIndex ? i : currentIndex;
          cart[less].buyNumber += cart[more].buyNumber;
          cart.splice(more, 1);
          if (cart[less].buyNumber > cart[less].buyMaxNumber)
            cart[less].buyNumber = cart[less].buyMaxNumber
          break;
        }
      }
      this.setCart(cart);
    }
  },
  pay_shoppingCart(){
    let temp = wx.getStorageSync("cart") || [];
    let cart=[]
    for (let i = 0; i < temp.length; i++) {
      if(temp[i].checked)
        cart.push(temp[i])
    }
    if(!cart.length)
      {
        wx.showToast({
          title: '请先选择商品',
          icon: 'none',
          mask: true,
        });
        return 
      }
    let data = JSON.stringify({cart:cart,isCart:true})
    wx.navigateTo({
      url: `/pages/payOrder/payOrder?cart=${data}`,
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.getProduct();
  },
  onHide: function () {
    const isEdit = this.data.isEdit;

    if (isEdit)
      this.editComplete();
    this.setData({hideSpecifiation:1})
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