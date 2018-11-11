var common = require('../../utils/common.js');
var Bmob = require("../../utils/bmob.js");
var Bmob_ = require("../../utils/Bmob-1.6.5.min.js");
var util = require("../../utils/util.js");
var QRCode = require('../../utils/weapp-qrcode.js')
var that;
var qrcode;
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
    const del = Bmob_.File();
    const val = ["http://bmob-cdn-15327.b0.upaiyun.com/2018/04/25/7a9d1520406caceb80313d5c4ff5b457.jpg","http://bmob-cdn-15327.b0.upaiyun.com/2018/04/25/e50c96984051b41f802df9b9caf754d0.jpg"]
    del.destroy(val).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })  
    that = this;
    //获取用户的信息
    var User = Bmob.Object.extend("_User");
    var currentUser = Bmob.User.current();

    //var objectid = currentUser.id;
    console.log(currentUser)
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "https://github.com/tomfriwel/weapp-qrcode",
      image: '/images/bg.jpg',
      width: 150,
      height: 150,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        qrcode.makeCode(res.result)
        that.setData({
          result: res.result
        })
      },
      fail() { }
    })
  },
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            //console.log(path)
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },
  upload: function () {
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          console.log('itemn', item)
          file = Bmob.File('abc.jpg', item);
        }
        file.save().then(res => {
          console.log(res.length);
          console.log(res);
        })

      }
    })
  }
})
