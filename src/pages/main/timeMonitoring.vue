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
          ◆ 总采集数据量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{totalCountObj.totalCount}}  条
        </div>
        <div class="_center">
          ◆ 系统终端数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{totalCountObj.sysCount}}  条
        </div>
        <div class="_right">
          ◆ 平均太阳能电压&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{totalCountObj.avgSolarVolt}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ◆ 平均电池电压&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{totalCountObj.avgBatteryVolt}}
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
            <div class="platform_distribution">
              <div class="platform_button">
                <div class="back_behide_page"><button @click="backOnePage()">返回上一级</button></div>
                <div class="back_index_page" @click="backIndexPage"><button>返回首层</button></div>
              </div>
               <div class="platform_charts" id="platformCount">
                <!-- 平台数据分布 -->
              </div>
              <div v-if="isShowMap" class="amap-wrapper">
                <el-amap class="amap-box" :vid="'amap-vue'" :center="curPositionData">
                  <el-amap-info-window
                    :position="currentWindow.position"
                    :content="currentWindow.content"
                    :visible="currentWindow.visible"
                    :events="currentWindow.events">
                  </el-amap-info-window>
                  <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->
                </el-amap>
              </div>
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
              <tr v-for="item in monitoringList" :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.gsm}}</td>
                <td>{{item.solarVolt}}</td>
                <td>{{item.batteryVolt}}</td>
                <td>{{item.temperature}}</td>
                <td>{{item.temperature}}</td>
                <td>{{statusMap[item.status]}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="_record" @click="goAlarmRecordList(item)">
                      报警记录
                    </div>
                    <div class="history_data" @click="goRecordList(item)">
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
            <div class="circle" @click="changeAlarmList(2)">
              <div class="big" style="left: 30px;border: 5px solid #E60012;border-bottom: none;color: #E60012">告警信息</div>
              <div class="small" style="left: 25px">{{alarmInfoList.length}}条</div>
            </div>
            <div class="circle" @click="changeAlarmList(3)">
              <div class="big" style="right: 30px;border: 5px solid #AC2FB1;border-bottom: none;color: #AC2FB1">失联信息</div>
              <div class="small" style="right: 25px">{{alarmInfoList.length}}条</div>
            </div>
          </div>
          <div class="alarm_list">
            <!-- 告警列表 -->
            <div class="alarm_item" v-for="(item, index) in alarmInfoList" :key="index"> 
              <div class="alarm_address_time">
                <div class="_address">
                  告警地点
                </div>
                <div class="_time">
                  {{moment(item.createTime).format("YYYY-MM-DD")}}
                </div>
              </div>
              <div class="address_detail" @click="goToMap(item.location)">
                  {{item.province+item.city+item.county+item.address || "暂无地址或地址不详"}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="`${statusType}详细记录`" :visible.sync="checkDetailVisible">
      <el-form :model="detailInfo" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="`${statusType}类型`">
          <span>{{ statusTypeMap[detailInfo.type]}}</span>
      </el-form-item>
      <el-form-item label="详情">
          <span>{{ detailInfo.edescs}}</span>
      </el-form-item>
      <el-form-item label="地理位置">
          <span>{{detailInfo.longitude}}</span>
          <span>{{detailInfo.latitude}}</span>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkDetailSubmit">关闭</el-button>
      </div>
    </el-dialog>
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
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import echarts from "echarts";
import cityMap from "@/assets/js/china-main-city-map.js";
import { lazyAMapApiLoaderInstance } from "vue-amap";
// const china = require('../../../public/json/china.json')
export default {
  name: "monitoring",
  components: {},
  data() {
    return {
      currentWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false
      },
      dateTime: moment().format("YYYY.MM.DD"),
      threeStatusData: [],
      alarmList: [
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        },
        {
          address: "湖南省长沙市岳麓区梅溪湖街道步步高新天地120号",
          time: moment().format("YYYY.MM.DD")
        }
      ],
      moment,
      statusMap: {
        1: "正常",
        2: "异常",
        3: "离线"
      },
      statusTypeMap: {
        1: "正常",
        2: "告警",
        3: "失联"
      },
      checkDetailVisible: false,
      statusType: "报警",
      detailInfo: {
        type: 1,
        edescs: "",
        location: "{'longitude':123.123123,'latitude':234.123123}",
        craeteTime: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      isShowMap: false,
      totalCountObj: {},
      kindsCountList: [],
      monitoringList: [],
      listMoniQuery: {
        page: 1,
        pageSize: 10
      },
      listAlarmInfoQuery: {
        page: 1,
        pageSize: 1000,
        type: 2 //类型（1-正常，2告警，3-失联）
      },
      curPositionData: [121.5273285, 31.21515044],
      alarmInfoList: []
    };
  },
  created() {},
  mounted() {
    this.getMonitoringTotalCount();
    this.statisticsClassification();
    this.getMonitoringList();
    this.statisticsStatus();
    this.getAlarmInfoList();
    this.platformCount("platformCount");
  },
  methods: {
    goToMap(item){
      this.isShowMap = true;
      this.currentWindow = {
        position: [item.longitude, item.latitude],
        content: '11111',
        events: {},
        size: 100,
        visible: true
      };
      
    },
    backIndexPage() {
      this.isShowMap = false;
      this.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
      mapStack = [];
      parentId = chinaId;
      parentName = chinaName;
    },
    backOnePage() {
      this.isShowMap = false;
      if (mapStack.length != 0) {
        //如果有上级目录则执行
        var map = mapStack.pop();
        axios.get("./json/" + map.mapId + ".json", {}).then(response => {
          const mapJson = response.data;
          this.registerAndsetOption(
            myChart,
            map.mapId,
            map.mapName,
            mapJson,
            false
          );
          //返回上一级后，父级的ID、Name随之改变
          parentId = map.mapId;
          parentName = map.mapName;
        });
      }
    },
    goAlarmRecordList(item) {
      this.statusType = "报警";
      this.detailInfo = item[0] || this.detailInfo;
      this.checkDetailVisible = true;
    },
    goRecordList(item) {
      this.statusType = "历史数据";
      this.detailInfo = item[0] || this.detailInfo;
      this.checkDetailVisible = true;
    },
    checkDetailSubmit() {
      this.checkDetailVisible = false;
    },
    getMonitoringList() {
      let params = {
        fetchUrl: "/sys/monitoring/monitoringList",
        listQuery: this.listMoniQuery
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.monitoringList = res.data.datas;
      });
    },
    changeAlarmList(type) {
      this.listAlarmInfoQuery.type = type;
      this.getAlarmInfoList();
    },
    getAlarmInfoList() {
      let params = {
        fetchUrl: "/sys/monitoring/alarmInfo",
        listQuery: this.listAlarmInfoQuery
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.alarmInfoList = res.data.datas;
        console.log('res========>>', res)
      });
    },
    // /sys/monitoring/alarmInfo
    // /sys/monitoring/monitoringList
    getMonitoringTotalCount() {
      let params = {
        fetchUrl: "/sys/monitoring/totalCount",
        listQuery: {}
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.totalCountObj = res.data;
      });
    },
    openMonitoring() {
      this.$router.push("main");
    },
    openDataCalc() {
      this.$router.push("dataCalc");
    },
    openDataAnalysis() {
      this.$router.push("dataAnaysis");
    },
    openSystemManage() {
      this.$router.push("systemManage");
    },
    openDeviceManage() {
      this.$router.push("deviceManage");
    },
    async statisticsClassification() {
      let params = {
        fetchUrl: "/sys/monitoring/kindsCount",
        listQuery: {}
      };
      const { data } = await this.$store.dispatch("GetList", params);
      let dataKeyList = data.map(item => item.productName);
      let dataValueList = data.map(item => item.num);
      let formatDataList = [];
      dataKeyList.forEach((key, index) =>
        formatDataList.push({ name: key, value: dataValueList[index] })
      );
      const countRangeEcharts = echarts.init(
        document.getElementById("countRange")
      );
      const options = {
        title: {
          text: "◆ 终端分类统计 ◆",
          x: "center",
          textStyle: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#FFDE29"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          textStyle: {
            color: "#FFDE29",
            fontSize: 12
          },
          data: dataKeyList
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [10, 70],
            center: ["50%", "40%"],
            roseType: "radius",
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
            data: formatDataList
          }
        ]
      };
      countRangeEcharts.setOption(options);
    },
    async statisticsStatus() {
      let params = {
        fetchUrl: "/sys/monitoring/proportionInfo",
        listQuery: {}
      };
      const { data } = await this.$store.dispatch("GetList", params);
      const countStatusEcharts = echarts.init(
        document.getElementById("countStatus")
      );
      const options = {
        color: ["#7C6FB0", "#F08519", "#62C3D0"],
        title: {
          text: "◆ 终端状态比例 ◆",
          x: "center",
          textStyle: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#FFDE29"
          }
        },
        legend: {
          orient: "horizontal",
          x: "center",
          bottom: "10",
          textStyle: {
            color: "#FFDE29",
            fontSize: 12
          },
          data: ["正常", "异常", "离线"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: data.type1, name: "正常" },
              { value: data.type2, name: "异常" },
              { value: data.type3, name: "离线" }
            ]
          }
        ]
      };
      countStatusEcharts.setOption(options);
    },
    randomData() {
      return Math.round(Math.random() * 500);
    },
    async getEveryCityData(type, cityName) {
      //type 1-所有省份数据，2-省数据,3-市数据
      // province
      let that = this;
      let params = {
        fetchUrl: "/sys/monitoring/platformInfo",
        listQuery: {
          type,
          province: type === 2 ? cityName : "",
          city: type === 3 ? cityName : "",
          county: type === 4 ? cityName : ""
        }
      };
      let data = await this.$store.dispatch("GetList", params);
      return data;
    },
    producePositionData(data) {
      let tempData = [];
      data.map(item =>
        item.children.map(ele =>
          tempData.push({
            value: [
              JSON.parse(ele.location).longitude,
              JSON.parse(ele.location).latitude,
              1
            ],
            name: ele.county,
            id: ele.id,
            status: ele.status
          })
        )
      );
      return tempData;
    },
    async platformCount(divid) {
      // './json/china.json'
      let that = this;
      let { data } = await this.getEveryCityData(1);
      let unFormatData = this.producePositionData(data);
      this.threeStatusData = _.groupBy(unFormatData, "status");
      axios.get("./json/" + chinaId + ".json", {}).then(response => {
        const mapJson = response.data;
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById(divid));
        this.registerAndsetOption(
          myChart,
          chinaId,
          chinaName,
          mapJson,
          false,
          this.allDatas
        );
        parentId = chinaId;
        parentName = "china";
        myChart.on("click", function(param) {
          var cityId = cityMap[param.name];
          if (cityId) {
            //代表有下级地图
            axios.get("./json/" + cityId + ".json", {}).then(response => {
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
            if (param.componentSubType === "scatter") {
              that.isShowMap = true;
              that.curPositionData = param.value;
              let postData = {
                fetchUrl: "/sys/device/info?id=" + param.data.id,
                listQuery: {
                  id: param.data.id
                }
              };
              that.$store.dispatch("GetDetail", postData).then(detail => {
                const detailData = detail.data;
                const element = 
                `<div class="modal_detail">
                  <div style="margin: -1px; padding: 1px;">
                    <div style="text-align:center;white-space:nowrap;margin:10px;">
                      <table style="border:1px solid #999;">
                        <tbody style="border:1px solid #999;">
                          <tr><td>所属机构</td><td colspan="3">全国&gt;&gt;二级管理&gt;&gt;三级管理&gt;&gt;老化架测试</td></tr>
                          <tr><td>终端识别号</td><td>9010210118070008</td><td>ICCID卡号</td><td>89860402101870571012</td></tr>
                          <tr><td>终端名称</td><td>test_3</td><td>终端通讯时间</td><td>2019-04-28 00:30:14.0</td></tr>   
                          <tr><td>当前坐标位置</td><td>28.3668,112.893</td><td>灯质模式</td><td>黄闪灯</td></tr>   
                          <tr><td>信号强度</td><td>24</td><td>终端备注</td><td>test_3</td></tr>   
                          <tr><td>安装单位</td><td>老化架</td><td>安装地点</td><td>老化架</td></tr>   
                          <tr><td>安装时间</td><td>2018-08-30 00:00:00.0</td><td>负责人</td><td>chen</td></tr>   
                          <tr><td>联系方式</td><td>123</td><td>支队联系方式</td><td>123</td></tr>   
                          <tr><td>电池类型</td><td>市电</td><td>太阳能电压</td><td>0.0</td></tr>   
                          <tr><td>电池电压</td><td>12.7</td><td>点阵/面阵</td><td>点阵</td></tr>   
                          <tr><td>运行模式</td><td>夏季模式</td><td>运行等级</td><td>1</td></tr>   
                          <tr><td>开始运行时间</td><td>2018-08-30 08:30:34.0</td><td>终端状态</td><td>正常</td></tr>
                          <tr><td>位移报警</td><td>正常</td><td>位移距离</td><td>0.3</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>`;
                that.currentWindow = {
                  position: param.value,
                  content: element,
                  events: {},
                  size: 10,
                  visible: true
                };
                console.log("detaildetaildetaildetail", detail);
              });
            }
          }
        });
      });
    },
    registerAndsetOption(myChart, id, name, mapJson, flag, allDatas) {
      echarts.registerMap(name, mapJson);
      myChart.setOption({
        title: {
          text: "◆ 平台数据分布 ◆",
          subtext: "",
          x: "center",
          textStyle: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#FFDE29"
          }
        },
        legend: {
          orient: "horizontal",
          x: "center",
          bottom: "10",
          textStyle: {
            color: "#FFDE29",
            fontSize: 12
          },
          data: ["正常", "异常", "离线"]
        },
        geo: {
          map: name,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            //未激活样式
            normal: {
              areaColor: "#323c48",
              borderColor: "red"
            },
            //激活样式
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            type: "map",
            map: name,
            itemStyle: {
              normal: {
                label: {
                  show: true, //默认是否显示省份名称
                  textStyle: {
                    color: "#fff"
                  }
                },
                areaColor: "rgba(23, 27, 57,0)",
                borderColor: "#1dc199",
                borderWidth: 1
              }
            },
            data: this.initMapData(mapJson)
          },
          {
            name: "正常",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "rect",
            data: this.threeStatusData[1] || [],
            symbolSize: 16,
            legend: {
              orient: "horizontal",
              x: "center",
              bottom: "10",
              textStyle: {
                color: "#1FA122",
                fontSize: 12
              }
            },
            //直接在点上显示标签
            label: {
              show: false,
              normal: {
                show: true
              },
              emphasis: {
                show: true
              },
              formatter: "{b}",
              offset: [15, -15] //文字的相对偏移
            },
            //标签的样式
            itemStyle: {
              normal: {
                color: "#1FA122",
                borderWidth: 1
              }
            }
          },
          {
            name: "异常",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "rect",
            data: this.threeStatusData[2] || [],
            symbolSize: 16,
            legend: {
              orient: "horizontal",
              x: "center",
              bottom: "10",
              textStyle: {
                color: "#1FA122",
                fontSize: 12
              }
            },
            //直接在点上显示标签
            label: {
              show: false,
              normal: {
                show: true
              },
              emphasis: {
                show: true
              },
              formatter: "{b}",
              offset: [15, -15] //文字的相对偏移
            },
            //标签的样式
            itemStyle: {
              normal: {
                color: "#E62129",
                borderWidth: 1
              }
            }
          },
          {
            name: "离线",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "rect",
            data: this.threeStatusData[3] || [],
            symbolSize: 16,
            legend: {
              orient: "horizontal",
              x: "center",
              bottom: "10",
              textStyle: {
                color: "#1FA122",
                fontSize: 12
              }
            },
            //直接在点上显示标签
            label: {
              show: false,
              normal: {
                show: true
              },
              emphasis: {
                show: true
              },
              formatter: "{b}",
              offset: [15, -15] //文字的相对偏移
            },
            //标签的样式
            itemStyle: {
              normal: {
                color: "#848484",
                borderWidth: 1
              }
            }
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
    initMapData(mapJson, allDatas, type) {
      var mapData = [];
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name
        });
      }
      console.log("mapdata========", mapData, mapJson);
      return mapData;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/time-monitoring.scss";
</style>
