// pages/user/child/addchild/addchild.js
// pages/register/register/register.js

function getImageGridStyle(num_rows){
  return `display: grid;
  grid-template-rows: repeat(${num_rows}, 1fr);
  grid-template-columns: 1fr 1fr 1fr;
  justify-content:center;
  align-items:center;
  width: 100%;
  height:calc(30vw*${num_rows});`
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '', //昵称
    imageList: [],
    profilePath:'',
    imgGridStyle:getImageGridStyle(1),
    host_: 'http://127.0.0.1:8090/',
    openid: '',
    is_disabled: false,
    visibility_cancel: 'none',
    visibility_input: 'block',
    visibility_create: 'block',
    visibility_text: 'none',
    firsttime_selected_img:true
  },

  handleInputName(e) {  //输入用户名的处理
    this.setData({
      inputName: e.detail.value
    });
  },

  
  handleSubmit() {
    wx.getStorage({
      key: 'openid',  // 要获取的数据的键名
      success: function (res) { 
        // 从本地存储中获取数据,在index.js文件中保存建立的
        let openid=res.data
        console.log('opeidd: ',openid) 
        wx.request({
          url: that.data.host_+'user/api/user/add_child', //url get传参数
          method:'GET',
          success:function(res){
            wx.request({ //上传非图片数据
              url: that.data.host_+'user/api/show/event/submit',
              method: 'POST',
              header:
              {
                'content-type': 'application/json'
              },
              data:{
                'openid': openid,
                'name': inputName
              },
              fail:function(res){
                console.log(that.data.host_+'user/api/show/event/submit')
              }
            })
          },
          fail:function(res){
            console.log('failed to get sha256 value')
          }
        })
      },
      fail: function (res) {
        console.log('获取数据失败');
      }
    });
  },

  chooseImage:function(e){
    console.log("tapped")
    const index = e.currentTarget.dataset.index; // 获取用户点击的格子索引
    wx.chooseMedia({
      count: 9 - this.data.imageList.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles;
        const imageList = this.data.imageList.concat(tempFiles.map((file) => file.tempFilePath));
        const num_rows=Math.ceil((imageList.length+1)/ 3);
        this.setData({
          imageList: imageList.slice(0, 9),
          imgGridStyle:getImageGridStyle(num_rows),
          firsttime_selected_img:false,
          // profilePath: res.tempFilePath[0]
        });
      },
      fail: (res)=>{
        console.log(1)
      }
    });
  },

  changeImage:function(e){  //更改一张图片为其他图片
    const index = e.currentTarget.dataset.index; // 获取用户点击的格子索引
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles;
        const imageList = this.data.imageList;
        imageList[index]=tempFiles[0].tempFilePath;
        this.setData({
          imageList: imageList,
        });
      },
    });
  },

  handleDelete(event) {
    const index = event.currentTarget.dataset.index;
    const imageList = this.data.imageList;
    imageList.splice(index, 1);
    const num_rows=Math.ceil((imageList.length+1)/ 3);
    console.log("rows",num_rows)
    this.setData({
      imageList: imageList,
      imgGridStyle:getImageGridStyle(num_rows)
    });
    // 返回 false 阻止事件传播
    return false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getDict('tags')
    console.log(options)
    let that = this
    that.setData({
      openid: options.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})