// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: [],
    completeList: [],
    planList: [],
    host_: 'http://127.0.0.1:8090/'
  },

  onLoad(options) {
    // 加载近七天完成的任务
    // 加载需要显示的plan
    this.setData({
      todoList: [{task: '任务 1', leftDay: '1', complete: false}, 
                 {task: '任务 2', leftDay: '2', complete: false}, 
                 {task: '任务 3', leftDay: '3', complete: false},
                 {task: '任务 4', leftDay: '4', complete: false},
                 {task: '任务 5', leftDay: '5', complete: false},
                 {task: '任务 6', leftDay: '6', complete: true},
                 {task: '任务 7', leftDay: '7', complete: true},
                 {task: '任务 8', leftDay: '7', complete: true}],
      planList: ['英语能力提升', '钢琴计划']
    })
  },

  goToTodoList(e) {
    const planValue = e.currentTarget.dataset.value;
    console.log(planValue);
    wx.navigateTo({
      url: '/pages/plan/todo/todo?plan=' + encodeURIComponent(planValue),
    })
  },

  goToAllPlan(e) {
    wx.navigateTo({
      url: '/pages/plan/all_plan/all_plan',
    })
  },

  completeTask(e) {
    var taskN = parseInt(e.target.id.substring(8))
    console.log('index: ', taskN)
    var todoList = this.data.todoList
    const task = todoList.splice(taskN, 1)[0] // 去掉第k个元素
    var index
    if(! task.complete) {
      // 插入到 第一个已完成且剩余天数更多的元素 的位置
      index = todoList.findIndex(obj => (obj.complete && obj.leftDay > task.leftDay))
      if (index === -1) {
        // 未找到，插入到最后
        index = todoList.length 
      }
    }
    else {
      index = todoList.findIndex(obj => ! obj.complete)
      console.log(index)
      if (index === -1) {
        // 不存在未完成元素，直接插入到开头
        index = 0;
        console.log(index)
      }
      else{
        // 存在未完成元素，插入到 第一个未完成且剩余天数更多的元素 的位置
        index = todoList.findIndex(obj => (! obj.complete && obj.leftDay > task.leftDay))
        console.log(index)
        if (index === -1) {
          // 未找到，插入到 第一个已完成元素 的位置
          index = todoList.findIndex(obj => obj.complete)
          console.log(index)
          if(index === -1){
            // 未找到，插入到最后
            index = todoList.length 
            console.log(index)
          }
        }
      }
    }
    task.complete = ! task.complete
    console.log('final index: ', index)
    todoList.splice(index, 0, task) // 插入
    this.setData({
      todoList: todoList
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