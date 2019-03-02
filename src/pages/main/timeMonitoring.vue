<template>
  <div class="monitoring_page" ref="monitoring">
    <div class="header">
      <div class="header_left">
        <!-- <span class="_head_line">
        </span> -->
        <div class="left_three_btn">
          <div class="monitoring_btn active">
            实时监控
          </div>
          <div class="monitoring_btn">
            数据统计
          </div>
          <div class="monitoring_btn">
            数据分析
          </div>
        </div>
      </div>
      <div class="header_center">
        湖南湘旭物联网平台数据统计
      </div>
      <div class="header_right">
        <div class="right_two_btn">
          <div class="monitoring_btn">
            系统管理
          </div>
          <div class="monitoring_btn">
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
        <div class="_left">
          ◆ 总采集数据量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;123  条
        </div>
        <div class="_center">
          ◆ 系统终端数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;235  条
        </div>
        <div class="_right">
          ◆ 平均太阳能电压&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          13.5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ◆ 平均电池电压&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11.5
        </div>
      </div>
      <div class="echart_content">
        <div class="full_left_container">
          <!-- 左侧全部信息 -->
          <div class="_left_top">
            <div class="statistics_container">
              <!--终端分类统计&◆ 终端状态比例 ◆ -->
              <div class="statistics_classification" id="countRange">
                <!-- 终端分类统计 -->
              </div>
              <div class="statistics_status" id="countStatus">
                <!-- ◆ 终端状态比例 ◆ -->
              </div>
            </div>
            <div class="platform_distribution" id="platformCount">
              <!-- 平台数据分布 -->
            </div>
          </div>
          <div class="_left_bottom monitoring_list">
            <!-- 监控列表 -->
            监控列表
          </div>
        </div>
        <div class="full_right_container alarm_information">
          <!-- 告警信息 -->
            告警信息
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'
export default {
  name: 'monitoring',
  components: {
  },
  data() {
    return {
      clientHeight: '',
      dateTime: moment().format('YYYY.MM.DD')
    }
  },
  created() {
  },
  mounted() {
    this.clientHeight = `${document.documentElement.scrollTop+document.documentElement.clientHeight}`;
    window.onresize = function getCurHeight() {
      this.clientHeight = `${document.documentElement.scrollTop+document.documentElement.clientHeight}`;
    }
    this.statisticsClassification()
    this.statisticsStatus()
    this.platformCount()
  },
  watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  methods:{
    changeFixed(clientHeight){
      this.$refs.monitoring.style.height = clientHeight+'px';
    },
    statisticsClassification() {
      const countRangeEcharts = echarts.init(document.getElementById('countRange'));
      const options = {
          title : {
              text: '◆ 终端分类统计 ◆',
              x:'center',
              textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#FFDE29'
            },

          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              textStyle: {
                color: "#FFDE29",
                fontSize: 12
              },
              data:[
                '爆闪灯',
                '黄慢（闪）灯',
                '点阵式主动发光标志',
                '面阵式全透发光标志',
                '面阵式半透发光标志'
              ]
          },
          calculable : true,
          series : [
              {
                  name:'半径模式',
                  type:'pie',
                  radius : [10, 70],
                  center : ['50%', '40%'],
                  roseType : 'radius',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  lableLine: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  data:[
                      {value:10, name:'爆闪灯'},
                      {value:5, name:'黄慢（闪）灯'},
                      {value:15, name:'点阵式主动发光标志'},
                      {value:25, name:'面阵式全透发光标志'},
                      {value:20, name:'面阵式半透发光标志'}
                  ]
              }
          ]
      }
      countRangeEcharts.setOption(options)
    },
    statisticsStatus(){
      const countStatusEcharts = echarts.init(document.getElementById('countStatus'));
      const options = {
          color: ['#7C6FB0', '#F08519', '#62C3D0'],
          title : {
            text: '◆ 终端状态比例 ◆',
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#FFDE29'
            }
          },
          legend: {
              orient: 'horizontal',
              x: 'center',
              bottom: '10',
              textStyle: {
                color: "#FFDE29",
                fontSize: 12
              },
              data:['正常','异常','离线']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:335, name:'正常'},
                      {value:310, name:'异常'},
                      {value:234, name:'离线'}
                  ]
              }
          ]
      }
      countStatusEcharts.setOption(options)
    },
    randomData() {  
     return Math.round(Math.random()*500);  
    },
    platformCount () {
      const platformCountEcharts = echarts.init(document.getElementById('platformCount'));
      const mydata = [
        {name: '北京',value: '100' },{name: '天津',value: this.randomData() },  
        {name: '上海',value: this.randomData() },{name: '重庆',value: this.randomData() },  
        {name: '河北',value: this.randomData() },{name: '河南',value: this.randomData() },  
        {name: '云南',value: this.randomData() },{name: '辽宁',value: this.randomData() },  
        {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },  
        {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },  
        {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },  
        {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },  
        {name: '湖北',value: this.randomData() },{name: '广西',value: this.randomData() },  
        {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },  
        {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },  
        {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },  
        {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },  
        {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },  
        {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },  
        {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },  
        {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }  
      ];
      var optionMap = {
        // color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea'],
        title: {  
            text: '◆ 平台数据分布 ◆',  
            subtext: '',  
            x:'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#FFDE29'
            }
        },  
        tooltip : {  
            trigger: 'item'  
        },
          visualMap: {
            show : true, 
            bottom: '10', 
            y: 'center',  
            text: [   
                "正常","异常","离线"
            ],  
            color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']  
        },
        //配置属性
        series: [{  
            name: '数据',  
            type: 'map',  
            mapType: 'china',   
            roam: true,  
            label: {  
                normal: {  
                    show: true  //省份名称  
                },  
                emphasis: {  
                    show: false  
                }  
            },  
            data:mydata  //数据
        }]  
      };  
      //使用制定的配置项和数据显示图表
      platformCountEcharts.setOption(optionMap);
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/time-monitoring.scss';
</style>
