 import {
   request
 } from "../../request/index.js";
 import regeneratorRuntime from '../../lib/runtime/runtime.js';
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     presentType: 0,
     //页面切换
     tabs: [{
         id: 0,
         value: "全部",
         isActive: true
       },
       {
         id: 1,
         value: "待付款",
         isActive: false
       },
       {
         id: 2,
         value: "待发货",
         isActive: false
       },
       {
         id: 3,
         value: "待收货",
         isActive: false
       },
       {
         id: 4,
         value: "退款",
         isActive: false
       }
     ],
     all_Order: [],//全部订单
     wait_Paid: [],//待付款订单
     wait_Sent: [],//待发货订单
     wait_Received: [],//待收货订单
     haved_Return: [],//退款
   },

   //根据标题索引来激活选中 标题数组 
   changeTitleByIndex(index) {
     //2 修改源数组
     let {
       tabs
     } = this.data;
     tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
     //3 赋值到data中
     this.setData({
       tabs
     })
   },

   handleTabsItemChange(e) {
     //1 获取被点击标题的索引
     const {
       index
     } = e.detail;
     this.changeTitleByIndex(index);
     this.setData({
       presentType: index + 1
     })
     //页面切换时，发送请求获取数据
     this.getOrder();
   },

   //加载订单列表
   getOrder() {
     var that = this;
     wx.request({
       url: 'http://localhost:8888/wx/getOrder',
       method: 'POST',
       header: { //请求头
         "Content-Type": "application/x-www-form-urlencoded",
         "Authorization": wx.getStorageSync('LocalToken')
       },
       data: {
         state: that.data.presentType
       },
       success(res) {
         if (that.data.presentType == 1) {
           let all_Order=res.data.goods;
           for(var i=0;i<all_Order.length;i++){
             all_Order[i].totalPrice=Number(all_Order[i].totalPrice);
             all_Order[i].freight=Number(all_Order[i].freight);
           };
           that.setData({
             all_Order:all_Order
           })
         } else if (that.data.presentType == 2) {
          let wait_Paid=res.data.goods;
          for(var i=0;i<wait_Paid.length;i++){
            wait_Paid[i].totalPrice=Number(wait_Paid[i].totalPrice);
            wait_Paid[i].freight=Number(wait_Paid[i].freight);
          };
          that.setData({
            wait_Paid:wait_Paid
          })
         } else if (that.data.presentType == 3) {
          let wait_Sent=res.data.goods;
          for(var i=0;i<wait_Sent.length;i++){
            wait_Sent[i].totalPrice=Number(wait_Sent[i].totalPrice);
            wait_Sent[i].freight=Number(wait_Sent[i].freight);
          };
          that.setData({
            wait_Sent:wait_Sent
          })
         } else if (that.data.presentType == 4) {
          let wait_Received=res.data.goods;
          for(var i=0;i<wait_Received.length;i++){
            wait_Received[i].totalPrice=Number(wait_Received[i].totalPrice);
            wait_Received[i].freight=Number(wait_Received[i].freight);
          };
          that.setData({
            wait_Received:wait_Received
          })
         } else if (that.data.presentType == 5) {
          let haved_Return=res.data.goods;
          for(var i=0;i<haved_Return.length;i++){
            haved_Return[i].totalPrice=Number(haved_Return[i].totalPrice);
            haved_Return[i].freight=Number(haved_Return[i].freight);
          };
          that.setData({
            haved_Return:haved_Return
          })
         }
       },
       fail() {}
     });
   },

   deleteOrder(e) {
     //获取订单id
     var id = e.currentTarget.dataset.id;
     let allOrder = this.data.all_Order;
     for (var i = 0; i < allOrder.length; i++) {
       if (allOrder[i]._id == id) {
         allOrder.splice(i, 1);
         this.setData({
           all_Order: allOrder
         });
         break;
       }
     };
     wx.request({
       url: 'http://localhost:8888/wx/deleteOrder',
       method: 'POST',
       header: { //请求头
         "Content-Type": "application/x-www-form-urlencoded",
         "Authorization": wx.getStorageSync('LocalToken')
       },
       data: {
         _id: id
       },
       success(res) {},
       fail() {}
     })
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function(options) {
     //1.获取当前小程序的页面栈-数组 最大长度为10页面
     let pages = getCurrentPages();
     //2.数组中索引最大的页面就是当前页面
     let currentPage = pages[pages.length - 1];
     //3.获取url上的type参数
     var {
       type
     } = currentPage.options;
     var t = wx.getStorageSync("type");
     if (t) {
       var type = wx.getStorageSync("type");
       wx.removeStorageSync("type");
     }
     this.setData({
       presentType: type
     })
     //4.激活选中页面标题 当type=1时，index=0 
     this.changeTitleByIndex(type - 1);
     this.getOrder();
   },

   //跳转到全部订单页面
   overOrder(e) {
     var id = e.currentTarget.dataset.id;
     var state = e.currentTarget.dataset.state;
     //根据全部订单的状态，分别进入不同的页面
     if (state == "已完成") {
       wx.navigateTo({
         url: '/pages/overOrder/overOrder?orderId=' + id,
       })
     } else if (state == "待付款") {
       wx.navigateTo({
         url: '/pages/waitPaid/waitPaid?orderId=' + id,
       })
     } else if (state == "待发货") {
       wx.navigateTo({
         url: '/pages/waitSent/waitSent?orderId=' + id,
       })
     } else if (state == "待收货") {
       wx.navigateTo({
         url: '/pages/waitReceived/waitReceived?orderId=' + id,
       })
     } else if (state == "退款") {
       wx.navigateTo({
         url: '/pages/havedReturn/havedReturn?orderId=' + id,
       })
     };
     var aShow = true;
     wx.setStorageSync("aShow", aShow)
   },

   //跳转到待付款订单页面
   waitPaid(e) {
     var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/waitPaid/waitPaid?orderId=' + id,
     })
   },

   //跳转到待发货详情页面
   waitSent(e) {
     var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/waitSent/waitSent?orderId=' + id,
     })
   },

   //跳转到待收货详情页面
   waitReceived(e) {
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '/pages/waitReceived/waitReceived?orderId=' + id,
     })
   },
   
   //跳转到退款详情页面
   havedReturn(e) {
     var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/havedReturn/havedReturn?orderId=' + id,
     })
   }
 })