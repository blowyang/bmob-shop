var common = require('../../utils/common.js');
var Bmob = require("../../utils/bmob.js");
var util = require("../../utils/util.js");
var that;
Page({
  onShareAppMessage() {
    return {
      title: '扫码',
      path: 'page/API/pages/scan-code/scan-code'
    }
  },

  data: {
    result: ''
  },
  onLoad(){
    that = this;
    //获取用户的信息
    var User = Bmob.Object.extend("_User");
    var currentUser = Bmob.User.current();

    //var objectid = currentUser.id;
    console.log(currentUser)
  },
  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        that.setData({
          result: res.result
        })
      },
      fail() { }
    })
  }
})
