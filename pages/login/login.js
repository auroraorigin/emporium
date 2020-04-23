import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { login } from "../../utils/asyncWx.js";
const app = getApp();
Page({
  data:{
    
  },
  async handleGetUserInfo(e) {
   ///如果用户按了允许按钮
    if (e.detail.rawData) {
      const { userInfo } = e.detail;
      wx.setStorageSync("userinfo", userInfo);
      app.getToken();
      wx.navigateBack({
        delta:2
      })
    }else{
      wx.showToast({
        title: '亲，请授权登录,否则无法进入哦！',
        icon:'none',
        duration:3000,
        mask:true
      })
    }
  },
})