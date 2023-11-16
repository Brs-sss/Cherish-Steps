// pages/show/data/data.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadedKeys: [],
    unloadedKeys: [],
    records: [],

    startAdd: false,
    waitClear: '',

    submitHeight: '0',
    areaH: 0,
    windowH: 0,

    host_: `${app.globalData.localUrl}`,
  },

  updataSubmitHeight() {
    var p = this
    wx.createSelectorQuery().selectViewport().scrollOffset(function(res) {
      const scrollHeight = res.scrollHeight; // Total height of the scrollable area
      p.setData({
        submitHeight: String(scrollHeight - 180)
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var pointer = this
    wx.getStorage({
      key: 'openid',  // 要获取的数据的键名
      success: function (res) { 
        var openid = res.data
        wx.request({
          url: pointer.data.host_ + 'user/api/show/data/getkeys' + '?openid=' + openid,
          method:'GET',
          success:function(res){
            console.log(res.data.keyList)
            pointer.setData({
              unloadedKeys: res.data.keyList
            })
          }
        });
      },
      fail: function(res) {
        console.error('获取本地储存失败', res);
      }
    })
    // 设置提交按钮高度
    this.updataSubmitHeight()
  },

  handleAddKey(e) { // 处理添加标签
    var id = e.currentTarget.id
    console.log(e)
    
    if( id.substring(0, 3) == "key" ){
      var index = parseInt(id.substring(4))
      var un = this.data.unloadedKeys
      var ld = this.data.loadedKeys
      ld.push(un.splice(index, 1)[0]);
      this.setData({
        unloadedKeys: un,
        loadedKeys: ld
      })
      this.updataSubmitHeight()
    }
    if( id == "addBtn" ){
      this.setData({
        startAdd: true
      })
      this.updataSubmitHeight()
    }
    if( id == "newTitleBar" ){
      console.log("here")
      var content = e.detail.value
      console.log(this.data.loadedKeys)
      if(content == "" || this.data.loadedKeys.includes(content)
         || this.data.unloadedKeys.includes(content)){
        this.setData({ startAdd: false })    
        return           
      }
      var ld = this.data.loadedKeys
      ld.push(content)
      this.setData({
        loadedKeys: ld,
        startAdd: false
      })
    }
    if( id == "overlay" ){
      this.setData({
        startAdd: false
      })
      this.updataSubmitHeight()
    }
  },

  handleAddData(e) { // 处理数据改变
    if(e.detail.value == null)
      return
    var key = e.currentTarget.id
    var records = this.data.records
    for(var i = 0; i < records.length; i++){
      if(key == records[i]["key"]){
        records[i]["value"] = e.detail.value;
        console.log(this.data.records)
        return
      }
    }
    records.push({"key": e.currentTarget.id, "value": e.detail.value})
    console.log(this.data.records)
  },

  handleSubmit(e) { // 处理提交
    var pointer = this
    console.log("length: ", pointer.data.records.length)
    if(pointer.data.records.length == 0)
      return

    // 获取年-月-日
    const currentDateAndTime = new Date();
    var year = currentDateAndTime.getFullYear();
    var month = (currentDateAndTime.getMonth() + 1).toString().padStart(2, '0'); 
    var day = currentDateAndTime.getDate().toString().padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;

    const currentDateString = currentDateAndTime.toDateString();
    const currentTimeString = currentDateAndTime.toTimeString();
    
    wx.getStorage({
      key: 'openid',  // 要获取的数据的键名
      success: function (res) { 
        var openid = res.data
        const generate = openid + currentDateString + currentTimeString;
        wx.request({
          url: pointer.data.host_ + 'user/api/getSHA256' + '?text=' + generate,
          method:'GET',
          success:function(res){
            const data_id = res.data.sha256;
            console.log(data_id)
            wx.request({ //上传数据
              url: pointer.data.host_ + 'user/api/show/data/submit',
              method: 'POST',
              header:{
                'content-type': 'application/json'
              },
              data:{
                'openid':openid,
                'data_id':data_id,
                'children':'',
                'records':pointer.data.records,
                'date':formattedDate,
                'time':currentTimeString,
              },
              success: function(res) {
                wx.navigateBack(1) //成功提交，返回上个页面
              },
              fail: function(res) {
                console.error('上传失败', res);
              }
            })
          }
        });
      },
      fail: function(res) {
        console.error('获取本地储存失败', res);
      }
    })
  }
})