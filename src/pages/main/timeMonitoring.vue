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
      <div class="edit_btn" @click="openBtnEdit()">
        按钮编辑器
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
                <div class="back_index_page" @click="backIndexPage"><button>返回首层</button></div>
                <div class="back_behide_page"><button @click="backOnePage()">返回上一级</button></div>
              </div>
               <div class="platform_charts" id="platformCount">
                <!-- 平台数据分布 -->
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
              <tr class="divide_pages">
                  <td colspan="8" v-if="monitoringList.length == 0 && listMoniQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="8" v-else>
                    共条{{monitoringTotal}}记录，当前显示第{{listMoniQuery.page}}/{{monitoringPageSum}}页
                    <a @click="changeMoniPages(1)">首页</a>
                    <a @click="changeMoniPages(listMoniQuery.page-1)">上一页</a>
                    <a @click="changeMoniPages(listMoniQuery.page+1)">下一页</a>
                    <a @click="changeMoniPages(monitoringPageSum)">尾页</a>
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
              <div class="address_detail" @click="goToMap(item)">
                  {{item.province+item.city+item.county+item.address || "暂无地址或地址不详"}}
              </div>
            </div>
            <div class="no_more" v-if="listAlarmInfoQuery.page>=alarmInfoPageSum">
                没有更多的数据了
            </div>  
            <div class="load_more" v-else>
              <a @click="loadMoreAlarmList(listAlarmInfoQuery.page+1)">点击查看更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="`${statusType}记录`" :visible.sync="checkDetailVisible">
      <div class="table_alert">
        <table class="table_list">
              <tr>
                <th>序号</th>
                <th>终端所属机构</th>
                <th>终端序列号</th>
                <th>终端名称</th>
                <th>安装单位</th>
                <th>安装地点</th>
                <th>终端状态</th>
                <th>报警时间</th>
                <th>报警信息</th>
              </tr>
              <tr v-for="item in alertMonitoringList" :key="item.id">
                <td>{{alertMonitoringItem.organizeName}}</td>
                <td>{{alertMonitoringItem.organizeName}}</td>
                <td>{{alertMonitoringItem.serialNo}}</td>
                <td>{{alertMonitoringItem.name}}</td>
                <td>{{alertMonitoringItem.installUnit}}</td>
                <td>{{alertMonitoringItem.address}}</td>
                <td>{{statusMap[item.status]}}</td>
                <td>{{moment(item.createTime).format("YYYY-MM-DD")}}</td>
                <td>{{item.emsg}}</td>
              </tr>
              <tr class="divide_pages">
                  <td colspan="9" v-if="alertMonitoringList.length == 0 && alertMonitoringQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="9" v-else>
                    共条{{alertMonitoringTotal}}记录，当前显示第{{alertMonitoringQuery.page}}/{{alertMonitoringPageSum}}页
                    <a @click="changeAlertMonitoringPages(1)">首页</a>
                    <a @click="changeAlertMonitoringPages(alertMonitoringQuery.page-1)">上一页</a>
                    <a @click="changeAlertMonitoringPages(alertMonitoringQuery.page+1)">下一页</a>
                    <a @click="changeAlertMonitoringPages(alertMonitoringPageSum)">尾页</a>
                  </td>
              </tr>
            </table>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isShowSendMsg" custom-class="send_message_table" title="选择发送指令">
      <span class="addBtn" @click="addItem();">新建指令</span>
      <table class="table_list" style="z-index: 9999">
        <tr>
          <th>序号</th>
          <th>显示文本</th>
          <th>指令类型</th>
          <th>指令消息</th>
          <th style="padding: 0 30px">操作</th>
        </tr>
        <tr>
          <td>1</td>
          <td>aaa</td>
          <td>cdd</td>
          <td>ffffff</td>
          <td class="opration_table">
            <div class="opration_btn">
              <div class="history_data" @click="sendMsg(item)">
                发送
              </div>
            </div>
          </td>
        </tr>
        <tr class="divide_pages">
            <td colspan="7" v-if="msgListData.length == 0 && listMsgQuery.page == 1">
              没有更多的数据了
            </td>
            <td colspan="5" v-else>
              共条{{pageMsgTotal}}记录，当前显示第{{listMsgQuery.page}}/{{pageMsgSum}}页
              <a @click="changeLightPages(1)">首页</a>
              <a @click="changeLightPages(listMsgQuery.page-1)">上一页</a>
              <a @click="changeLightPages(listMsgQuery.page+1)">下一页</a>
              <a @click="changeLightPages(pageMsgSum)">尾页</a>
            </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="isShowCheckMsg" custom-class="send_message_table" title="查看发送指令日志">
      <table class="table_list" style="z-index: 9999">
        <tr>
          <th>序号</th>
          <th>显示文本</th>
          <th>指令类型</th>
          <th>指令消息</th>
          <th style="padding: 0 30px">操作</th>
        </tr>
        <tr>
          <td>1</td>
          <td>aaa</td>
          <td>cdd</td>
          <td>ffffff</td>
          <td class="opration_table">
            <div class="opration_btn">
              <div class="history_data" @click="sendMsg(item)">
                发送
              </div>
            </div>
          </td>
        </tr>
        <tr class="divide_pages">
            <td colspan="7" v-if="msgListData.length == 0 && listMsgQuery.page == 1">
              没有更多的数据了
            </td>
            <td colspan="5" v-else>
              共条{{pageMsgTotal}}记录，当前显示第{{listMsgQuery.page}}/{{pageMsgSum}}页
              <a @click="changeLightPages(1)">首页</a>
              <a @click="changeLightPages(listMsgQuery.page-1)">上一页</a>
              <a @click="changeLightPages(listMsgQuery.page+1)">下一页</a>
              <a @click="changeLightPages(pageMsgSum)">尾页</a>
            </td>
        </tr>
      </table>
    </el-dialog>
    <div @click="clickAmap" v-if="isShowMap" class="amap-wrapper">
      <div v-if="isShowMap" class="close_amap"><button @click="closeAmap()">关闭窗口</button></div>
      <el-amap class="amap-box" :zoom="zoom" :resizeEnable="true" :bubble="true"  :vid="'amap-vue'" :autoMove="true" :center="curPositionData">
        <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :events="currentWindow.events">
        </el-amap-info-window>
        <el-amap-marker v-for="(marker, index) in amapMarkers" :clickable="true" @click="markerPosition(marker)" :bubble="true" :key='marker.id' :position="marker.value" :events="marker.events" :vid="index"></el-amap-marker>
      </el-amap>
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
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import echarts from "echarts";
import cityMap from "@/assets/js/china-main-city-map.js";
export default {
  name: "monitoring",
  components: {},
  data() {
    return {
      msgListData: [],
      pageMsgTotal: 0,
      pageMsgSum: 0,
      listMsgQuery: {
        page: 1,
        pageSize: 10,
        productId: 0
      },
      zoom: 16,
      currentWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false
      },
      dateTime: moment().format("YYYY.MM.DD"),
      threeStatusData: [],
      alarmList: [
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
      monitoringPageSum:0,
      monitoringTotal:0,
      listMoniQuery: {
        page: 1,
        pageSize: 10
      },
      listAlarmInfoQuery: {
        page: 1,
        pageSize: 50,
        type: 2 //类型（1-正常，2告警，3-失联）
      },
      curPositionData: [0, 0],
      alarmInfoList: [],
      alarmInfoPageSum:0,
      alarmInfoTotal:0,
      amapMarkers:[],
      alertMonitoringList:[],
      alertMonitoringItem:null,
      alertMonitoringQuery:{
        page: 1,
        pageSize: 20,
        deviceId:0,
        status:0
      },
      alertMonitoringTotal:0,
      alertMonitoringPageSum:0,
      isShowSendMsg: false,
      isShowCheckMsg: false
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
      let id = item.deviceId
      let positionData = [item.location.longitude, item.location.latitude]
      this.jumpMapPosition(id,positionData, this)
    },
    markerPosition (val) {
      // 地图描点再点击
      console.log('val===>>>>', val)
    },
    backIndexPage() {
      this.isShowMap = false;
      this.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
      mapStack = [];
      parentId = chinaId;
      parentName = chinaName;
    },
    closeAmap(){
      this.isShowMap = false;
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
      this.alertMonitoringQuery.deviceId = item.id;
      this.alertMonitoringQuery.status = 2;
      this.alertMonitoringItem = item;
      this.changeAlertMonitoringPages(1);
      this.checkDetailVisible = true;
    },
    goRecordList(item) {
      this.statusType = "历史数据";
      this.alertMonitoringQuery.deviceId = item.id;
      this.alertMonitoringQuery.status = 0;
      this.alertMonitoringItem = item;
      this.changeAlertMonitoringPages(1);
      this.checkDetailVisible = true;
    },
    changeAlertMonitoringPages(pages){
      if((pages>1 && pages > this.alertMonitoringPageSum)|| pages < 1){
        return;
      }
      this.alertMonitoringQuery.page = pages;
      let params = {
        fetchUrl: "/sys/monitoring/alarmInfo",
        listQuery: this.alertMonitoringQuery
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.alertMonitoringList = res.data.datas;
        this.alertMonitoringTotal = res.data.total
        this.alertMonitoringPageSum = Math.ceil(res.data.total/this.alertMonitoringQuery.pageSize)
      });
    },

    checkDetailSubmit() {
      this.checkDetailVisible = false;
    },
    changeMoniPages(pages){
      if(pages > this.monitoringPageSum|| pages < 1){
        return;
      }
      this.listMoniQuery.page = pages
      this.getMonitoringList()
    },
    getMonitoringList() {
      let params = {
        fetchUrl: "/sys/monitoring/monitoringList",
        listQuery: this.listMoniQuery
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.monitoringList = res.data.datas;
        this.monitoringTotal = res.data.total
        this.monitoringPageSum = Math.ceil(res.data.total/this.listMoniQuery.pageSize)
      });
    },
    changeAlarmList(type) {
      this.listAlarmInfoQuery.pages = 1;
      this.listAlarmInfoQuery.type = type;
      this.alarmInfoList = [];
      this.getAlarmInfoList();
    },
    loadMoreAlarmList(pages){
      this.listAlarmInfoQuery.page = pages;
      this.getAlarmInfoList();
    },
    getAlarmInfoList() {
      let params = {
        fetchUrl: "/sys/monitoring/alarmInfo",
        listQuery: this.listAlarmInfoQuery
      };
      this.$store.dispatch("GetList", params).then(res => {
        this.alarmInfoList = this.alarmInfoList.concat(res.data.datas);
        this.alarmInfoTotal = res.data.total
        this.alarmInfoPageSum = Math.ceil(res.data.total/this.listAlarmInfoQuery.pageSize)
      });
    },
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
    openBtnEdit() {
      this.$router.push('btnEdit')
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
            color: "#7dd7f9"
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
            color: "#7dd7f9",
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
            color: "#7dd7f9"
          }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {d}%"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          bottom: "10",
          textStyle: {
            color: "#7dd7f9",
            fontSize: 12
          },
          data: ["正常", "异常", "离线"]
        },
        series: [
          {
            name: "终端状态比例",
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
      let that = this;
      data.map(item =>
        item.children.map(ele =>
          tempData.push({
            value: [
              JSON.parse(ele.location).longitude,
              JSON.parse(ele.location).latitude
            ],
            name: ele.county,
            id: ele.id,
            status: ele.status,
            events: {
              click: (e) => {
                this.currentWindow.visible = false;
                this.$nextTick(() => {
                  this.jumpMapPosition(ele.id,[JSON.parse(ele.location).longitude,JSON.parse(ele.location).latitude],that)
                });
                
              }
            }
          })
        )
      );
      return tempData;
    },
    clickAmap(e) {
      if (e.target.dataset.type && e.target.dataset.type === 'sendMsg') {
        // 选择发送指令
        console.log('click选择发送指令')
        this.isShowSendMsg = true

      }
      if (e.target.dataset.type && e.target.dataset.type === 'checkMsg') {
        // 查看发送指令
        console.log('click查看发送指令')
        this.isShowCheckMsg = true
      }
    },
    jumpMapPosition(id,positionData, that) {
      let postData = {
        fetchUrl: "/sys/device/info?id=" + id,
        listQuery: {
          id
        }
      };
      that.$store.dispatch("GetDetail", postData).then(detail => {
        const detailData = detail.data;
        that.isShowMap = true;
        that.curPositionData = [detailData.location.longitude,detailData.location.latitude];
        let oldTime = detailData.synTime
        let newdate = moment(oldTime).format('YYYY-MM-DD HH:mm:ss')
        detailData.synTime= newdate

        let oldTime2 = detailData.installTime
        let newdate2 = moment(oldTime2).format('YYYY-MM-DD HH:mm:ss')
        detailData.installTime= newdate2
        
        let types={'1':"夏季模式",'2':"冬季模式",'3':"应急模式",'4':"自定义模式"}
        detailData.runMode.type = types[detailData.runMode.type]
        
        let status={'1':"正常",'2':"告警",'3':"离线"}
        detailData.status = status[detailData.status]
        //  let temp = 
        // '<style>td{border:solid 1px #999;font-size:14px;padding:2px 5px;}</style>'+
        // '<div class="modal_detail">'+
        //   '<div style="margin: -1px; padding: 1px;">'+
        //     '<div style="text-align:center;white-space:nowrap;margin:10px;">'+
        //       '<table style="border-collapse: collapse;">'+
        //         '<tbody>'+
        //           '<tr><td>所属机构</td><td colspan="3">'+detailData.organizeTree+'</td></tr>'+
        //           '<tr><td>终端识别号</td><td>'+detailData.serialNo+'</td><td>ICCID卡号</td><td>'+(detailData.iccid==null?'':detailData.iccid)+'</td></tr>'+
        //           '<tr><td>终端名称</td><td>'+detailData.name+'</td><td>终端通讯时间</td><td>'+detailData.synTime+'</td></tr>'+   
        //           '<tr><td>当前坐标位置</td><td>'+detailData.location.longitude+','+detailData.location.latitude+'</td><td>灯质模式</td><td>'+detailData.productName+'</td></tr>'+   
        //           '<tr><td>信号强度</td><td>'+detailData.gsm+'</td><td>终端备注</td><td>'+(detailData.descs==null?'':detailData.descs)+'</td></tr>'+   
        //           '<tr><td>安装单位</td><td>'+detailData.installUnit+'</td><td>安装地点</td><td>'+(detailData.address==null?'':detailData.address)+'</td></tr>'+   
        //           '<tr><td>安装时间</td><td>'+detailData.installTime+'</td><td>负责人</td><td>'+(detailData.installContacts==null?'':detailData.installContacts)+'</td></tr>'+   
        //           '<tr><td>联系方式</td><td>'+detailData.installPhone+'</td><td>支队联系方式</td><td>'+(detailData.branchPhone==null?'':detailData.branchPhone)+'</td></tr>'+   
        //           '<tr><td>电池类型</td><td>'+detailData.batteryTypeName+'</td><td>太阳能电压</td><td>'+detailData.solarVolt+'</td></tr>'+   
        //           '<tr><td>电池电压</td><td>'+detailData.batteryVolt+'</td><td>点阵/面阵</td><td>'+detailData.productName+'</td></tr>'+   
        //           '<tr><td>运行模式</td><td>'+detailData.runMode.type+'</td><td>运行等级</td><td>'+detailData.runMode.outLevel+'</td></tr>'+   
        //           '<tr><td>开始运行时间</td><td>'+detailData.synTime+'</td><td>终端状态</td><td>'+detailData.status+'</td></tr>'+
        //           // '<tr><td>位移报警</td><td>正常</td><td>位移距离</td><td>0.3</td></tr>'+
        //         '</tbody>'+
        //       '</table>'+
        //     '</div>'+
        //   '</div>'+
        //   '<div style="display: flex;justify-content: flex-end;">'+
        //     '<div style="margin-right: 10px">'+
        //       '<button style="background: linear-gradient(to bottom, #092a5d, #0c5b2e); color: #fff;padding: 2px 6px">选择发送指令</button>'+
        //     '</div>'+
        //     '<div>'+
        //     '<button style="color: #fff;background: linear-gradient(to bottom, #092a5d, #0c5b2e);padding: 2px 6px" id="checkOrder">查看发送指令</button>'+
        //     '</div>'+
        //   '</div>'+
        // '</div>';
        let temp = 
        `<div class="modal_detail">
        <style>td{border:solid 1px #999;font-size:14px;padding:2px 5px;}</style>
        <div style="margin: -1px; padding: 1px;">
          <div style="text-align:center;white-space:nowrap;margin:10px;">
            <table style="border-collapse: collapse;">
              <tbody>
                <tr><td>所属机构</td><td colspan="3">${detailData.organizeTree}</td></tr>
                <tr><td>终端识别号</td><td>${detailData.serialNo}</td><td>ICCID卡号</td><td>${detailData.iccid==null?'':detailData.iccid}</td></tr>
                <tr><td>终端名称</td><td>${detailData.name}</td><td>终端通讯时间</td><td>${detailData.synTime}</td></tr>   
                <tr><td>当前坐标位置</td><td>${detailData.location.longitude},${detailData.location.latitude}</td><td>灯质模式</td><td>${detailData.productName}</td></tr>   
                <tr><td>信号强度</td><td>${detailData.gsm}</td><td>终端备注</td><td>${detailData.descs==null?'':detailData.descs}</td></tr>   
                <tr><td>安装单位</td><td>${detailData.installUnit}</td><td>安装地点</td><td>${detailData.address==null?'':detailData.address}</td></tr>   
                <tr><td>安装时间</td><td>${detailData.installTime}</td><td>负责人</td><td>${detailData.installContacts==null?'':detailData.installContacts}</td></tr>   
                <tr><td>联系方式</td><td>${detailData.installPhone}</td><td>支队联系方式</td><td>${detailData.branchPhone==null?'':detailData.branchPhone}</td></tr>   
                <tr><td>电池类型</td><td>${detailData.batteryTypeName}</td><td>太阳能电压</td><td>${detailData.solarVolt}</td></tr>   
                <tr><td>电池电压</td><td>${detailData.batteryVolt}</td><td>点阵/面阵</td><td>${detailData.productName}</td></tr>   
                <tr><td>运行模式</td><td>${detailData.runMode.type}</td><td>运行等级</td><td>${detailData.runMode.outLevel}</td></tr>   
                <tr><td>开始运行时间</td><td>${detailData.synTime}</td><td>终端状态</td><td>${detailData.status}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display: flex;justify-content: flex-end;">
          <div style="margin-right: 10px">
            <button data-type="sendMsg" style="background: linear-gradient(to bottom, #092a5d, #0c5b2e); color: #fff;padding: 2px 6px" @click="chooseOrder">选择发送指令</button>
          </div>
          <div>
          <button data-type="checkMsg" style="color: #fff;background: linear-gradient(to bottom, #092a5d, #0c5b2e);padding: 2px 6px" id="checkOrder">查看发送指令</button>
          </div>
        </div>
      </div>`
        let element = {
          props: ['detailData'],
          template: temp
        }
        that.currentWindow = {
          content: temp,
          position: positionData,
          size: 10,
          visible: true,
          // contentRender: h => h(element, {
          //       props: {
          //         detailData: detailData
          //       },
          //       style: {
          //         background: 'rgb(173, 47, 47)',
          //         color: '#eee'
          //       },
          //       nativeOn: {
          //         click: () => this.handler(`hello click`)
          //       }
          //     }).$mount('#app')
          }
      })
    },
    async platformCount(divid) {
      // './json/china.json'
      let that = this;
      let { data } = await this.getEveryCityData(1);
      let unFormatData = this.producePositionData(data);
      this.amapMarkers = unFormatData;

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
              that.jumpMapPosition(param.data.id, param.value, that)
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
            color: "#7dd7f9"
          }
        },
        legend: {
          orient: "horizontal",
          x: "center",
          bottom: "10",
          textStyle: {
            color: "#7dd7f9",
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
            symbol: "circle",
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
                show: false
              },
              emphasis: {
                show: false
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
            symbol: "circle",
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
                show: false
              },
              emphasis: {
                show: false
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
            symbol: "circle",
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
                show: false
              },
              emphasis: {
                show: false
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
