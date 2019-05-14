<template>
  <div class="data_calc_page" ref="monitoring">
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
          <div class="monitoring_btn active" @click="openDataAnalysis()">
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
          <div class="monitoring_btn" @click="openDeviceManage()">
            设备管理
          </div>
        </div>
      </div>
      <div class="monitoring_date">
          {{dateTime}}
      </div>
      <div class="edit_btn" @click="openBtnEdit()">
        按钮编辑器
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
            区域(省)：
          </div>
          <el-select v-model="selectedProvice"  placeholder="请选择" @change="getAreaList();">
            <el-option v-for="item in proviceList" :key="item.value" :label="item.label" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="select_items select_items_area" style="margin-left:40px">
          <div class="label_item">
            区域(市)：
          </div>
          <div class="select_input">
            <el-select v-model="selectedArea"  placeholder="请选择">
              <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item">
              </el-option>
            </el-select>
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
              placeholder="请选择"
              v-model="selectedTerminal"
              :options="terminalList">
            </multiselect>
          </div>
        </div>
        <div class="submit_btn"  @click="searchAll()">
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
                  {{zdData.total}}
              </div>
            </div>
            <div class="three_list">
              <div class="nomal_number">
                <div class="_title_1">
                  正常
                </div>
                <div class="_numbers">
                  {{zdData.normal}}
                </div>
              </div>
              <div class="nomal_number">
                <div class="_title_2">
                  异常
                </div>
                <div class="_numbers">
                  {{zdData.abnormal}}
                </div>
              </div>
              <div class="nomal_number no_border">
                <div class="_title_3">
                  失联
                </div>
                <div class="_numbers">
                  {{zdData.offLine}}
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
                <div class="_logs_list" v-for="(item, index) in logsList_analysis" :key="index">
                  <div class="log_detail_date">
                    <div class="_detail">
                      【{{item.etype}}】{{item.emsg}}
                    </div>
                    <div class="_date_time">
                        {{item.time}}
                    </div>
                  </div>
                  <div class="reason_isfixed">
                    <div class="_reason">
                      {{item.reMsg}}
                    </div>
                    <div class="_isFixed">
                      {{item.reStatus}}
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
                <!-- 失联种类分析 -->
              </div>
              <div class="unnomal_log">
                <!-- 异常日志 -->
                <div class="_title">
                  失联日志
                </div>
                <div class="_logs_list" v-for="(item, index) in logsList_offLine" :key="index">
                  <div class="log_detail_date">
                    <div class="_detail">
                      【{{item.etype}}】{{item.emsg}}
                    </div>
                    <div class="_date_time">
                        {{item.time}}
                    </div>
                  </div>
                  <div class="reason_isfixed">
                    <div class="_reason">
                      {{item.reMsg}}
                    </div>
                    <div class="_isFixed">
                      {{item.reStatus}}
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
      selectedDate: new Date().getDate(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      selectedProvice:"",
      selectedArea: "",
      proviceList: [],
      areaAllList:{},
      areaList: [],
      selectedTerminal: '',
      terminalList: [],
      terminalAllList:[],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
      logsList_analysis:[],
      logsList_offLine:[],
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
      ],
      listQuery:{
        "year": "",
        "month": "",
        "day": "",
        "city": "",
        "province": "",
        "productId": ""
      },
      zdData:{
        "total": 25,
        "normal": 10,
        "abnormal": 12,
        "offLine": 3
      },
      brokeData:[
          {value:10, name:'输出'},
          {value:5, name:"信号"},
          {value:15, name:'太阳能电池'},
          {value:4, name:'蓄电池'},
          {value:15, name:'太阳能电池'},
          {value:8, name:'温度'},
          {value:4, name:'其他故障'},
      ]//故障数据
    }
  },
  created() {
    for(let i = 2000; i <= 2050; i++) {
      this.yearsList.push(i)
    }
    this.getArea()
  },
  mounted() {
    this.getDengZhiList()
    this.setQuest()
    this.makeDateListData()
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
    openBtnEdit() {
      this.$router.push('btnEdit')
    },
    chooseYear(year) {
      this.selectedYear = year
      this.makeDateListData()
    },
    chooseMonth(val) {
      this.selectedMonth = val
      this.makeDateListData()
    },
    getTeminaDatas(listQuery) {
      let params = {
        fetchUrl: '/sys/analysis/total',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        console.log("___________终端数据分析_______",data)
        if(data){
          this.zdData = data
          let list = [
              {value:10, name:'正常'},
              {value:5, name:'异常'},
              {value:15, name:'失联'}
          ]
          list[0].value = data.normal
          list[1].value = data.abnormal
          list[2].value = data.offLine
          this.getTeminaChars(list)//终端数据分析饼图
        }
      })
    },
    getMonthData(listQuery) {
      let params = {
        fetchUrl: '/sys/analysis/month',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        console.log("___________月度数据分析_______",data)
        let arr1 = [],arr2 = [],arr3 = [],arr = []
        if(data){
          if(data.normal){
            arr1 = Object.values(data.normal)
          }
          if(data.abnormal){
            arr2 = Object.values(data.abnormal)
          }
          if(data.offLine){
            arr3 = Object.values(data.offLine)
          }
          arr.push(arr1)
          arr.push(arr2)
          arr.push(arr3)
          this.getMonthDataPar(arr)//月度数据分析饼图
        }
      })
    },
    getBrokeAnalysisDatas(listQuery) {
      let _this = this 
      let params = {
        fetchUrl: '/sys/analysis/errorCount',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        console.log("_________故障数据分析_______",data)
        let datelist = []
        let datalist = []
        if(data){
          let list = [
              {value:10, name:'输出'},
              {value:5, name:"信号"},
              {value:15, name:'太阳能电池'},
              {value:4, name:'蓄电池'},
              {value:15, name:'太阳能电池'},
              {value:8, name:'温度'},
              {value:4, name:'其他故障'},
          ]
          for (let i = 0; i < 7; i++) {
            let va = "kind"+(i+1)
            list[i].value = data[va] 
              datelist.push(list[i].name)
              datalist.push(list[i])
            }
          this.getBrokeAnalysisData(datalist,datelist)//故障数据分析
        }
      })
    },
    getLoseInfoAnalysisData(listQuery) {
      let _this = this
      let params = {
        fetchUrl: '/sys/analysis/offLineCount',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        console.log("_________失联数据_______",data)
        let datelist = this.terminalList
        let datalist = []
        if(data){
          let list =[]
           for (let i = 0; i < datelist.length; i++) {
             let va = "kind"+(i+1)
             let value = data[va] 
             var item = {value:value, name:datelist[i]}
             list.push(item)
           }
          datalist = list
          this.getLoseInfoAnalysisDataPar(datalist,datelist)//失联数据分析
        }
      })
    },
    getTeminaChars(data) {
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
                  data:data
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
    unnomalListData(listQuery) {
      let _this = this
      //故障异常日志
      let params = {
        fetchUrl: '/sys/analysis/errorlog',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data.datas
        console.log("_________故障异常日志_______",data)
        for(let i =0;i<data.length;i++){
          let oldTime = data[i].time
          let newdate = moment(oldTime).format('YYYY-MM-DD HH:mm:ss')
          data[i].time = newdate
          if(data[i].reStatus == 1) data[i].reStatus = "未修复"
          else if(data[i].reStatus == 2)data[i].reStatus = "已修复"
          else data[i].reStatus = "未知"
          if(data[i].etype == 1)data[i].etype = "输出"
          else if(data[i].etype == 2)data[i].etype = "信号"
          else if(data[i].etype == 3)data[i].etype = "太阳能电池"
          else if(data[i].etype == 4)data[i].etype = "蓄电池"
          else if(data[i].etype == 5)data[i].etype = "温度"
          else if(data[i].etype == 6)data[i].etype = "其他"
          else data[i].etype = "未知"
        }
        this.logsList_analysis = data
      })
      //失联异常日志
      let params2 = {
        fetchUrl: '/sys/analysis/offLineLog',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params2).then(res => {
        let data = res.data.datas
        console.log("_________失联异常日志_______",data)
        for(let i =0;i<data.length;i++){
          let oldTime = data[i].time
          let newdate = moment(oldTime).format('YYYY-MM-DD HH:mm:ss')
          data[i].time = newdate
          if(data[i].reStatus == 1) data[i].reStatus = "未修复"
          else if(data[i].reStatus == 2)data[i].reStatus = "已修复"
          else data[i].reStatus = "未知"
          if(data[i].etype == 1)data[i].etype = "输出"
          else if(data[i].etype == 2)data[i].etype = "信号"
          else if(data[i].etype == 3)data[i].etype = "太阳能电池"
          else if(data[i].etype == 4)data[i].etype = "蓄电池"
          else if(data[i].etype == 5)data[i].etype = "温度"
          else if(data[i].etype == 6)data[i].etype = "其他"
          else data[i].etype = "未知"
        }
        this.logsList_offLine = data
      })
    },
    getMonthDataPar(data) {
      // 月度数据分析
      let dateList = this.DateList
      const teminaChars = echarts.init(document.getElementById('monthDataCharts'))
      const option = {
        color: ['green', 'red', '#999'],
        title: {
            text: '◆ 月度数据分析 ◆',
            x: "center",
            padding: [10,0,0,0],
            textStyle: {
              fontSize: 12,
              color: '#7dd7f9',
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
                color: "#ccc",
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
                data: data[0],
                itemStyle : { normal: {label : {show: true}}},
            },
            {
                type:'line',
                name: '异常',
                smooth: true,
                yAxisIndex: 0,
                data:data[1],
                itemStyle : { normal: {label : {show: true}}},
            },
             {
                type:'line',
                name: '离线',
                smooth: true,
                yAxisIndex: 0,
                data:data[2],
                itemStyle : { normal: {label : {show: true}}},
            }
        ]
      }
      teminaChars.setOption(option)
    },
    getBrokeAnalysisData(datalist,datelist) {
      const brokeAnalysisChars = echarts.init(document.getElementById('brokeAnalysis'))
      const option = {
          title : {
            text: '故障种类分析',
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#7dd7f9'
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
                color: '#ccc'
              },
              data:datelist
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
                  data:datalist
              }
          ]
      }
      brokeAnalysisChars.setOption(option)
    },
    getLoseInfoAnalysisDataPar(datalist,datelist) {
      const brokeAnalysisChars = echarts.init(document.getElementById('loseInfoAnalysis'))
      const option = {
          title : {
            text: '失联种类分析',
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#7dd7f9'
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
                color: '#ccc'
              },
              data:datelist
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
                  data:datalist
              }
          ]
      }
      brokeAnalysisChars.setOption(option)
    },
    getDengZhiList() {
      let params = {
        fetchUrl: '/sys/product/list',
        listQuery: {}
      }
      this.$store.dispatch('GetList', params).then(res => {
        var list = res.data.datas
        console.log('****灯质汇总********',list)
        if(list.length>0){
          this.terminalList = []  
          var firstList=[]
          for(let i = 0; i <list.length; i++) {
            this.terminalList.push(list[i].name)
            var itemlist={
              id:list[i].name,
              name:list[i].id
            }
            firstList.push(itemlist)
          }
          firstList.map((item)=>this.terminalAllList[item.id] = item.name)
          console.log("this.terminalAllList---",this.terminalAllList)
        }
      })
    },
    getArea() {
      let params = {
        fetchUrl: '/sys/areas/dlist',
        listQuery: {
          'level':'1',
          "province":'2',
          "city":'0'
        }
      }
      this.$store.dispatch('GetList', params).then(res => {
        var list = res.data
        console.log("省shi数据：",list)
        this.proviceList = Object.keys(list)
        this.areaAllList = list
         if(this.selectedProvice != ""){
          this.areaList = Object.keys(this.areaAllList[this.selectedProvice])
        }
        console.log("省数据：",this.proviceList)
      })
    },
    getAreaList() {
      var list = this.areaAllList[this.selectedProvice]
      var items = Object.keys(list)
      this.areaList = items
      this.selectedArea = this.areaList[0]
    },
    setQuest(){
      this.listQuery.year = this.selectedYear
      this.listQuery.month = this.selectedMonth
      // this.listQuery.day = this.selectedDate
      this.listQuery.city =  this.selectedArea
      this.listQuery.province = this.selectedProvice
      if(this.selectedTerminal != ""){
         this.listQuery.productId = this.terminalAllList[this.selectedTerminal]
      }
      console.log("this.listQuery:",this.listQuery)
      
      this.getTeminaDatas(this.listQuery)//终端数据分析数据
      this.getBrokeAnalysisDatas(this.listQuery)//故障数据分析
      this.getLoseInfoAnalysisData(this.listQuery)//失联种类分析
      this.getMonthData(this.listQuery)//月度数据分析
      this.unnomalListData(this.listQuery)//异常日志分析
    },
    searchAll(){
      this.setQuest()
    },
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/data-analysis.scss';
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
