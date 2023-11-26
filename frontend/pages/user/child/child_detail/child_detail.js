// pages/user/child/child_detail/child_detail.js
import * as echarts from '../../../../components/ec-canvas/echarts';

var child_id = 0;

var colorSet = [
  {id: 0, backgroundColor: '#143e64', colors:["#87ceeb","#59c4e6","#a5e7f0", '#add8e6', '#b5e4e6','#7cb9e8', '#5c9cc2', '#87ceeb', '#add8e6', '#164a7a98']},
  {id: 1, backgroundColor: '#b27466', colors:['#ffd700', '#f0e68c', '#eedc82', '#ffec8b','#ffd700', '#ffdb58', '#f0e68c', '#eedc82', '#ffec8b', '#b9612791']},
  {id: 2, backgroundColor: '#00207496', colors:['#c23531', '#ff6f94', '#ff5983', '#f4506e','#f48fb1', '#ff9eb4', '#ff6f94', '#ff5983', '#f4506e', '#23007471']},
  {id: 3, backgroundColor: '#008080', colors:['#a4ebb1', '#bdf9ca', '#c7fdc9', '#d3ffc8', '#e1ffdb', '#e7ffe5', '#c4f5c7', '#a4e7a0', '#83d968','#a4ebb1', ]},
];

function initRadarChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  const option = {
    color: colorSet[child_id].colors,
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    radar: [
      {
        indicator: [
          { text: '体力' },
          { text: '耐力' },
          { text: '积极性' },
          { text: '自控' },
          { text: '自信' }
        ],
        center: ['32%', '50%'],
        radius: 110,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '【{value}】',
          color: colorSet[child_id].colors[0]
        },
        splitArea: {
          areaStyle: {
            color: colorSet[child_id].colors,
            shadowColor: colorSet[child_id].colors[1],
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: colorSet[child_id].colors[2]
          }
        },
        splitLine: {
          lineStyle: {
            color: colorSet[child_id].colors[2]
          }
        }
      },
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: [100, 8, 0.4, 80, 2000],
            name: '2022年'
          },
          {
            value: [60, 5, 0.3, 100, 1500],
            name: '2023年',
            areaStyle: {
              color: colorSet[child_id].colors[9]
            }
          }
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

function initTag1Chart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ['32%', '30%'],
        data: [
          { value: 335, name: '运动' },
          { value: 310, name: '学习' },
          { value: 274, name: '艺术' },
          { value: 235, name: '阅读' },
          { value: 400, name: '自然' }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: colorSet[child_id].colors[0]
        },
        labelLine: {
          lineStyle: {
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: colorSet[child_id].colors[0],
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

function initTag2Chart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  const option = {
    color:colorSet[child_id].colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['自然', '学习', '阅读', '运动', '艺术']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisTick:{
          length: 2,
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '自然',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [12, 13, 10, 13, 9, 23, 21]
      },
      {
        name: '学习',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [22, 18, 19, 23, 29, 33, 31]
      },
      {
        name: '运动',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [15, 23, 20, 15, 19, 33, 41]
      },
      {
        name: '阅读',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [32, 33, 30, 33, 39, 33, 32]
      },
      {
        name: '艺术',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [8, 9, 9, 9, 12, 13, 13]
      }
    ]
  }
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec_radar: {
      onInit: initRadarChart
    },
    ec_tag1: {
      onInit: initTag1Chart
    },
    ec_tag2: {
      onInit: initTag2Chart
    },
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    child_id = options.index;
    this.setData({
      name: options.name
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