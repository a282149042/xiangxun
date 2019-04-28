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
          <div class="monitoring_btn active" @click="openSystemManage()">
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
        <div class="orgnazition_title">
          ◆ 组织机构 ◆
        </div>
        <div class="submit_btn" @click="addInstitution">
          新增
        </div>
      </div>
      <div class="table_container">
        <div class="left_table">
          <div class="three_tree_level">
            <groupTree :treeData="treeData" @searchOrganizeList="searchOrganizeList" :mtype="2"></groupTree>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr>
                <th>上级机构</th>
                <th>机构编码/机构名称</th>
                <th>联系人</th>
                <th>联系人电话</th>
                <th>备 注 </th>
                <th style="padding: 0 30px">操作</th>
              </tr>
              <tr v-for="item in organizeListData" :key="item.id">
                <td>{{item.parentName}}</td>
                <td>{{item.name}}</td>
                <td>{{item.contacts}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.remark}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="editInstitution(item)">
                      编辑
                    </div>
                    <div class="_record" @click="deleteUserItem(item.id, 1)">
                      删除
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="divide_pages">
                  <td colspan="6" v-if="organizeListData.length == 0 && listOrganizeQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="6" v-else>
                    共条{{organizeTotal}}记录，当前显示第{{listOrganizeQuery.page}}/{{pageOrganSum}}页
                    <a @click="changeOrganPages(1)">首页</a>
                    <a @click="changeOrganPages(listOrganizeQuery.page-1)">上一页</a>
                    <a @click="changeOrganPages(listOrganizeQuery.page+1)">下一页</a>
                    <a @click="changeOrganPages(pageOrganSum)">尾页</a>
                  </td>
              </tr>
            </table>
          <!-- <div class="divide_pages">
            
            <span class="pageing">1</span>
            <span class="pageing">2</span>
            <span class="pageing">3</span>
          </div> -->
        </div>
      </div>
      <div class="bottom_title_display">
        <div class="orgnazition_title">
          ◆ 用户管理 ◆
        </div>
        <div class="submit_btn" @click="addUserItem">
          新增
        </div>
      </div>
      <div class="table_container">
        <div class="left_table">
          <div class="three_tree_level">
            <groupTree :treeData="treeData" @searchUserListData="searchUserListData" :mtype="3"></groupTree>
          </div>
        </div>
        <div class="right_table">
          <table class="table_list">
              <tr style="background: #A59226;">
                <th>姓名</th>
                <th>登录名</th>
                <th>所属机构</th>
                <th>联系电话</th>
                <th>email </th>
                <th>状态</th>
                <th style="padding: 0 30px">操作</th>
              </tr>
              <tr v-for="(item, index) in userListData" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.uname}}</td>
                <td>{{item.organizeName}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.email}}</td>
                <td>{{item.status}}</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data" @click="editUserItem(item, 1)">
                      编辑
                    </div>
                    <div class="_record" @click="deleteUserItem(item.id, 2)">
                      删除
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="divide_pages">
                  <td colspan="7" v-if="userListData.length == 0 && listQuery.page == 1">
                    没有更多的数据了
                  </td>
                  <td colspan="7" v-else>
                    共条{{userTotal}}记录，当前显示第{{listQuery.page}}/{{pageSum}}页
                    <a @click="changePages(1)">首页</a>
                    <a @click="changePages(listQuery.page-1)">上一页</a>
                    <a @click="changePages(listQuery.page+1)">下一页</a>
                    <a @click="changePages(pageSum)">尾页</a>
                  </td>
              </tr>
            </table>
        </div>
      </div>
    </div>
    <el-dialog :title="`${userStatus}机构`" :visible.sync="organizeDialogFormVisible" width="710px">
      <el-form ref="organizeDataForm" :rules="rules" :model="organizeDataForm" label-position="left" label-width="100px">
        <el-form-item label="上级机构" prop="parentId">
          <el-select v-model="organizeDataForm.parentId" clearable  style="width:510px">
            <el-option label="无" value="0">无</el-option>
            <el-option
              v-for="(item, index) in organizeListData"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="organizeDataForm.name"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="organizeDataForm.contacts"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="organizeDataForm.remark"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="organizeDataForm.phone"  style="width:510px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="organizeDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="userStatus === '编辑'?updateData(1):createData(1)">确定</el-button>
      </div>
    </el-dialog>
   <!-- <el-dialog :title="`${textMap[dialogStatus]}管理员`" :visible.sync="dialogFormVisible"> -->
   <el-dialog :title="`${userStatus}管理员`" :visible.sync="userDialogFormVisible" width="710px">
      <el-form ref="userDataForm" :rules="rules" :model="userDataForm" label-position="left" label-width="100px">
        <el-form-item label="类型" prop="userType">
          <template>
              <el-radio v-model="userType" label="1">超级管理员</el-radio>
              <el-radio v-model="userType" label="2">管理员</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="所属机构" prop="organizeId">
          <el-select v-model="userDataForm.organizeId" clearable  style="width:510px">
            <el-option
              v-for="(item, index) in organizeListData"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userDataForm.name"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="登录名" prop="uname">
          <el-input v-model="userDataForm.uname"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="userDataForm.pwd" type="password"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userDataForm.phone"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userDataForm.email"  style="width:510px"/>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
           <!-- 是否禁用 -->
          <el-switch
            v-model="switchValue"
            active-text="启用"
            inactive-text="禁用">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="userStatus === '编辑'?updateData(2):createData(2)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import md5 from 'md5'
import { Message, MessageBox } from 'element-ui'
import Multiselect from 'vue-multiselect'
import groupTree from '@/components/groupTree.vue'
export default {
  name: 'monitoring',
  components: {
    groupTree
  },
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      yearsList: [],
      DateList: [],
      dateData: [],
      pageSum: 1,
      pageOrganSum: 1,
      userDialogFormVisible: false,
      organizeDialogFormVisible: false,
      userType: '1',
      switchValue: true,
      userDataForm: {
        "organizeId": "",
        "uname": "",
        "pwd": "",
        "name": "",
        "phone": "",
        "userType": '1',
        "email": "",
        "status": '1'
      },
      organizeDataForm: {
         "name": "",
        "contacts": "",
        "phone": "",
        "remark": "",
        "parentId": ''
      },
        
      activeUserIndex: 1,
      activeOrganizationIndex: 1,
      userStatus: "添加",
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      selectedArea: "长沙交警支队",
      areaList: ['长沙交警支队', '浏阳市交警支队', '株洲市交警支队', '宁乡市交警支队'],
      selectedTerminal: '爆闪灯',
      terminalList: ['爆闪灯','黄慢（闪）灯', '点阵式主动发光标志','面阵式全透发光标志' ,'面阵式半透发光标志'],
      monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
      treeData: [],
      userListData:[],
      listQuery: {
        "page": 1,
        "pageSize": 10,
        "organizeId": 0
      },
      userTotal:0,
      listOrganizeQuery: {
        "page": 1,
        "pageSize": 10,
        "organizeId": 0
      },
      organizeTotal: 0,
      organizeTreeListData: [],
      organizeListData: [],
      rules: {
        organizeId: [{ required: true, message: '必填项', trigger: 'blur' }],
        uname: [{ required: true, message: '必填项', trigger: 'blur' }],
        pwd: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        phone: [{ required: true, message: '必填项', trigger: 'blur' }],
        email: [{ required: true, message: '必填项', trigger: 'blur' }],
        status: [{ required: true, message: '必填项', trigger: 'blur' }],
        contacts: [{ required: true, message: '必填项', trigger: 'blur' }],
        remark: [{ required: true, message: '必填项', trigger: 'blur' }],
        parentId: [{ required: true, message: '必填项', trigger: 'blur' }],
        userType: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getTreeList()
    this.getOrganizeList()
    this.getUserListData()
  },
  mounted() {
  },
  methods:{
    changePages(pages) {
      if(pages > this.pageSum|| pages < 1){
        return;
      }
      this.activeUserIndex = pages
      this.listQuery.page = pages
      this.getUserListData()
    },
    changeOrganPages(pages){
      if(pages > this.pageOrganSum|| pages < 1){
        return;
      }
      this.activeOrganizationIndex = pages
      this.listOrganizeQuery.page = pages
      this.getOrganizeList()
    },
    getTreeList(){
      // /organize/getTreeList
      let params = {
        fetchUrl: '/sys/organize/getTreeList'
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.treeData = res.data
      })
    },
    searchOrganizeList(organizeId){
      this.listOrganizeQuery.organizeId = organizeId
      this.listOrganizeQuery.page=1
      this.getOrganizeList()
    },
    getOrganizeList(){
      // 获取机构列表
      let params = {
        fetchUrl: '/sys/organize/list',
        listQuery: this.listOrganizeQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.organizeListData = res.data.datas
        this.organizeTotal = res.data.total
        this.pageOrganSum = Math.ceil(res.data.total/this.listOrganizeQuery.pageSize)
      })
    },
    searchUserListData(organizeId){
      this.listQuery.organizeId = organizeId
      this.listQuery.page=1
      this.getUserListData ()
    },
    getUserListData () {
      let params = {
        fetchUrl: '/sys/user/list',
        listQuery: this.listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        this.userListData = res.data.datas
        this.userTotal = res.data.total
        this.pageSum = Math.ceil(res.data.total/this.listQuery.pageSize)
      })
    },
    addUserItem(){
      // 添加用户
      this.userStatus = '添加'
      this.userDataForm = Object.assign({}, this.$options.data().userDataForm)
      this.userDialogFormVisible = true
      this.userType = '1'
      this.switchValue = true
      this.$nextTick(() => {
        this.$refs['userDataForm'].clearValidate()
      })
    },
    editUserItem(item) {
      this.userStatus = "编辑"
      this.userDataForm = item
      this.userDataForm.userType = this.userType
      this.userDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userDataForm'].clearValidate()
      })
    },
    createData(type) {
      if (type === 2) {
        this.$refs['userDataForm'].validate((valid) => {
          this.userDataForm.userType = this.userType
          if (valid) {
            this.userDataForm.status = this.switchValue ? 1 : 2
            this.userDataForm.pwd = md5(this.userDataForm.pwd)
            let params = {
              fetchUrl: '/sys/user/add',
              data: this.userDataForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.userDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '添加管理员成功',
                type: 'success'
              });
              this.activeUserIndex = 1
              this.listQuery.page = 1
              this.getUserListData()
              this.userDataForm = Object.assign({}, this.$options.data().userDataForm)
            })
          }
        })
      }
      if (type === 1) {
        this.$refs['organizeDataForm'].validate((valid) => {
          // this.userDataForm.userType = this.userType
          if (valid) {
            // this.userDataForm.status = this.switchValue ? 1 : 2
            // this.userDataForm.pwd = md5(this.userDataForm.pwd)
            let params = {
              fetchUrl: '/sys/organize/add',
              data: this.organizeDataForm
            }
            this.$store.dispatch('AddMembers', params).then(res => {
              this.organizeDialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '添加机构成功',
                type: 'success'
              });
              this.activeOrganizationIndex = 1 // 机构分页
              this.listOrganizeQuery.page = 1
              this.getOrganizeList()
              this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
            })
          }
        })
      }
    },
    updateData(type) {
      if (type === 1) {
        this.$refs['organizeDataForm'].validate((valid) => {
          if (valid) {
            let params = {
              fetchUrl: '/sys/organize/edit',
              data: this.organizeDataForm
            }
            this.$store.dispatch('EditMembers', params).then(res => {
              this.organizeDialogFormVisible = false
              this.activeOrganizationIndex = 1
              this.listOrganizeQuery.page = 1
              this.$notify({
                title: '成功',
                message: '修改机构资料成功',
                type: 'success'
              });
              this.getOrganizeList()
              this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
            })
          }
        })
      }
      if (type === 2) {
        this.$refs['userDataForm'].validate((valid) => {
          if (valid) {
            this.userDataForm.status = this.switchValue ? 1 : 2
            this.userDataForm.userType = this.userType
            if(this.userDataForm.pwd.length != 32){
              this.userDataForm.pwd = md5(this.userDataForm.pwd)
            }
            let params = {
              fetchUrl: '/sys/user/edit',
              data: this.userDataForm
            }
            this.$store.dispatch('EditMembers', params).then(res => {
              this.userDialogFormVisible = false
              this.activeUserIndex = 1
              this.listQuery.page = 1
              this.$notify({
                title: '成功',
                message: '修改管理员资料成功',
                type: 'success'
              });
              this.getUserListData()
              this.userDataForm = Object.assign({}, this.$options.data().userDataForm)
            })
          }
        })
      }
    },
    deleteUserItem(id, type){
      // 删除用户
      MessageBox.confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          if (type === 1){
            let params = {
              fetchUrl: '/sys/organize/delete?id='+id,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              this.activeUserIndex = 1
              this.listQuery.page = 1
              this.getOrganizeList()
            })
          }
          if (type === 2) {
            let params = {
              fetchUrl: '/sys/user/delete?id='+id,
              data: {}
            }
            this.$store.dispatch('DeleteMembers', params).then(res => {
              this.activeOrganizationIndex = 1
              this.listOrganizeQuery.page = 1
              this.getUserListData()
            })
          }
        })
    },
    addInstitution(){
      this.organizeDialogFormVisible = true
      // 添加用户
      this.userStatus = '添加'
      this.organizeDataForm = Object.assign({}, this.$options.data().organizeDataForm)
      // this.userType = '1'
      // this.switchValue = true
      this.$nextTick(() => {
        this.$refs['organizeDataForm'].clearValidate()
      })
    },
    editInstitution(item) {
      this.userStatus = "编辑"
      this.organizeDataForm = item
      // this.userDataForm.userType = this.userType
      this.organizeDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['organizeDataForm'].clearValidate()
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
  @import '@/assets/styles/system-manage.scss';
</style>




