<template>
    <div class="dialog_modal_page" v-if="isShowModal">
        <div class="dialog_modal">
            <div class="_title">
                新增
            </div>
            <div class="field_list">
                <div class="field_item" v-for="(item, index) in fieldList" :key="index">
                    <div class="field_name">
                        {{item.name}}:
                    </div>
                    <div class="field_value">
                        <input type="text" v-model="item.value">
                    </div>
                </div>
            </div>
            <div class="modal_btn">
                <div class="submit_btn" @click="submitModal">
                    确定
                </div>
                <div class="cancel_btn" @click="cancelModal">
                    取消
                </div>
            </div>
        </div>
        <div class="mask_modal" />
    </div>
 
</template>

<script>
export default {
  name: 'modal',
  props: ['isShowModal', 'fieldList'],
  data () {
    return {
    }
  },
  methods: {
      submitModal() {
          // 输入内容后可对 fieldList数据进行简单处理 （对应相应的字段名）就可以调用 新增 接口 
          // 调用成功后再通知父组件 需要关闭modal
          this.$emit('callbackModal', false)
      },
      cancelModal() {
          this.$emit('callbackModal', false)
      }
  }
}
</script>
<style lang="scss" scoped>
.dialog_modal_page{
    width: 100%;
    height: 1200px;
    position: absolute;
    z-index: 999;
    top:0;
    left:0;
    .dialog_modal{
        z-index:1000; 
        position: absolute;
        top: 15%;
        margin-left: 10%;
        width: 80%;
        height: 600px;
        background: #f4f4f4;
        border: 1px solid #E0BC25;
        border-radius: 5px;
        padding-top: 40px;
        ._title{
            text-align: center;
            font-size: 20px;
            color: #E0BC25;
            font-weight: 800;
            margin-bottom: 40px;
        }
        .field_list{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 0 50px;
            .field_item{
                width: 33.33%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80px;
                .field_name{
                    margin-right: 10px;
                    width: 20%;
                }
                .field_value{
                    width: 70%;
                    input{
                        height: 40px;
                    }
                }
            }

        }
        .modal_btn{
            display: flex;
            justify-content: space-around;
            margin: 20px 20%;
            .submit_btn{
                margin-right: 10px;
                height: 20px;
                width: 80px;
                line-height: 20px;
                text-align: center;
                padding: 10px;
                background: linear-gradient(90deg, rgb(23, 188, 1), rgb(115, 243, 23));
                border-radius: 4px;
                cursor: pointer
            }
            .cancel_btn{
                margin-right: 10px;
                height: 20px;
                width: 80px;
                line-height: 20px;
                text-align: center;
                padding: 10px;
                background: linear-gradient(90deg, rgba(188, 72, 1, 1), rgba(243, 204, 23, 1));
                border-radius: 4px;
                cursor: pointer
            }
        }
    }
    .mask_modal{
        z-index:999; 
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.8;
    }
}

</style>


