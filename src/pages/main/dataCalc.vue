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
                <th colspan="3">8</th>
              </tr>
              <tr>
                <td>该月/日太阳能最高电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
              </tr>
              <tr>
                <td>该月/日太阳能最低电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
              </tr>
              <tr>
                <td>该月/日电池最高电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
              </tr>
              <tr>
                <td>该月/日电池最低电压</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
              </tr>
              <tr>
                <td>该月/日最高温度</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
              </tr>
              <tr>
                <td>该月/日最低温度</td>
                <td>正常</td>
                <td>出现时间</td>
                <td>13</td>
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
      selectedArea: "长沙市",
      areaList: ['长沙市', '浏阳市', '株洲市', '宁乡市'],
      selectedTerminal: '爆闪灯',
      terminalList: [],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
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

   // 获取接口数据开始
   this.getDengZhiList()

  },
  mounted() {
    let sunMonthParams = {
      eleId:'sunMonth',
      timeData: this.DateList,
      data: this.dateData,
      title: '◆ 太阳能电压分析 ◆',
      label: '月度'
    }
    let sunHoursParams = {
      eleId:'sunYesterday',
      timeData: this.hoursList,
      data: this.hoursData,
      title: '昨日◆ 太阳能电压分析 ◆',
      label: moment().subtract(1, 'day').format('YYYY.MM.DD')
    }
    let chargeMonthParams = {
      eleId:'chargeMonth',
      timeData: this.DateList,
      data: this.dateData,
      title: '◆ 电池电压统计 ◆',
      label: '月度'
    }
    let chargeHoursParams = {
      eleId:'chargeYesterday',
      timeData: this.hoursList,
      data: this.hoursData,
      title: '昨日◆ 电池电压统计 ◆',
      label: moment().subtract(1, 'day').format('YYYY.MM.DD')
    }
    this.getMonthAndDateData(sunMonthParams)
    this.getMonthAndDateData(sunHoursParams)
    this.getMonthAndDateData(chargeHoursParams)
    this.getMonthAndDateData(chargeMonthParams)

    let tempCalcParams = {
      eleId:'tempCalc',
      xAxisData: this.DateList,
      seriesData: this.dateData,
      title: '◆ 温度统计 ◆',
      label: '月度'
    }
    let tempCalcYesterdayParams = {
      eleId:'tempCalcYesterday',
      xAxisData: this.hoursList,
      seriesData: this.hoursData,
      title: '昨日◆ 温度统计 ◆',
      label: moment().subtract(1, 'day').format('YYYY.MM.DD')
    }
    let signCalcParams = {
      eleId:'signCalc',
      xAxisData: this.DateList,
      seriesData: this.dateData,
      title: '◆ 信号统计 ◆',
      label: '月度'
    }
    let signCalcYesterdayParams = {
      eleId:'signCalcYesterday',
      xAxisData: this.hoursList,
      seriesData: this.hoursData,
      title: '昨日◆ 信号统计 ◆',
      label: moment().subtract(1, 'day').format('YYYY.MM.DD')
    }
    this.getSignAndTempData(tempCalcParams)
    this.getSignAndTempData(tempCalcYesterdayParams)
    this.getSignAndTempData(signCalcParams)
    this.getSignAndTempData(signCalcYesterdayParams)
  },
  methods:{
    getDengZhiList() {
      let params = {
        fetchUrl: '/sys/product/list',
        listQuery: {
          page: 1,
          pageSize: 10000
        }
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.terminalList = res.data.datas
        // console.log('res.data.datasres.data.datasres.data.datas', res.data.datas)
        // this.pageLightSum = Math.ceil(res.data.total/this.listLightQuery.pageSize)
      })
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
