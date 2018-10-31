//app.js
var Bmob=require("utils/bmob.js");
Bmob.initialize("e2b26798b73c2d20f20420ecafab48c4", "09be5943529005f15510d3be9baea8eb");

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var user = new Bmob.User() //实例化用户对象
    user.auth()
  },
  getUserInfo:function(cb){
    var that = this
  },
  globalData:{
    userInfo:null
  }
})