<template>
  <div class="system_manage_page" ref="monitoring">
    <div class="header">
      <div class="header_left">
        <!-- <span class="_head_line">
        </span> -->
        <div class="left_three_btn">
          <div class="monitoring_btn" @click="openMonitoring()">
            实时监控
          </div>
          <div class="monitoring_btn"  @click="openDataCalc()">
            数据统计
          </div>
          <div class="monitoring_btn" @click="openDataAnalysis()">
            数据分析
          </div>
        </div>
      </div>
      <div class="header_center">
        湖南湘旭物联网平台数据统计
      </div>
      <div class="header_right">
        <div class="right_two_btn">
          <div class="monitoring_btn" @click="openSystemManage()">
            系统管理
          </div>
          <div class="monitoring_btn active" @click="openDeviceManage()">
            设备管理
          </div>
        </div>
      </div>
      <div class="monitoring_date">
          {{dateTime}}
      </div>
    </div>
    <div class="page_center">
      <div class="top_title_display">
        <!-- 筛选框 -->
        <div class="select_items select_items_year">
          <div class="label_item">
            请选择年份：
          </div>
          <div class="select_input">
            <multiselect
              @input="chooseYear"
              selectLabel=''
              :allow-empty="false"
              selectGroupLabel=""
              deselectLabel=''
              selectedLabel=''
              placeholder="年份"
              v-model="selectedYear"
              :options="yearsList">
            </multiselect>
          </div>
        </div>
        <div class="select_items select_items_month">
          <div class="label_item">
            月份：
          </div>
          <div class="select_input">
            <multiselect
              @input="chooseMonth"
              :allow-empty="false"
              selectLabel=""
              selectGroupLabel=""
              deselectLabel=""
              selectedLabel=""
              placeholder="月份"
              v-model="selectedMonth"
              :options="monthList">
            </multiselect>
          </div>
        </div>
        <div class="select_items select_items_area">
          <div class="label_item">
            区域：
          </div>
          <div class="select_input">
            <multiselect
              :allow-empty="false"
              selectLabel=""
              selectGroupLabel=""
              deselectLabel=""
              selectedLabel=""
              placeholder=""
              v-model="selectedArea"
              :options="areaList">
            </multiselect>
          </div>
        </div>
        <div class="select_items select_items_terminal">
          <div class="label_item">
            终端类型：
          </div>
          <div class="select_input">
            <multiselect
              :allow-empty="false"
              selectLabel=""
              selectGroupLabel=""
              deselectLabel=""
              selectedLabel=""
              placeholder=""
              v-model="selectedTerminal"
              :options="terminalList">
            </multiselect>
          </div>
        </div>
        <div class="submit_btn">
          确认
        </div>
      </div>
      <div class="echarts_container">
        <div class="top_two_charts">
          <div class="left_charts">
            <div class="_title">
              ◆ 终端数据分析 ◆
            </div>
            <div class="count_table">
              <div class="temina_title">
                该类型终端总数
              </div>
              <div class="number_">
                  295
              </div>
            </div>
            <div class="three_list">
              <div class="nomal_number">
                <div class="_title">
                  正常
                </div>
                <div class="_numbers">
                  258
                </div>
              </div>
              <div class="nomal_number">
                <div class="_title">
                  异常
                </div>
                <div class="_numbers">
                  10
                </div>
              </div>
              <div class="nomal_number no_border">
                <div class="_title">
                  失联
                </div>
                <div class="_numbers">
                  23
                </div>
              </div>
            </div>
            <div class="charts_nomal" id="teminaCharts">
              <!-- ◆ 终端数据分析 ◆ -->
            </div>
          </div>
          <div class="right_charts" id="monthDataCharts">
            <!-- ◆ 月度数据分析 ◆ -->
          </div>
        </div>
        <div class="bottom_two_charts">
          <div class="left_charts" style="margin-right: 0.5%">
            <div class="_title">
              ◆ 异常数据分析 ◆
            </div>
            <div class="chars_table">
              <div class="_left_charts" id="brokeAnalysis">
                <!-- 故障种类分析 -->
              </div>
              <div class="unnomal_log">
                <!-- 异常日志 -->
                <div class="_title">
                  异常日志
                </div>
                <div class="_logs_list" v-for="(item, index) in logsList" :key="index">
                  <div class="log_detail_date">
                    <div class="_detail">
                      {{item.logs}}
                    </div>
                    <div class="_date_time">
                        {{item.dateTime}}
                    </div>
                  </div>
                  <div class="reason_isfixed">
                    <div class="_reason">
                      {{item.reason}}
                    </div>
                    <div class="_isFixed">
                      {{item.status}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right_charts" style="margin-left: 0.5%">
            <div class="_title">
              ◆ 异常数据分析 ◆
            </div>
            <div class="chars_table">
              <div class="_left_charts" id="loseInfoAnalysis">
                <!-- 故障种类分析 -->
              </div>
              <div class="unnomal_log">
                <!-- 异常日志 -->
                <div class="_title">
                  失联日志
                </div>
                <div class="_logs_list" v-for="(item, index) in logsList" :key="index">
                  <div class="log_detail_date">
                    <div class="_detail">
                      {{item.logs}}
                    </div>
                    <div class="_date_time">
                        {{item.dateTime}}
                    </div>
                  </div>
                  <div class="reason_isfixed">
                    <div class="_reason">
                      {{item.reason}}
                    </div>
                    <div class="_isFixed">
                      {{item.status}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
export default {
  name: 'monitoring',
  components: {
    Multiselect
  },
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      yearsList: [],
      DateList: [],
      dateData: [],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      selectedArea: "长沙市",
      areaList: ['长沙市', '浏阳市', '株洲市', '宁乡市'],
      selectedTerminal: '爆闪灯',
      terminalList: ['爆闪灯','黄慢（闪）灯', '点阵式主动发光标志','面阵式全透发光标志' ,'面阵式半透发光标志'],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
      logsList: [
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：得问问辅导费",
          dateTime: moment().format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：的非官方个",
          dateTime: moment().subtract(10, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：是的是非得失",
          dateTime: moment().subtract(3, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：sadadsd",
          dateTime: moment().subtract(1, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：sadadsd",
          dateTime: moment().subtract(1, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：sadadsd",
          dateTime: moment().subtract(1, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        },
        {
          logs: '爆闪灯在某地发生了灯不闪烁等故障',
          reason: "原因：sadadsd",
          dateTime: moment().subtract(1, 'day').format('YYYY.MM.DD'),
          status: "暂未修复"
        }
      ]
    }
  },
  created() {
    for(let i = 2000; i <= 2050; i++) {
      this.yearsList.push(i)
    }
  },
  mounted() {
    this.makeDateListData()
    this.getTeminaChars()
    this.getMonthData()
    this.getBrokeAnalysisData()
    this.getLoseInfoAnalysisData()
  },
  methods:{
    openMonitoring() {
      this.$router.push('main')
    },
    openDataCalc() {
      this.$router.push('dataCalc')
    },
    openDataAnalysis() {
      this.$router.push('dataAnaysis')
    },
    openSystemManage() {
      this.$router.push('systemManage')
    },
    openDeviceManage() {
      this.$router.push('deviceManage')
    },
    chooseYear(year) {
      this.selectedYear = year
      this.makeDateListData()
    },
    chooseMonth(val) {
      this.selectedMonth = val
      this.makeDateListData()
    },
    getTeminaChars() {
      const teminaChars = echarts.init(document.getElementById('teminaCharts'))
      const option = {
          color: ['#68BC63', '#F14D27', '#686868'],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              textStyle: {
                color: '#FFDE29'
              },
              data:['正常','异常','失联']
          },
          calculable : true,
          series : [
              {
                  type:'pie',
                  name: "终端",
                  radius : [40, 80],
                  center : ['50%', '50%'],
                  roseType : 'area',
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  lableLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  data:[
                      {value:10, name:'正常'},
                      {value:5, name:'异常'},
                      {value:15, name:'失联'}
                  ]
              }
          ]
      }
      teminaChars.setOption(option)
    },
    makeDateListData() {
      let v = this.selectedMonth
      let y = this.selectedYear
      this.DateList = []
      if (v === 1 || v === 3 || v === 5 || v === 7 || v === 8 || v === 10 || v === 12) {
        for(let j = 1; j<= 31;j++) {
          this.DateList.push(j)
          this.dateData.push(Math.round(Math.random()*20))
        }
      } else if (v === 2){
        if (y%4 === 0) {
          for(let j = 1; j<= 29;j++) {
            this.DateList.push(j)
            this.dateData.push(Math.round(Math.random()*20))
          }
        } else {
          for(let j = 1; j<= 28;j++) {
            this.DateList.push(j)
            this.dateData.push(Math.round(Math.random()*20))
          }
        }
      } else {
        for(let j = 1; j<= 30;j++) {
          this.DateList.push(j)
          this.dateData.push(Math.round(Math.random()*20))
        }
      }
    },
    getMonthData() {
      // 月度数据分析
      let dateList = this.DateList
      let dateData = this.dateData
      const teminaChars = echarts.init(document.getElementById('monthDataCharts'))
      const option = {
        color: ['#68BC63', '#F14D27', '#686868'],
        title: {
            text: '◆ 月度数据分析 ◆',
            x: "center",
            padding: [10,0,0,0],
            textStyle: {
              fontSize: 12,
              color: '#FFDE29',
              rich: {
                align: 'center'
              }
          }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}次"
         },
        legend: {
              orient: 'horizontal',
              top: '10',
              left:'right',
              padding: [0,20,0,0],
              textStyle: {
                color: "#FFDE29",
                fontSize: 12
              },
              data:['正常','异常','离线']
          },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                 axisLine: {
                  lineStyle: {
                    color:'#fff'
                  }
                },
                data : dateList
            }
        ],
        yAxis : [
            {
                type: 'value',
                nameLocation:"center",
                nameGap:35,
                nameRotate:0,
                min: 0,
                max: 100,
                nameTextStyle:{
                    fontSize: 16,
                },
                 axisLine: {
                  lineStyle: {
                    color:'#fff'
                  }
                },
                //默认以千分位显示，不想用的可以在这加一段
                axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                    show:true,
                    showMinLabel:true,
                    showMaxLabel:true,
                    formatter: function (value) {
                        return value;
                    }
                }
            },
            {
                type: 'value',
                nameLocation:"center",
                min: 0,
                max: 500,
                nameGap:35,
                nameRotate:0,
                 axisLine: {
                  lineStyle: {
                    color:'green'
                  }
                },
                nameTextStyle:{
                    fontSize: 12,
                    color: 'green'
                },
                //默认以千分位显示，不想用的可以在这加一段
                axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                    show:true,
                    showMinLabel:true,
                    showMaxLabel:true,
                    formatter: function (value) {
                        return value;
                    }
                }
            }
        ],
        series : [
            {
                type:'line',
                name: '正常',
                smooth: true,
                yAxisIndex: 0,
                data: dateData,
                itemStyle : { normal: {label : {show: true}}},
            },
            {
                type:'line',
                name: '异常',
                smooth: true,
                yAxisIndex: 0,
                data:dateData,
                itemStyle : { normal: {label : {show: true}}},
            },
             {
                type:'line',
                name: '离线',
                smooth: true,
                yAxisIndex: 0,
                data:dateData,
                itemStyle : { normal: {label : {show: true}}},
            }
        ]
      }
      teminaChars.setOption(option)
    },
    getBrokeAnalysisData() {
      const brokeAnalysisChars = echarts.init(document.getElementById('brokeAnalysis'))
      const option = {
          title : {
            text: '故障种类分析',
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#FFDE29'
            }
          },
          color: ['#56AAB7', '#E62129', '#F08519', '#68BC63', '#FFF000', '#B04B87'],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              textStyle: {
                color: '#FFDE29'
              },
              data:['输出','信号','太阳能电池', '蓄电池', '温度', '其他故障']
          },
          calculable : true,
          series : [
              {
                  type:'pie',
                  name: "终端",
                  radius : [40, 80],
                  center : ['50%', '50%'],
                  roseType : 'area',
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  lableLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  data:[
                      {value:10, name:'输出'},
                      {value:5, name:"信号"},
                      {value:15, name:'太阳能电池'},
                      {value:4, name:'蓄电池'},
                      {value:8, name:'温度'},
                      {value:23, name:'其他故障'}
                  ]
              }
          ]
      }
      brokeAnalysisChars.setOption(option)
    },
    getLoseInfoAnalysisData() {
      const brokeAnalysisChars = echarts.init(document.getElementById('loseInfoAnalysis'))
      const option = {
          title : {
            text: '失联种类分析',
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#FFDE29'
            }
          },
          color: ['#56AAB7', '#E62129', '#F08519', '#68BC63', '#FFF000', '#B04B87'],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              textStyle: {
                color: '#FFDE29'
              },
              data:['面阵式半透型发光标志','面阵式全透型发光标志','点阵式发光标志', '爆闪灯', '黄（慢）灯']
          },
          calculable : true,
          series : [
              {
                  type:'pie',
                  name: "终端",
                  radius : [40, 80],
                  center : ['50%', '40%'],
                  roseType : 'area',
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  lableLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  data:[
                      {value:10, name:'面阵式半透型发光标志'},
                      {value:5, name:"面阵式全透型发光标志"},
                      {value:15, name:'点阵式发光标志'},
                      {value:4, name:'爆闪灯'},
                      {value:8, name:'黄（慢）灯'}
                  ]
              }
          ]
      }
      brokeAnalysisChars.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/system-manage.scss';
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
