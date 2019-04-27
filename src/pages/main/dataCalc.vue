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
          <div class="monitoring_btn active"  @click="openDataCalc()">
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
          <div class="monitoring_btn" @click="openDeviceManage()">
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
        <div class="select_items select_items_date">
          <div class="label_item">
            日期：
          </div>
          <div class="select_input">
            <multiselect
              :allow-empty="false"
              selectLabel=""
              selectGroupLabel=""
              deselectLabel=""
              selectedLabel=""
              placeholder="日期"
              v-model="selectedDate"
              :options="DateList">
            </multiselect>
          </div>
        </div>
        <div class="select_items select_items_area" style="margin-left:-20px">
          <div class="label_item">
            区域(省)：
          </div>
          <el-select v-model="selectedProvice"  style="width:90px" placeholder="请选择" @change="getAreaList();">
            <el-option v-for="item in proviceList" :key="item.value" :label="item.label" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="select_items select_items_area">
          <div class="label_item">
            区域(市)：
          </div>
           <div class="select_input">
            <el-select v-model="selectedArea" style="width:90px"  placeholder="请选择">
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
              placeholder=""
              v-model="selectedTerminal"
              :options="terminalList">
            </multiselect>
          </div>
        </div>
        <div class="submit_btn" @click="searchAll()">
          确认
        </div>
      </div>
      <div class="echarts_container">
        <div class="echarts_left_three">
          <div class="top_frist_row">
            <div class="row_one">
              <div class="sun_month" id="sunMonth">
                <!-- ◆ 太阳能电压分析 ◆月度 -->
              </div>
            </div>
            <div class="row_two">
              <div class="sun_yesterday" id="sunYesterday">
                <!-- ◆ 太阳能电压分析 ◆昨日 -->
              </div>
            </div>
          </div>
          <div class="top_frist_row">
            <div class="row_one">
              <div class="sun_month" id="chargeMonth">
                <!-- ◆ 太阳能电压分析 ◆月度 -->
              </div>
            </div>
            <div class="row_two">
              <div class="sun_yesterday" id="chargeYesterday">
                <!-- ◆ 太阳能电压分析 ◆昨日 -->
              </div>
            </div>
          </div>
          <div class="top_frist_row">
            <div class="row_one">
              <div class="sun_month" id="tempCalc">
                <!-- ◆ 太阳能电压分析 ◆月度 -->
              </div>
            </div>
            <div class="row_two">
              <div class="sun_yesterday" id="tempCalcYesterday">
                <!-- ◆ 太阳能电压分析 ◆昨日 -->
              </div>
            </div>
          </div>
        </div>
        <div class="echarts_right_two">
          <div class="big_data_calc">
            <!-- 数据汇总 -->
            <div class="_title">
              ◆数据汇总◆
            </div>
            <table class="table_list">
              <tr>
                <th>该类终端总数</th>
                <th colspan="3">{{allSourceData.numCount}}</th>
              </tr>
              <tr>
                <td>该月/日太阳能最高电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.highSolarVolt}}</td>
              </tr>
              <tr>
                <td>该月/日太阳能最低电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.lowSolarVolt}}</td>
              </tr>
              <tr>
                <td>该月/日电池最高电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.highBtteryVolt}}</td>
              </tr>
              <tr>
                <td>该月/日电池最低电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.lowBtteryVolt}}</td>
              </tr>
              <tr>
                <td>该月/日最高温度</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.highTemperature}}</td>
              </tr>
              <tr>
                <td>该月/日最低温度</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>{{allSourceData.lowTemperature}}</td>
              </tr>
            </table>
          </div>
          <div class="top_frist_row">
            <div class="row_one">
              <div class="sun_month" id="signCalc">
                <!-- ◆ 太阳能电压分析 ◆月度 -->
              </div>
            </div>
            <div class="row_two">
              <div class="sun_yesterday" id="signCalcYesterday">
                <!-- ◆ 太阳能电压分析 ◆昨日 -->
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
      hoursList: [],
      hoursData: [],
      selectedDate: new Date().getDate(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      selectedProvice:"湖南省",
      selectedArea: "长沙市",
      proviceList: [],
      areaAllList:{},
      areaList: [],
      selectedTerminal: '爆闪灯',
      terminalList: ['爆闪灯','黄慢（闪）灯', '点阵式主动发光标志','面阵式全透发光标志' ,'面阵式半透发光标志'],
      terminalAllList:[],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
      listQuery:{
        "year": "",
        "month": "",
        "day": "",
        "cityName": "",
        "productId": "",
        "type": 1,
        "cycle": 1
      },
      //所有
      allData:{},
      allSourceData:{
          "numCount": 10,
          "highSolarVolt": 10,
          "highSolarVoltTime": 1456151230,
          "lowSolarVolt": 10,
          "lowSolarVoltTime": 1456151230,
          "highBtteryVolt": 20,
          "highBtteryVoltTime": 45546,
          "lowBtteryVolt": 20,
          "lowBtteryVoltTime": 45546,
          "highTemperature": 24,
          "highTemperatureTime": 24,
          "lowTemperature": 4,
          "lowTemperatureTime": 48879879
        }
    }
  },
  created() {
    for(let i = 2000; i <= 2050; i++) {
      this.yearsList.push(i)
    }
    for(let j = 1; j <= 24;j++){
      this.hoursList.push(j)
      this.hoursData.push(Math.round(Math.random()*20))
    }
    this.isFebMonthData()
    this.getDengZhiList()
    this.getArea()
  },
  mounted() {
    this.setQuest()
  },
  methods:{
    getAllData(listQuery){
      let _this = this
      let eleId = ''
      let title = ''
      let label = ''
      for(let j=1;j<3;j++){
        for(let i=1;i<5;i++){
          listQuery.type=i
          let params = {
            fetchUrl: '/sys/count/temperatureCount',
            listQuery: listQuery
          }
          this.$store.dispatch('GetList', params).then(res => {
            console.log('****33**********',res.data)
            if(j==1){//月
                label= '月度'
                if(i==1){
                  eleId="tempCalc"
                  title= '◆ 温度统计 ◆'
                }else if(i==2){
                  eleId="signCalc"
                  title= '◆ 信号统计 ◆'
                }else if(i==3){
                  eleId="sunMonth"
                  title= '◆ 太阳能电压分析 ◆'
                }else if(i==4){
                  eleId="chargeMonth"
                  title= '◆ 电池电压统计 ◆'
                }
                if((res.data).length>0){
                  _this.allData = res.data
                }else{
                  _this.allData = _this.dateData
                }
                let params = {
                  eleId:eleId,
                  timeData: _this.DateList,
                  data: _this.allData,
                  title: title,
                  label: label
                }
                _this.getMonthAndDateData(params)
            }else{//日
                label=moment().subtract(1, 'day').format('YYYY.MM.DD')
                if(i==1){
                  eleId="tempCalcYesterday"
                  title= '昨日◆ 温度统计 ◆'
                }else if(i==2){
                  eleId="signCalcYesterday"
                  title= '昨日◆ 信号统计 ◆'
                }else if(i==3){
                  eleId="sunYesterday"
                  title='昨日◆ 太阳能电压分析 ◆'
                }else if(i==4){
                  eleId="chargeYesterday"
                  title='昨日◆ 电池电压统计 ◆'
                }
                if((res.data).length>0){
                  _this.allData = res.data
                }else{
                  _this.allData = _this.hoursData
                }
                let params2 = {
                  eleId:eleId,
                  xAxisData: _this.hoursList,
                  seriesData: _this.allData,
                  title: title,
                  label: label
                }
                _this.getSignAndTempData(params2)
            }
          })
        }
      }
    },
    getDengZhiList() {
      let params = {
        fetchUrl: '/sys/product/list',
        listQuery: {}
      }
      this.$store.dispatch('GetList', params).then(res => {
        var list = res.data.datas
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
        }
      })
    },
    getAllSourceList(listQuery) {
      let params = {
        fetchUrl: '/sys/count/dataSummary',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        if(data.numCount>0){
          this.allSourceData = data
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
        this.areaList = Object.keys(this.areaAllList[this.selectedProvice])
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
      // this.listQuery.year = this.selectedYear
      // this.listQuery.month = this.selectedMonth
      // this.listQuery.day = this.selectedDate
      // this.listQuery.cityName =  this.selectedArea
      // this.listQuery.productId = this.terminalAllList[this.selectedTerminal]
      this.listQuery.year = this.selectedYear
      this.listQuery.month = this.selectedMonth
      this.listQuery.day = this.selectedDate
      this.listQuery.city =  this.selectedArea
      this.listQuery.province = this.selectedProvice
      this.listQuery.productId = this.terminalAllList[this.selectedTerminal]
      if(!this.listQuery.productId) this.listQuery.productId=1001
      
      this.getAllData(this.listQuery)
      this.getAllSourceList(this.listQuery)

    },
    searchAll(){
      this.setQuest()
    },
    isFebMonthData() {
      let curMonth = this.selectedMonth
      let curYear = this.selectedYear
      if (curMonth === 2) {
        if (curYear%4 === 0) {
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
        this.makeDateListData()
      }
    },
    openMonitoring() {
      this.$router.push('main')
    },
    openDataCalc() {
      this.$router.push('dataCalc')
    },
    openSystemManage() {
      this.$router.push('systemManage')
    },
    openDeviceManage() {
      this.$router.push('deviceManage')
    },
    openDataAnalysis() {
      this.$router.push('dataAnaysis')
    },
    chooseYear(year) {
      this.selectedYear = year
      this.makeDateListData()
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
    chooseMonth(val) {
      this.selectedMonth = val
      this.makeDateListData()
    },
    getMonthAndDateData(params){
      // 太阳能电压&&电池电压公共方法
      const sunMonthEchart = echarts.init(document.getElementById(params.eleId));
      const option = {
        title: {
          text: params.title,
          subtext: params.label,
          x:'center',
          textStyle: {
            fontSize: 12,
            color: '#7dd7f9',
            rich: {
              align: 'center'
            }
          }
        },
          color: ['#083775'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              axisLine: {
                lineStyle: {
                    color:'#fff'
                }
              },
              data : params.timeData,
              axisTick: {
                  alignWithLabel: true
              }
            }
          ],
          yAxis : [
              {
                type : 'value',
                axisLine: {
                  lineStyle: {
                      color:'#fff'
                  }
                },
              }
          ],
          series : [
              {
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',
                  data:params.data
              }
          ]
      }
      sunMonthEchart.setOption(option)
    },
    getSignAndTempData(params) {
      // 信号和温度公共方法
      const signTempEchart = echarts.init(document.getElementById(params.eleId));
      const option = {
          title: {
          text: params.title,
          subtext: params.label,
          x:'center',
          textStyle: {
            fontSize: 12,
            color: '#7dd7f9',
            rich: {
              align: 'center'
            }
          }
        },
          color: ['#FFDE29'],
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: params.xAxisData,
            axisLine: {
              lineStyle: {
                color:'#fff'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color:'#fff'
              }
              },
          },
          series: [
              {
                  name:'',
                  type:'line',
                  stack: '总量',
                  data:params.seriesData
              }
          ]
      }
      signTempEchart.setOption(option)
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/data-calc.scss';
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
