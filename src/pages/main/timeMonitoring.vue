<template>
  <div class="monitoring_page" ref="monitoring">
    <div class="header">
      <div class="header_left">
        <!-- <span class="_head_line">
        </span> -->
        <div class="left_three_btn">
          <div class="monitoring_btn active" @click="openMonitoring()">
            实时监控
          </div>
          <div class="monitoring_btn" @click="openDataCalc()">
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
            <div class="table_title">
              ◆ 监控列表 ◆ 
            </div>
            <table class="table_list">
              <tr>
                <th>终端名称</th>
                <th>信号强度</th>
                <th>太阳能电压</th>
                <th>电池电压</th>
                <th>温 度 </th>
                <th>光照度</th>
                <th>终端状态</th>
                <th style="padding: 0 30px">操作</th>
              </tr>
              <tr>
                <td>黄（慢）闪灯</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>太阳能点阵式标志</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>面阵式半透型主动发光标志</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>面阵式全透型主动发光标志</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>爆闪灯</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>爆闪灯</td>
                <td>正常</td>
                <td>12</td>
                <td>13</td>
                <td>22</td>
                <td>100</td>
                <td>正常</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record">
                      报警记录
                    </div>
                    <div class="history_data">
                      历史数据
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="full_right_container alarm_information">
          <!-- 告警信息 -->
          <div class="head_title">
             ◆ 告警信息 ◆ 
          </div>
          <div class="alarm_info">
            <!-- 中间告警信息 -->
            <div class="circle">
              <div class="big" style="left: 30px;border: 5px solid #E60012;border-bottom: none;color: #E60012">告警信息</div>
              <div class="small" style="left: 25px">5条</div>
            </div>
            <div class="circle">
              <div class="big" style="right: 30px;border: 5px solid #AC2FB1;border-bottom: none;color: #AC2FB1">失联信息</div>
              <div class="small" style="right: 25px">10条</div>
            </div>
          </div>
          <div class="alarm_list">
            <!-- 告警列表 -->
            <div class="alarm_item" v-for="(item, index) in alarmList" :key="index"> 
              <div class="alarm_address_time">
                <div class="_address">
                  告警地点
                </div>
                <div class="_time">
                  {{item.time}}
                </div>
              </div>
              <div class="address_detail">
                  {{item.address}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;

//记录父级ID、Name
var mapStack = [];
var parentId = null;
var parentName = null;

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null;
import axios from 'axios'
import moment from 'moment'
import echarts from 'echarts'
import cityMap from "@/assets/js/china-main-city-map.js";
// const china = require('../../../public/json/china.json') 
export default {
  name: 'monitoring',
  components: {
  },
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      alarmList: [
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },{
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },{
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },{
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },{
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },
        {
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        },{
          address: '湖南省长沙市岳麓区梅溪湖街道步步高新天地120号',
          time: moment().format('YYYY.MM.DD')
        }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.statisticsClassification()
    this.statisticsStatus()
    this.platformCount('platformCount')
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
    async platformCount(divid) {
      // './json/china.json'
      let that = this
      axios.get("./json/" + chinaId + ".json", {}).then(response => {
        const mapJson = response.data;
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById(divid));
        this.registerAndsetOption(myChart, chinaId, chinaName, mapJson, false);
        parentId = chinaId;
        parentName = "china";
        myChart.on("click", function(param) {
          var cityId = cityMap[param.name];
          if (cityId) {
            //代表有下级地图
            axios
              .get("./json/" + cityId + ".json", {})
              .then(response => {
                const mapJson = response.data;
                that.registerAndsetOption(
                  myChart,
                  cityId,
                  param.name,
                  mapJson,
                  true
                );
              });
          } else {
            //没有下级地图，回到一级中国地图，并将mapStack清空
            that.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
            mapStack = [];
            parentId = chinaId;
            parentName = chinaName;
          }
        });
      });
    },
    registerAndsetOption(myChart, id, name, mapJson, flag) {
        echarts.registerMap(name, mapJson);
        const optionsParams = {
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
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var res = params.name+'<br/>';
                var myseries = optionsParams.series;
                for (var i = 0; i < myseries.length; i++) {
                    for(var j=0;j<myseries[i].data.length;j++){
                        if(myseries[i].data[j].name==params.name){
                            res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';
                        }
                    }
                }
                return res;
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
        
          series : [
              {
                  name: '正常',
                  type: 'map',
                  mapType: 'china',
                  roam: false,
                  itemStyle: {
                    normal: {
                        label: {
                          show: true,//默认是否显示省份名称 
                          textStyle: {
                            color: "#fff"
                          },   
                        },
                        color:'#1fa022',
                        areaColor: '#21262b',
                        borderWidth:1,
                        borderColor:'#aca62f',
                    },
                    emphasis: {
                        show: true,
                        areaColor: '#1fa022'
                    }
                  },
                  data:this.initMapData(mapJson)
              },
              // {
              //     name: '异常',
              //     type: 'map',
              //     mapType: 'china',
              //     roam: false,
              //     itemStyle: {
              //       normal: {
              //           label: {
              //             show: true,//默认是否显示省份名称
              //             textStyle: {
              //               color: "#fff"
              //             },  
              //           },
              //           color:'#e6212a',
              //           areaColor: '#21262b',
              //           textStyle: {
              //             color: "#fff"
              //           },
              //           borderWidth:1,
              //           borderColor:'#aca62f',
              //       },
              //       emphasis: {
              //             show: true,
              //             areaColor: '#e6212a',
              //       }
              //     },
              //     data: this.initMapData(mapJson)
              // },
              // {
              //     name: '离线',
              //     type: 'map',
              //     roam: false,
              //     mapType: 'china',
              //     itemStyle: {
              //       normal: {
              //           color: '#848484',
              //           areaColor: '#21262b',
              //           label: {
              //             show: true,//默认是否显示省份名称
              //             textStyle: {
              //               color: "#fff"
              //             },    
              //           },
              //           borderWidth:1,
              //           borderColor:'#aca62f',
              //       },
              //       emphasis: {
              //           show: true,
              //           areaColor: '#848484'
              //       }
              //     },
              //     data:this.initMapData(mapJson)
              // }
          ]
      };
      myChart.setOption(optionsParams)
        myChart.setOption({
          series: [
            {
              type: "map",
              map: name,
              itemStyle: {
                normal: {
                  areaColor: "rgba(23, 27, 57,0)",
                  borderColor: "#1dc199",
                  borderWidth: 1
                }
              },
              data: this.initMapData(mapJson)
            }
          ]
        });

        if (flag) {
          //往mapStack里添加parentId，parentName,返回上一级使用
          mapStack.push({
            mapId: parentId,
            mapName: parentName
          });
          parentId = id;
          parentName = name;
        }
      },
    initMapData(mapJson) {
      var mapData = [];
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name
          //id:mapJson.features[i].id
        });
      }
      return mapData;
    },
    async platformCount111() {
     let china = await axios.get('./json/100000.json')
    //  let china = await axios.get('./json/china.json')
      echarts.registerMap('china', china.data);
      const platformCountEcharts = echarts.init(document.getElementById('platformCount'));
      const optionsParams = {
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
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var res = params.name+'<br/>';
                var myseries = optionsParams.series;
                for (var i = 0; i < myseries.length; i++) {
                    for(var j=0;j<myseries[i].data.length;j++){
                        if(myseries[i].data[j].name==params.name){
                            res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';
                        }
                    }
                }
                return res;
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
        
          series : [
              {
                  name: '正常',
                  type: 'map',
                  mapType: 'china',
                  roam: false,
                  itemStyle: {
                    normal: {
                        label: {
                          show: true,//默认是否显示省份名称 
                          textStyle: {
                            color: "#fff"
                          },   
                        },
                        color:'#1fa022',
                        areaColor: '#21262b',
                        borderWidth:1,
                        borderColor:'#aca62f',
                    },
                    emphasis: {
                        show: true,
                        areaColor: '#1fa022'
                    }
                  },
                  data:[
                      {name: '天津',value: 2},
                      {name: '安徽',value: 3},
                      {name: '山东',value: 3},
                      {name: '新疆',value: 3},
                      {name: '陕西',value: 3},
                      {name: '北京',value: 3}
                  ]
              },
              {
                  name: '异常',
                  type: 'map',
                  mapType: 'china',
                  roam: false,
                  itemStyle: {
                    normal: {
                        label: {
                          show: true,//默认是否显示省份名称
                          textStyle: {
                            color: "#fff"
                          },  
                        },
                        color:'#e6212a',
                        areaColor: '#21262b',
                        textStyle: {
                          color: "#fff"
                        },
                        borderWidth:1,
                        borderColor:'#aca62f',
                    },
                    emphasis: {
                          show: true,
                          areaColor: '#e6212a',
                    }
                  },
                  data:[
                      {name: '河北',value: 3},
                      {name: '安徽',value: 3},
                      {name: '吉林',value: 3},
                      {name: '福建',value: 3}
                  ]
              },
              {
                  name: '离线',
                  type: 'map',
                  roam: false,
                  mapType: 'china',
                  itemStyle: {
                    normal: {
                        color: '#848484',
                        areaColor: '#21262b',
                        label: {
                          show: true,//默认是否显示省份名称
                          textStyle: {
                            color: "#fff"
                          },    
                        },
                        borderWidth:1,
                        borderColor:'#aca62f',
                    },
                    emphasis: {
                        show: true,
                        areaColor: '#848484'
                    }
                  },
                  data:[
                      {name: '北京',value: 3},
                      {name: '香港',value: 3}
                  ]
              }
          ]
      };
      //使用制定的配置项和数据显示图表
      platformCountEcharts.setOption(optionsParams);
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/time-monitoring.scss';
</style>
