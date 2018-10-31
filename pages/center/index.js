


// pages/center/index.js
var Bmob=require("../../utils/bmob.js");
Page({
  data:{
    loading: true
  },
  onLoad:function(options){
    //页面初始化 options为页面跳转所带来的参数
    var that = this;
    var value = wx.getStorageSync('openid')
    if (value) {
      var u = Bmob.Object.extend("_User");
      var query = new Bmob.Query(u);
      query.equalTo("openid", value);
      query.find({
        success: function (results) {
          that.setData({    
            userInfo: results[0],
          })  
        },
        error: function (error) {
        }
      });
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  cart:function(){
    wx.switchTab({ 
      url: '../cart/index' 
    })
  },

  sale: function () {
    wx.navigateTo({
      url: '../sale/sale'
    })
  },

  feedback : function(){
    wx.navigateTo({
      url: './feedback/feedback'
    })
  },
  open:function(){
    var that= this;
    
    wx.login({
      success: function (res) {
        var user = new Bmob.User();//开始注册用户
        user.loginWithWeapp(res.code).then(function (user) {
          var openid = user.get("authData").weapp.openid;
          if (user.get("nickName")) {
            // 第二次访问
            wx.setStorageSync('openid', openid)
            that.onLoad()
          } else {
            //保存用户其他信息
            wx.getUserInfo({
              success: function (result) {
                that.setData({
                  loading: false
                })
                var userInfo = result.userInfo;
                var nickName = userInfo.nickName;
                var avatarUrl = userInfo.avatarUrl;

                var u = Bmob.Object.extend("_User");
                var query = new Bmob.Query(u);
                // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                query.get(user.id, {
                  success: function (result) {
                    // 自动绑定之前的账号
                    result.set('nickName', nickName);
                    result.set("userPic", avatarUrl);
                    result.set("openid", openid);
                    result.save();
                    wx.setStorageSync('openid', openid)
                    setTimeout(function () {
                      that.setData({
                        loading: true
                      })
                      that.onLoad()
                    }, 2000);
                  }
                });
                
              },fail:function(res){
                that.setData({
                  loading: true
                })
              }
            });
          }

        }, function (err) {
          console.log(err, 'errr');
        });
      }
    });
  }
})