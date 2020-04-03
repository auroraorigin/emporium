import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js'; 
import { login } from "../../utils/asyncWx.js";
const app = getApp();
Page({
  async handleGetUserInfo(e) {
    /*//1 获取用户信息
    const {encrytedData,rawData,iv,signature}=e.detail;
    //2 获取小程序登录成功后的code
    const {code}=await login();
    const loginParams = { encrytedData, rawData, iv, signature,code };
    //3 发送请求获取用户的token
    const {token}= await request({ url:"https://api.zbztb.cn/api/public/v1/users/wxlogin",data:loginParams,method:"post"});
    wx.setStorageSync("token", token)*/
    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    app.getToken();
    wx.navigateBack({
      delta:1
    })
  },
})