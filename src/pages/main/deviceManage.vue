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
        <div class="orgnazition_title">
          ◆ 终端管理 ◆
        </div>
        <div class="submit_btn" @click="createDevice()">
          新增
        </div>
      </div>
      <div class="table_container">
        <div class="left_table">
          <div class="three_tree_level">
            <groupTree :treeData="treeData" @searchTermList="searchTermList" :mtype="1"></groupTree>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr style="background: #A59226;">
                <th>终端编号</th>
                <th>终端名称</th>
                <th>所属机构</th>
                <th>工作模式</th>
                <th>连接模式</th>
                <th>基准经度</th>
                <th>基准纬度</th>
                <th>备注</th>
                <th>安装单位</th>
                <th>安装地点</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in terminalListData" :key="item.iotId">
                <td>{{item.serialNo}}</td>
                <td>{{item.name}}</td>
                <td>{{item.organizeName}}</td>
                <td v-if="typeof (item.runMode) == 'string'">{{
                  JSON.parse(item.runMode).type == 1 ? "夏季模式" : (
                    JSON.parse(item.runMode).type == 2 ? "冬季模式" : (
                      JSON.parse(item.runMode).type == 3 ? "应急模式" : (
                        JSON.parse(item.runMode).type == 4 ? "自定义模式" : ""
                      )
                    )
                  )
                  }}</td>
                <td v-else>
                  {{
                    (item.runMode).type == 1 ? "夏季模式" : (
                    (item.runMode).type == 2 ? "冬季模式" : (
                      (item.runMode).type == 3 ? "应急模式" : (
                        (item.runMode).type == 4 ? "自定义模式" : ""
                      )
                    )
                  )
                  }}
                </td>  
                <td v-if="item.linkMode==2">长连接</td>
                <td v-else>短连接</td>
                <td v-if="item.location != null">{{JSON.parse(item.location).longitude}}</td>
                <td v-else>-</td>
                <td v-if="item.location != null">{{JSON.parse(item.location).latitude}}</td>
                <td v-else>-</td>
                <td>{{item.status}}</td>
                <td>{{item.installUnit}}</td>
                <td>{{item.address}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="updateDevice(item)">
                      编辑
                    </div>
                    <div class="syn_device" @click="synDevice(item)">
                      物联网
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="divide_pages">
                  <td colspan="13" v-if="terminalListData.length == 0 && listTermQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="13" v-else>
                    共条{{pageTermTotal}}记录，当前显示第{{listTermQuery.page}}/{{pageTermSum}}页
                    <a @click="changeDevicePages(1)">首页</a>
                    <a @click="changeDevicePages(listTermQuery.page-1)">上一页</a>
                    <a @click="changeDevicePages(listTermQuery.page+1)">下一页</a>
                    <a @click="changeDevicePages(pageTermSum)">尾页</a>
                  </td>
              </tr>
            </table>
        </div>
      </div>
      <div class="bottom_title_display">
        <div class="orgnazition_title">
          ◆ 产品类型 ◆
        </div>
        <div class="submit_btn" @click="addLightStep()">
          新增灯步
        </div>
      </div>
      <div class="table_container">
        <div class="left_table">
          <div class="light_type">
              <div class="top_add_del">
                <div class="_add_light" @click="addLight()">
                  新增
                </div>
                <div class="_del_light" @click="delLight()">
                  删除
                </div>
              </div>
              <div class="light_table_list">
                <div class="list_head">
                  产品类型
                </div>
                <div  class="light_item" v-for="item in dengZhiListData" :key="item.id" @click="searchLightList(item.id)">
                  <span v-if="item.id==listLightQuery.productId" style="color:red">{{item.name}}</span>
                  <span v-else>{{item.name}}</span>
                </div>
              </div>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr style="background: #A59226;">
                <th>编 号</th>
                <th>产品类型</th>
                <th>四路控制</th>
                <th>亮灯时间</th>
                <th>灭灯时间</th>
                <th>循环次数 </th>
                <th style="padding: 0 30px">操作</th>
              </tr>
              <tr v-for="item in lightListData" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.lineControl}}</td>
                <td>{{item.onTime}}</td>
                <td>{{item.offTime}}</td>
                <td>{{item.loopCount}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="updateLightStep(item)">
                      编辑
                    </div>
                    <div class="_record" @click="deleteLightStep(item.id)">
                      删除
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="divide_pages">
                  <td colspan="7" v-if="lightListData.length == 0 && listLightQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="7" v-else>
                    共条{{pageLightTotal}}记录，当前显示第{{listLightQuery.page}}/{{pageLightSum}}页
                    <a @click="changeLightPages(1)">首页</a>
                    <a @click="changeLightPages(listLightQuery.page-1)">上一页</a>
                    <a @click="changeLightPages(listLightQuery.page+1)">下一页</a>
                    <a @click="changeLightPages(pageLightSum)">尾页</a>
                  </td>
              </tr>
            </table>
        </div>
      </div>
    </div>
    <el-dialog :title="`${deviceStatus}终端`" :visible.sync="deviceDialogFormVisible" width="710px" class="editDevice">
      <el-form :inline="true" ref="deviceListForm" :rules="rules" :model="deviceListForm" label-position="right" label-width="100px">
        <el-card style="padding:0px 0px;">
          <el-form-item label="选择产品" prop="productId">
            <el-select v-model="deviceListForm.productId" placeholder="请选择产品类型" style="width:510px">
                <el-option
                  v-for="(item, index) in dengZhiListData"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端名称" prop="name">
            <el-input v-model="deviceListForm.name" style="width:200px" placeholder="请输入终端名称"/>
          </el-form-item>
          <el-form-item label="终端编号" prop="serialNo">
            <el-input v-model="deviceListForm.serialNo" style="width:200px" placeholder="请输入终端编号，必须唯一"/>
          </el-form-item>
          <el-form-item label="终端描述" prop="descs">
            <el-input v-model="deviceListForm.descs" style="width:200px" placeholder="请输入终端描述"/>
          </el-form-item>
          <el-form-item label="iccid卡号" prop="iccid">
            <el-input v-model="deviceListForm.iccid" style="width:200px" placeholder="请输入ICCID卡号"/>
          </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
          <el-form-item label="启动模式" prop="bootMode.type">
            <el-select v-model="deviceListForm.bootMode.type" style="width:200px" placeholder="请选择启动模式">
                <el-option
                  v-for="(item, index) in bootModeTypeList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="光感等级" prop="bootMode.level">
            <el-input v-model="deviceListForm.bootMode.level" style="width:200px" placeholder="光感等级，仅光感模式时填写"/>
          </el-form-item>
          <el-form-item label="RTC时间" prop="bootMode.rtcStart">
              <el-date-picker type="datetime" placeholder="开始时间，仅RTC模式时填写" v-model="deviceListForm.bootMode.rtcStart" style="width:200px" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="RTC时间" prop="bootMode.rtcEnd">
              <el-date-picker type="datetime" placeholder="结束时间，仅RTC模式时填写" v-model="deviceListForm.bootMode.rtcEnd" style="width:200px" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
        <el-form-item label="闪灯方式" prop="flashMode.type">
          <el-select v-model="deviceListForm.flashMode.type" style="width:200px" placeholder="请选择闪灯方式">
              <el-option
                v-for="(item, index) in flashModeList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="闪烁方式" prop="flashMode.mode">
          <el-input v-model="deviceListForm.flashMode.mode" style="width:200px" placeholder="请填写闪烁方式，仅单机闪烁时填写"/>
        </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
        <el-form-item label="运行模式" prop="runMode.type">
          <el-select v-model="deviceListForm.runMode.type" style="width:200px" placeholder="请选择运行模式">
              <el-option
                v-for="(item, index) in runModeTypeList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义等级" prop="runMode.outLevel">
          <el-input v-model="deviceListForm.runMode.outLevel" style="width:200px" placeholder="请填写自定义等级，仅自定义模式时填写"/>
        </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
        <el-form-item label="输出方式" prop="outLevel.type">
          <el-select v-model="deviceListForm.outLevel.type" style="width:200px" placeholder="请选择输出方式">
              <el-option
                v-for="(item, index) in outLevelTypeList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输出等级" prop="outLevel.level">
          <el-input v-model="deviceListForm.outLevel.level" style="width:200px" placeholder="请填写输出等级，仅均衡输出时填写"/>
        </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
        <el-form-item label="电池类型" prop="batteryType">
          <el-select v-model="deviceListForm.batteryType" style="width:200px">
              <el-option
                v-for="(item, index) in batteryTypeList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连接模式" prop="linkMode">
          <el-select v-model="deviceListForm.linkMode" style="width:200px">
              <el-option
                v-for="(item, index) in linkModeList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-card>
        <el-card style="padding:0px 0px;margin-top:10px;">
        <el-form-item label="安装单位" prop="installUnit">
          <el-input v-model="deviceListForm.installUnit" placeholder="请填写安装单位" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装负责人" prop="installContacts">
          <el-input v-model="deviceListForm.installContacts" placeholder="请填写安装负责人" style="width:200px"/>
        </el-form-item>
        <el-form-item label="负责人电话" prop="installPhone">
          <el-input v-model="deviceListForm.installPhone" placeholder="请填写负责人电话" style="width:200px"/>
        </el-form-item>
        <el-form-item label="支队电话" prop="branchPhone">
          <el-input v-model="deviceListForm.branchPhone" placeholder="请填写支队电话" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装省份" prop="province">
          <el-input v-model="deviceListForm.province" placeholder="请填写安装省份" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装城市" prop="city">
          <el-input v-model="deviceListForm.city" placeholder="请填写安装城市" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装区域" prop="county">
          <el-input v-model="deviceListForm.county" placeholder="请填写安装区域" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装地址" prop="address">
          <el-input v-model="deviceListForm.address" placeholder="请填写安装地址" style="width:200px"/>
        </el-form-item>
        <el-form-item label="安装时间" prop="installTime">
          <el-date-picker type="datetime" placeholder="请填写安装时间" v-model="deviceListForm.installTime" style="width:200px" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="deviceStatus === '编辑'?updateDeviceData():createDeviceData()">确定</el-button>
      </div>
    </el-dialog>
     <el-dialog title="新增灯质" :visible.sync="dengZhiDialogFormVisible" width="700px">
      <el-form ref="productLightForm" :rules="rules" :model="productLightForm" label-position="left" label-width="100px">
        <el-form-item label="灯质名称" prop="name">
          <el-input v-model="productLightForm.name" style="width:510px"/>
        </el-form-item>
        <el-form-item label="灯质描述" prop="descs">
          <el-input v-model="productLightForm.descs" style="width:510px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dengZhiDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="createData()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="`${lightStatus}灯质`" :visible.sync="lightDialogFormVisible" width="700px">
      <el-form ref="lightStepForm" :rules="rules" :model="lightStepForm" label-position="left" label-width="100px">
         <el-form-item label="选择产品" prop="productId">
          <el-select v-model="lightStepForm.productId"  style="width:510px">
            <el-option
              v-for="(item, index) in dengZhiListData"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="四路控制" prop="lineControl">
            <el-checkbox v-model="line1" label="1路" border></el-checkbox>
            <el-checkbox v-model="line2" label="2路" border></el-checkbox> 
            <el-checkbox v-model="line3" label="3路" border></el-checkbox>
            <el-checkbox v-model="line4" label="4路" border></el-checkbox>
        </el-form-item>
        <el-form-item label="循环次数" prop="loopCount">
          <el-input v-model="lightStepForm.loopCount" style="width:510px"/>
        </el-form-item>
        <el-form-item label="亮灯时间" prop="onTime">
          <el-input v-model="lightStepForm.onTime" style="width:510px"/>
        </el-form-item>
        <el-form-item label="灭灯时间" prop="offTime">
          <el-input v-model="lightStepForm.offTime" style="width:510px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lightDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="lightStatus === '编辑'?updateLightData():createLightData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import { Message, MessageBox } from 'element-ui'
import groupTree from '@/components/groupTree.vue'
import creatModal from '@/components/modal.vue'
export default {
  name: 'monitoring',
  components: {
    groupTree
  },
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      yearsList: [],
      isShowModal: false,
      DateList: [],
      dateData: [],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      selectedArea: "长沙交警支队",
      areaList: ['长沙交警支队', '浏阳市交警支队', '株洲市交警支队', '宁乡市交警支队'],
      selectedTerminal: '爆闪灯',
      terminalList: ['爆闪灯','黄慢（闪）灯', '点阵式主动发光标志','面阵式全透发光标志' ,'面阵式半透发光标志'],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
      lightList: ['爆闪灯','黄慢（闪）灯', '点阵式主动发光标志','面阵式全透发光标志' ,'面阵式半透发光标志'],
      bootModeTypeList:[{"id":1,"name":"光感模式"},{"id":2,"name":"RTC模式"}],
      runModeTypeList:[{"id":1,"name":"夏季模式"},{"id":2,"name":"冬季模式"},{"id":3,"name":"应急模式"},{"id":4,"name":"自定义模式"}],
      outLevelTypeList:[{"id":1,"name":"自动调光"},{"id":2,"name":"均衡输出"}],
      batteryTypeList:[{"id":1,"name":"锂电池"},{"id":2,"name":"铅酸电池"},{"id":3,"name":"电网"}],
      linkModeList:[{"id":1,"name":"短连接"},{"id":2,"name":"长连接"}],
      flashModeList:[{"id":1,"name":"联机同频闪烁"},{"id":2,"name":"单机闪烁"}],
      treeData: [],
      fieldList: [],
      listTermQuery: {
        page: 1,
        pageSize: 10,
        organizeId: 0
      },
      listLightQuery: {
        page: 1,
        pageSize: 10,
        productId: 0
      },
      activeTermIndex: 1,
      activeLightIndex: 1,
      terminalListData: [],
      lightListData: [],
      dengZhiListData: [],
      pageTermSum: 0,
      pageTermTotal: 0,
      pageLightSum: 0,
      pageLightTotal: 0,
      dengZhiDialogFormVisible: false,
      lightDialogFormVisible: false,
      productLightForm: {
        name: '',
        descs: ''
      },
      lightStepForm: {
        productId: "",
        lineControl: "",
        loopCount: '',
        onTime: '',
        offTime: ''
        
      },
      line1: false,
      line2: false,
      line3: false,
      line4: false,
      lightStatus: "新增",
      deviceDialogFormVisible: false,
      deviceStatus:"新增",
      deviceListForm: {
        productId: "",
        organizeId: "",
        serialNo: "",
        iotId: "",
        iotDsecret: "",
        name: "",
        iccid: "",
        bootMode: {
          type: '',
          level: '',
          rtcStart: '',
          rtcEnd: ''
        },
        flashMode: {
          type: 1,
          mode: ''
        },
        runMode: {
          type: 1,
          outLevel: ''
        },
        outLevel: {
          type: 1,
          level:""
        },
        batteryType: 1,
        linkMode: 1,
        installUnit: "",
        installContacts: "",
        installPhone: "",
        branchPhone: "",
        installTime: "",
        province: "",
        city: "",
        county: "",
        address: ""
      },
      rules: {
        productId: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        serialNo: [{ required: true, message: '必填项', trigger: 'blur' }],
        descs: [{ required: true, message: '必填项', trigger: 'blur' }],
        iccid: [{ required: true, message: '必填项', trigger: 'blur' }],
        'bootMode.type': [{ required: true, message: '必填项', trigger: 'blur' }],
        'flashMode.type': [{ required: true, message: '必填项', trigger: 'blur' }],
        'runMode.type': [{ required: true, message: '必填项', trigger: 'blur' }],
        'outLevel.type': [{ required: true, message: '必填项', trigger: 'blur' }],
        
        lineControl: [{ required: true, message: '必填项', trigger: 'blur' }],
        loopCount: [{ required: true, message: '必填项', trigger: 'blur' }],
        onTime: [{ required: true, message: '必填项', trigger: 'blur' }],
        offTime: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getTreeList()
    this.getTermList()
    this.getLightList()
    this.getDengZhiList()
  },
  mounted() {
  },
  methods:{
    changeDevicePages(pages) {
      if(pages > this.pageTermSum|| pages < 1){
        return;
      }
      this.activeTermIndex = pages
      this.listTermQuery.page = pages
      this.getTermList()
    },
    changeLightPages(pages) {
      if(pages > this.pageLightSum|| pages < 1){
        return;
      }
      this.activeLightIndex = pages
      this.listLightQuery.page = pages
      this.getLightList()
    },
    changeTermPages(pages) {
      this.activeTermIndex = pages
      this.listTermQuery.page = pages
      this.getTermList()
    },
    getTreeList(){
      // /organize/getTreeList
      let params = {
        fetchUrl: '/sys/organize/getTreeList',
        listQuery: {}
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.treeData = res.data
      })
    },
    searchTermList(organizeId){
      this.listTermQuery.organizeId=organizeId
      this.listTermQuery.page=1
      this.getTermList()
    },
     getTermList(){
      // 获取终端列表
      let params = {
        fetchUrl: '/sys/device/list',
        listQuery: this.listTermQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.terminalListData = res.data.datas
        this.pageTermTotal = res.data.total
        this.pageTermSum = Math.ceil(res.data.total/this.listTermQuery.pageSize)
      })
    },
    searchLightList(productId){
      this.listLightQuery.productId = productId
      this.listLightQuery.page = 1
      this.pageLightSum = 0
      this.pageLightTotal = 0
      this.getLightList()
    },
    getLightList(){
      // 获取灯步列表
      let params = {
        fetchUrl: '/sys/flashMode/list',
        listQuery: this.listLightQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.lightListData = res.data.datas
        this.pageLightTotal = res.data.total
        this.pageLightSum = Math.ceil(res.data.total/this.listLightQuery.pageSize)
      })
    },
    getDengZhiList() {
      // /sys/product/list
      let params = {
        fetchUrl: '/sys/product/list',
        listQuery: {
          page: 1,
          pageSize: 10000
        }
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.dengZhiListData = res.data.datas
        // this.pageLightSum = Math.ceil(res.data.total/this.listLightQuery.pageSize)
      })
    },
    createDevice() {
      this.deviceDialogFormVisible = true
      this.deviceStatus = '新增'
      this.$nextTick(() => {
        this.$refs['deviceListForm'].clearValidate()
      })
    },
    updateDevice(row) {
      this.deviceStatus = "编辑"
      if(typeof (row.bootMode) == 'string'){
        row.bootMode = (row.bootMode!=null && row.bootMode!='') ? JSON.parse(row.bootMode):{}
      }
      if(typeof (row.flashMode) == 'string'){
        row.flashMode = (row.flashMode!=null && row.flashMode!='') ? JSON.parse(row.flashMode):{}
      }
      if(typeof (row.runMode) == 'string'){
        row.runMode = (row.runMode!=null && row.runMode!='') ? JSON.parse(row.runMode):{}
      }
      if(typeof (row.outLevel) == 'string'){
        row.outLevel = (row.outLevel!=null && row.outLevel!='') ? JSON.parse(row.outLevel):{}
      }

      this.deviceListForm = row
      this.deviceDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['deviceListForm'].clearValidate()
      })
    },
    createDeviceData() {
      this.$refs['deviceListForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/device/add',
              data: this.deviceListForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.deviceDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '添加终端成功',
                type: 'success'
              });
              this.getTermList()
            })
          }
        })
    },
    updateDeviceData() {
      this.$refs['deviceListForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/device/edit',
              data: this.deviceListForm
            }
            this.$store.dispatch('EditMembers', params).then(res => {
              this.deviceDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改设备成功',
                type: 'success'
              });
              this.getTermList()
              this.deviceListForm = Object.assign({}, this.$options.data().deviceListForm)
            })
          }
        })
    },
    addLightStep() {
      this.lightDialogFormVisible = true
      this.lightStatus = '新增'
      this.line1 = false
      this.line2 = false
      this.line3 = false
      this.line4 = false

      this.$nextTick(() => {
        this.$refs['lightStepForm'].clearValidate()
      })
    },
    updateLightStep(row) {
      this.lightStatus = "编辑"
      this.lightStepForm = row
      if(row.lineControl.length == 4){
        this.line1 = (row.lineControl.substring(0,1) == '1' ? true : false)
        this.line2 = (row.lineControl.substring(1,2) == '1' ? true : false)
        this.line3 = (row.lineControl.substring(2,3) == '1' ? true : false)
        this.line4 = (row.lineControl.substring(3,4) == '1' ? true : false)
      }
      this.lightDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['lightStepForm'].clearValidate()
      })
    },
    updateLightData() {
      this.$refs['lightStepForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/flashMode/edit',
              data: this.lightStepForm
            }
            this.lightStepForm.lineControl = (this.line1 == true ? '1' : '0')
                + (this.line2 == true ? '1' : '0')
                + (this.line3 == true ? '1' : '0')
                + (this.line4 == true ? '1' : '0')
            this.$store.dispatch('EditMembers', params).then(res => {
              this.lightDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改灯步成功',
                type: 'success'
              });
              this.getLightList()
              this.lightStepForm = Object.assign({}, this.$options.data().lightStepForm)
            })
          }
        })
    },
    createLightData() {
      this.$refs['lightStepForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/flashMode/add',
              data: this.lightStepForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.lightDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '添加灯步成功',
                type: 'success'
              });
              this.getLightList()
            })
          }
        })
    },
    deleteLightStep(id) {
      // 删除灯步
      MessageBox.confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let params = {
              fetchUrl: '/sys/flashMode/delete?id='+id,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              this.listLightQuery.page = 1
              this.pageLightSum = 0
              this.pageLightTotal = 0
              this.getLightList()
            })
        })
    },
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
    synDevice(device){
      // 同步设备信息
      MessageBox.confirm(
          '产品KEY：'+device.iotPkey+'，设备秘钥：'+device.iotDsecret+'，如需设置设备信息，请点击“立即设置”','物联网信息',
          {
            confirmButtonText: '立即设置',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
            let params = {
              fetchUrl: '/sys/device/sync?id='+device.id,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              
            })
        })
    },
    delLight(){
      if(this.listLightQuery.productId == '' || this.listLightQuery.productId <= 0){
        MessageBox.alert('请选择要删除的产品类型');
        return false;
      }
      // 删除灯质
      MessageBox.confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
            let params = {
              fetchUrl: '/sys/product/delete?id='+this.listLightQuery.productId,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              // this.activeOrganizationIndex = 1
              // this.listOrganizeQuery.page = 1
              this.getDengZhiList()
            })
        })
    },
    addLight() {
      this.dengZhiDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['productLightForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['productLightForm'].validate((valid) => {
          // this.userDataForm.userType = this.userType
          if (valid) {
            // this.userDataForm.status = this.switchValue ? 1 : 2
            // this.userDataForm.pwd = md5(this.userDataForm.pwd)
            let params = {
              fetchUrl: '/sys/product/add',
              data: this.productLightForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.dengZhiDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '添加灯质成功',
                type: 'success'
              });
              // this.activeOrganizationIndex = 1 // 机构分页
              // this.listOrganizeQuery.page = 1
              this.getDengZhiList()
              // this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
            })
          }
        })
    },
    createTerm() {
      let fieldList = [
            {name: '终端编号', value: ''},
            {name: '终端描述', value: ''},
            {name: '所属机构', value: ''},
            {name: '工作模式', value: ''},
            {name: '连接模式', value: ''},
            {name: '闪灯方式', value: ''},
            {name: '基准经度', value: ''},
            {name: '基准纬度', value: ''},
            {name: '备注', value: ''},
            {name: '安装单位', value: ''},
            {name: '安装地点', value: ''},
        ]
      this.isShowModal = true
      this.fieldList = fieldList
    },
    nodechecked (node, v) {
      alert('that a node-check envent ...' + node.title + v)
    },
    // tpl (node, ctx, parent, index, props) {
    tpl (...args) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span>
        <button class="treebtn1" onClick={() => this.$refs.tree1.addNode(node, {title: 'sync node'})}>+</button>
         <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
           this.$refs.tree1.nodeSelected(node)
         }}></span>
      <button class="treebtn2" onClick={() => this.asyncLoad1(node)}>async</button>
      <button class="treebtn3" onClick={() => this.$refs.tree1.delNode(node, parent, index)}>delete</button>
      </span>
    },
    async asyncLoad1 (node) {
      const {checked = false} = node
      this.$set(node, 'loading', true)
      let pro = new Promise(resolve => {
        setTimeout(resolve, 2000, ['async node1', 'async node2'])
      })
      this.$refs.tree1.addNodes(node, await pro)
      this.$set(node, 'loading', false)
      if (checked) {
        this.$refs.tree1.childCheckedHandle(node, checked)
      }
    },
    search () {
      this.$refs.tree1.searchNodes(this.searchword)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/device-manage.scss';
</style>



