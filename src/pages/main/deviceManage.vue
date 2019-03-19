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
        <div class="submit_btn" @click="createTerm">
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
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>             
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>一级管理10</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>测试样品00000111</td>
                <td>测试样品00000111</td>
              </tr> 
            </table>
          <div class="divide_pages">
            <span class="pageing">1</span>
            <span class="pageing">2</span>
            <span class="pageing">3</span>
          </div>
        </div>
      </div>
      <div class="bottom_title_display">
        <div class="orgnazition_title">
          ◆ 灯质类型 ◆
        </div>
        <div class="add_btn">
          新增灯步
        </div>
        <div class="del_btn">
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
                <div class="light_item" v-for="item in lightList" :key="item">
                  {{item}}
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
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>10</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>10</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>12</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>18</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>12</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>23</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>12</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>22</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>23</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>根节点</td>
                <td>杨工</td>
                <td>18920209393</td>
                <td>12</td>
                <td>测试样品00000111</td>
                <td class="opration_table">
                  <div class="opration_btn">
                    <div class="history_data">
                      编辑
                    </div>
                  </div>
                </td>
              </tr> 
            </table>
          <div class="divide_pages">
            <span class="pageing">1</span>
            <span class="pageing">2</span>
            <span class="pageing">3</span>
          </div>
        </div>
      </div>
    </div>
    <creatModal :isShowModal="isShowModal" :fieldList="fieldList" @callbackModal="callbackModal"/>
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
      treeData: [{
        title: '组织机构',
        expanded: true,
        children: [{
          title: '一级菜单01',
          expanded: true,
          children: [{
            expanded: true,
            title: '二级菜单01',
            children: [{
                    title: '三级菜单01',
                    expanded: true,
                    children: [
                        {
                            title: '四级菜单01',
                            expanded: false
                        }, 
                        {
                            title: '四级菜单02',
                            expanded: false
                        },
                        {
                            title: '四级菜单03',
                            expanded: false
                        }]
                }, {
                    title: '三级菜单02',
                    expanded: false
                }, {
                    title: '三级菜单03',
                    expanded: false
                }]
            }, {
            title: '二级菜单02',
            expanded: false
          }, {
            title: '二级菜单03',
            expanded: false
          }]
        }]
      }],
      fieldList: []
    }
  },
  created() {
  },
  mounted() {
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
    delLight() {
      this.lightList.pop()
    },
    addLight() {
      this.lightList.push('大灯真他妈亮啊')
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
    callbackModal(val) {
      // 弹窗回调
      this.isShowModal = val
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



