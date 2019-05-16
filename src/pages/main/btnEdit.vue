<template>
  <div class="btnEdit_page" ref="monitoring">
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
          <div class="monitoring_btn" @click="openDeviceManage()">
            设备管理
          </div>
        </div>
      </div>
      <div class="monitoring_date">
          {{dateTime}}
      </div>
      <div class="edit_btn btn-active" @click="openBtnEdit()">
        按钮编辑器
      </div>
    </div>
    <div class="page_center">
      <div class="table_container">
        <div class="right_table">
          <span class="addBtn" @click="addCmd();">新建指令</span>
          <table class="table_list">
            <tr>
              <th colspan="5" style="background: #083775;color: #7dd7f9;">*选择指令*</th>
            </tr>
            <tr>
              <th>序号</th>
              <th>显示文本</th>
              <th>指令类型</th>
              <th>指令消息</th>
              <th style="padding: 0 30px">操作</th>
            </tr>
            <tr v-for="item in cmdListData" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.type==1?'字符':'十六进制'}}</td>
                <td>{{item.cmd}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="editCmd(item)">
                      编辑
                    </div>
                    <div class="_record" @click="delCmd(item)">
                      删除
                    </div>
                  </div>
                </td>
            </tr>
            <tr class="divide_pages">
                <td colspan="7" v-if="cmdListData.length == 0 && cmdListQuery.page == 1">
                  没有更多的数据了
                </td>
                <td colspan="5" v-else>
                  共条{{cmdListTotal}}记录，当前显示第{{cmdListQuery.page}}/{{cmdListPageSum}}页
                  <a @click="changeCmdListPages(1)">首页</a>
                  <a @click="changeCmdListPages(cmdListQuery.page-1)">上一页</a>
                  <a @click="changeCmdListPages(cmdListQuery.page+1)">下一页</a>
                  <a @click="changeCmdListPages(cmdListQuery)">尾页</a>
                </td>
            </tr>
          </table>
        </div>
      </div>
      <el-dialog :visible.sync="isShowSaveMsg" custom-class="send_message_table" title="编辑指令">
        <el-form ref="saveCmdForm" :rules="rules" :model="saveCmdForm" label-position="left" label-width="100px">
          <el-form-item label="指令名称" prop="name">
            <el-input v-model="saveCmdForm.name"/>
          </el-form-item>
          <el-form-item label="指令类型" prop="type">
              <el-radio-group v-model="saveCmdForm.type">
                <el-radio :label="1">字符</el-radio>
                <el-radio :label="2">十六进制</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="指令内容" prop="cmd">
            <el-input v-model="saveCmdForm.cmd"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowSaveMsg = false;">取消</el-button>
          <el-button type="primary" @click="saveCmd()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { Message, MessageBox } from 'element-ui'
import Multiselect from 'vue-multiselect'
export default {
  name: 'btnEdit',
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      isShowSaveMsg:false,
      cmdListData:[],
      cmdListQuery:{
        page: 1,
        pageSize: 10,
        deviceId:0
      },
      cmdListPageSum:0,
      cmdListTotal:0,
      saveCmdForm:{
        id:0,
        name:'',
        type:1,
        cmd:''
      },
      rules:{
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        type: [{ required: true, message: '必填项', trigger: 'blur' }],
        cmd: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initCmdList();
  },
  mounted() {
    
    
  },
  methods:{
    addCmd(){
      this.saveCmdForm = Object.assign({}, this.$options.data().saveCmdForm)
      this.isShowSaveMsg = true
      this.$nextTick(() => {
        this.$refs['saveCmdForm'].clearValidate()
      })
    },
    editCmd(item){
      this.saveCmdForm = item
      this.isShowSaveMsg = true
      this.$nextTick(() => {
        this.$refs['saveCmdForm'].clearValidate()
      })
    },
    saveCmd(){
      this.$refs['saveCmdForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/device/cmd/edit',
              data: this.saveCmdForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.isShowSaveMsg = false
              this.$notify({
                title: '成功',
                message: '编辑指令成功',
                type: 'success'
              });
              this.changeCmdListPages(1)
            })
          }
        })
    },
    delCmd(item){
      MessageBox.confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let params = {
              fetchUrl: '/sys/device/cmd/delete?id='+item.id,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              this.changeCmdListPages(1)
            })
        })
    },
    initCmdList(){
      this.cmdListQuery.page = 1;
      this.getCmdList();
    },
    changeCmdListPages(page){
      if(page > this.cmdListPageSum|| page < 1){
        return;
      }
      this.cmdListQuery.page = page;
      this.getCmdList();
    },
    getCmdList(){
      // 获取终端列表
      let params = {
        fetchUrl: '/sys/device/cmd/list',
        listQuery: this.cmdListQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.cmdListData = res.data.datas
        this.cmdListTotal = res.data.total
        this.cmdListPageSum = Math.ceil(res.data.total/this.cmdListQuery.pageSize)
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
    openBtnEdit() {
      this.$router.push('btnEdit')
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/btnEdit.scss';
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
