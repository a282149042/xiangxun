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
            <groupTree :treeData="treeData"></groupTree>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr style="background: #A59226;">
                <th>终端编号</th>
                <th>终端描述</th>
                <th>所属机构</th>
                <th>工作模式</th>
                <th>连接模式</th>
                <th>基准经度</th>
                <th>基准纬度</th>
                <th>备注</th>
                <th>安装单位</th>
                <th>安装地点</th>
              </tr>
              <tr v-for="item in terminalListData" :key="item.iotId">
                <td>{{item.serialNo}}</td>
                <td>{{item.name}}</td>
                <td>{{item.organizeId}}</td>
                <td>{{item.runMode}}</td>
                <td>{{item.linkMode}}</td>
                <td>{{item.location.longitude}}</td>
                <td>{{item.location.latitude}}</td>
                <td>{{item.status}}</td>
                <td>{{item.installUnit}}</td>
                <td>{{item.installAddress}}</td>
              </tr>
            </table>
          <div class="divide_pages">
            <span class="pageing" :class="page === activeTermIndex ? 'active_pages':''" v-for="(page) in pageTermSum" :key="page" @click="changeDevicePages(page)">{{page}}</span>
          </div>
        </div>
      </div>
      <div class="bottom_title_display">
        <div class="orgnazition_title">
          ◆ 灯质类型 ◆
        </div>
        <div class="add_btn" @click="addLightStep()">
          新增灯步
        </div>
        <div class="del_btn" @click="deleteLightStep()">
          删除灯步
        </div>
      </div>
      <div class="table_container">
        <div class="left_table">
          <div class="light_type">
              <div class="top_add_del">
                <div class="_add_light" @click="addLight()">
                  新增
                </div>
                <div class="_del_light"  @click="delLight()">
                  删除
                </div>
              </div>
              <div class="light_table_list">
                <div class="list_head">
                  灯质类型
                </div>
                <div class="light_item" v-for="item in dengZhiListData" :key="item.id">
                  {{item.name}}
                </div>
              </div>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr style="background: #A59226;">
                <th>编 号</th>
                <th>四路控制</th>
                <th>亮灯时间</th>
                <th>灭灯时间</th>
                <th>循环次数 </th>
                <th style="padding: 0 30px">操作</th>
              </tr>
              <tr v-for="item in lightListData" :key="item.id">
                <td>{{item.productId}}</td>
                <td>{{item.lineControl}}</td>
                <td>{{item.onTime}}</td>
                <td>{{item.offTime}}</td>
                <td>{{item.loopCount}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="updateLightStep(item)">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          <div class="divide_pages">
            <span class="pageing" :class="page === activeLightIndex ? 'active_pages':''" v-for="(page) in pageLightSum" :key="page" @click="changeLightPages(page)">{{page}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增终端" :visible.sync="deviceDialogFormVisible">
      <el-form ref="deviceListForm" :rules="rules" :model="deviceListForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="终端编号" prop="serialNo">
          <el-input v-model="deviceListForm.serialNo"/>
        </el-form-item>
        <el-form-item label="终端描述" prop="descs">
          <el-input v-model="deviceListForm.descs"/>
        </el-form-item>
        <el-form-item label="设备ID" prop="iotId">
          <el-input v-model="deviceListForm.iotId"/>
        </el-form-item>
        <el-form-item label="设备秘钥" prop="iotDsecret">
          <el-input v-model="deviceListForm.iotDsecret"/>
        </el-form-item>
        <el-form-item label="终端名称" prop="name">
          <el-input v-model="deviceListForm.name"/>
        </el-form-item>
        
        <el-form-item label="iccid卡号" prop="iccid">
          <el-input v-model="deviceListForm.iccid"/>
        </el-form-item>

        <el-form-item label="启动模式" prop="bootMode">
          <el-input v-model="deviceListForm.bootMode"/>
        </el-form-item>
        
        <el-form-item label="闪灯方式" prop="flashMode">
          <el-input v-model="deviceListForm.flashMode"/>
        </el-form-item>
        <el-form-item label="运行模式" prop="runMode">
          <el-input v-model="deviceListForm.runMode"/>
        </el-form-item>
        
        <el-form-item label="输出等级" prop="outLevel">
          <el-input v-model="deviceListForm.outLevel"/>
        </el-form-item>
        <el-form-item label="电池类型" prop="batteryType">
          <el-input v-model="deviceListForm.batteryType"/>
        </el-form-item>

        <el-form-item label="连接模式" prop="linkMode">
          <el-input v-model="deviceListForm.linkMode"/>
        </el-form-item>
        
        <el-form-item label="安装单位" prop="installUnit">
          <el-input v-model="deviceListForm.installUnit"/>
        </el-form-item>

        <el-form-item label="安装地址" prop="installAddress">
          <el-input v-model="deviceListForm.installAddress"/>
        </el-form-item>
        <el-form-item label="安装负责人" prop="installContacts">
          <el-input v-model="deviceListForm.installContacts"/>
        </el-form-item>
        <el-form-item label="安装负责电话" prop="installPhone">
          <el-input v-model="deviceListForm.installPhone"/>
        </el-form-item>
        <el-form-item label="支队电话" prop="branchPhone">
          <el-input v-model="deviceListForm.branchPhone"/>
        </el-form-item>
        <el-form-item label="安装时间" prop="installTime">
          <el-input v-model="deviceListForm.installTime"/>
        </el-form-item>
        <el-form-item label="太阳能电压" prop="solarVolt">
          <el-input v-model="deviceListForm.solarVolt"/>
        </el-form-item>
        <el-form-item label="电池电压" prop="batteryVolt">
          <el-input v-model="deviceListForm.batteryVolt"/>
        </el-form-item>
        <!-- location -->
        <el-form-item label="定位信息" prop="longitude">
          <el-input v-model="deviceListForm.location"/>
        </el-form-item>
        <el-form-item label="定位省份" prop="province">
          <el-input v-model="deviceListForm.province"/>
        </el-form-item>
        <el-form-item label="定位城市" prop="city">
          <el-input v-model="deviceListForm.city"/>
        </el-form-item>
         <el-form-item label="gsm参数" prop="gsm">
          <el-input v-model="deviceListForm.gsm"/>
        </el-form-item>
         <el-form-item label="温度" prop="temperature">
          <el-input v-model="deviceListForm.temperature"/>
        </el-form-item>
        <el-form-item label="光照度" prop="illuminance">
          <el-input v-model="deviceListForm.illuminance"/>
        </el-form-item>
         <el-form-item label="状态" prop="status">
          <el-input v-model="deviceListForm.status"/>
        </el-form-item>
         <el-form-item label="选择产品" prop="productId">
           <el-form-item label="选择产品" prop="productId">
            <el-select v-model="lightStepForm.productId" clearable>
              <el-option
                v-for="(item, index) in dengZhiListData"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="createDeviceData()">确定</el-button>
      </div>
    </el-dialog>
     <el-dialog title="新增灯质" :visible.sync="dengZhiDialogFormVisible">
      <el-form ref="productLightForm" :rules="rules" :model="productLightForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="灯质名称" prop="name">
          <el-input v-model="productLightForm.name"/>
        </el-form-item>
        <el-form-item label="灯质描述" prop="descs">
          <el-input v-model="productLightForm.descs"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dengZhiDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="createData()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="`${lightStatus}灯质`" :visible.sync="lightDialogFormVisible">
      <el-form ref="lightStepForm" :rules="rules" :model="lightStepForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
         <el-form-item label="选择产品" prop="productId">
          <el-select v-model="lightStepForm.productId" clearable>
            <el-option
              v-for="(item, index) in dengZhiListData"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="四路控制" prop="lineControl">
          <el-input v-model="lightStepForm.lineControl"/>
        </el-form-item>
        <el-form-item label="循环次数" prop="loopCount">
          <el-input v-model="lightStepForm.loopCount"/>
        </el-form-item>
        <el-form-item label="亮灯时间" prop="onTime">
          <el-input v-model="lightStepForm.onTime"/>
        </el-form-item>
        <el-form-item label="灭灯时间" prop="offTime">
          <el-input v-model="lightStepForm.offTime"/>
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
import groupTree from '@/components/groupTree.vue'
import creatModal from '@/components/modal.vue'
export default {
  name: 'monitoring',
  components: {
    groupTree,creatModal
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
      treeData: [],
      fieldList: [],
      listTermQuery: {
        page: 1,
        pageSize: 10,
        "organizeId": 1002
      },
      listLightQuery: {
        page: 1,
        pageSize: 10,
        "organizeId": 1002
      },
      activeTermIndex: 1,
      activeLightIndex: 1,
      terminalListData: [],
      lightListData: [],
      dengZhiListData: [],
      pageTermSum: 0,      
      pageLightSum: 0,
      dengZhiDialogFormVisible: false,
      lightDialogFormVisible: false,
      productLightForm: {
        name: '',
        descs: ''
      },
      lightStepForm: {
         "productId": "",
        "lineControl": "",
        "loopCount": '',
        "onTime": '',
        "offTime": ''
      },
      deviceDialogFormVisible: false,
      deviceListForm: {
          "productId": 1002,
          "organizeId": 1001,
          "serialNo": "张三",
          "iotId": "455123",
          "iotDsecret": "dsafd",
          "name": "13974999769",
          "iccid": "1",
          "bootMode": "ss",
          "flashMode": "1",
          "runMode": "1",
          "outLevel": "1",
          "batteryType": 1,
          "linkMode": 1,
          "installUnit": "aaa",
          "installAddress": "bbb",
          "installContacts": "555",
          "installPhone": "156554546",
          "branchPhone": "1526655",
          "installTime": 465646,
          "solarVolt": 12.3,
          "batteryVolt": 12.6,
          "location": "{'longitude':123.123123,'latitude':234.123123}",
          "province": "湖南省",
          "city": "长沙市",
          "gsm": "1",
          "temperature": 17.5,
          "illuminance": 10,
          "status": 1
      },
      lightStatus: "新增",
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        descs: [{ required: true, message: '必填项', trigger: 'blur' }],
        productId: [{ required: true, message: '必填项', trigger: 'blur' }],
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
      this.activeTermIndex = pages
      this.listTermQuery.page = pages
      this.getTermList()
    },
    changeLightPages(pages) {
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
     getTermList(){
      // 获取终端列表
      let params = {
        fetchUrl: '/sys/device/list',
        listQuery: this.listTermQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.terminalListData = res.data.datas
        this.pageTermSum = Math.ceil(res.data.total/this.listTermQuery.pageSize)
      })
    },
    getLightList(){
      // 获取灯步列表
      let params = {
        fetchUrl: '/sys/flashMode/list',
        listQuery: this.listLightQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.lightListData = res.data.datas
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
      this.$nextTick(() => {
        this.$refs['deviceListForm'].clearValidate()
      })
    },
    createDeviceData() {
      this.$refs['deviceListForm'].validate((valid) => {
          // this.userDataForm.userType = this.userType
          if (valid) {
            // this.userDataForm.status = this.switchValue ? 1 : 2
            // this.userDataForm.pwd = md5(this.userDataForm.pwd)
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
              // this.activeOrganizationIndex = 1 // 机构分页
              // this.listOrganizeQuery.page = 1
              this.getTermList()
              // this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
            })
          }
        })
    },
    addLightStep() {
      this.lightDialogFormVisible = true
      this.lightStatus = '新增'
      this.$nextTick(() => {
        this.$refs['lightStepForm'].clearValidate()
      })
    },
    updateLightStep(row) {
      this.lightStatus = "编辑"
      this.lightStepForm = row
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
          // this.userDataForm.userType = this.userType
          if (valid) {
            // this.userDataForm.status = this.switchValue ? 1 : 2
            // this.userDataForm.pwd = md5(this.userDataForm.pwd)
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
              // this.activeOrganizationIndex = 1 // 机构分页
              // this.listOrganizeQuery.page = 1
              this.getLightList()
              // this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
            })
          }
        })
    },
    deleteLightStep() {
      // 删除灯步
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
    delLight(id){
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
              fetchUrl: '/sys/product/delete?id='+id,
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



