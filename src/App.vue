<template>
  <div id="app" v-cloak>
      <router-view>
      </router-view>
  </div>
</template>
<style>
.multiselect__tags{
  min-height: 30px!important;
  height: 30px!important;
  padding: 4px 30px 0 4px !important;
}
.multiselect{
  min-height: 30px!important;
}
.multiselect__spinner{
  height: 30px;
}
.multiselect__select{
  height: 30px !important;
}
.el-input__inner{
  height: 30px!important;
  line-height: 30px!important;
}
.el-input__prefix, .el-input__suffix{
  top: 4px;
}
.el-input__icon{
  line-height: 30px!important;
}
</style>

