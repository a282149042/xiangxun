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
          <span class="addBtn" @click="addItem();">新建指令</span>
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
            <!-- <tr v-for="item in lightListData" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.productName}}</td>
              <td>{{item.lineControl}}</td>
              <td>{{item.onTime}}</td>
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
            </tr> -->
            <tr>
              <td>1</td>
              <td>aaa</td>
              <td>cdd</td>
              <td>ffffff</td>
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
                <td colspan="5" v-else>
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
      <div class="addContent" id="addContent">
        <p class="title">新增指令</p>
        <p class="item">
          <span>输出文本</span>
          <input class="input-txt" type="text" placeholder="请输入显示文本">
        </p>
        <div class="item" style="margin-left:30px">
          <span style="float:left">输出文本</span>
          <div class="input-radio" style="float:left"><input type="radio" name="textname">字符</div>
          <div class="input-radio" ><input type="radio" name="textname">十六进制</div>
        </div>
        <p class="item">
          <span>指令消息</span>
          <input class="input-txt" type="text" placeholder="请输入指令消息">
        </p>
        <p class="btn">
          <span @click="cansel()">取消</span>
          <span @click="ok()">确定</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Multiselect from 'vue-multiselect'
export default {
  name: 'btnEdit',
  data() {
    return {
      dateTime: moment().format('YYYY.MM.DD'),
      yearsList: [],
      DateList: [],
      dateData: [],
      hoursList: [],
      hoursData: [],
      lightListData: [],
      listLightQuery: {
        page: 1,
        pageSize: 10,
        productId: 0
      },
      pageTermSum: 0,
      pageTermTotal: 0,
      pageLightSum: 0,
      pageLightTotal: 0,
    }
  },
  created() {
    
  },
  mounted() {
    
    
  },
  methods:{
    
    getAllSourceList(listQuery) {
      let params = {
        fetchUrl: '/sys/count/dataSummary',
        listQuery: listQuery
      }
      this.$store.dispatch('GetList', params).then(res => {
        let data = res.data
        console.log('****数据汇总********',res.data)
        this.allSourceData = data
      })
    },
    addItem() {
      document.getElementById("addContent").setAttribute('style', 'display: block');
    },
    cansel() {
      document.getElementById("addContent").setAttribute('style', 'display: none');
    },
    ok() {
      alert("添加啦")
      document.getElementById("addContent").setAttribute('style', 'display: none');
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
    
  },
}
</script>
<style lang="scss" scoped>
  @import '@/assets/styles/btnEdit.scss';
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
