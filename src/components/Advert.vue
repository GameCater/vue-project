<template>
  <div class="ad-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">{{ prop ? prop.title : '展览框' }}</span>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
  export default {
    props: {
      prop: Object,
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .ad-list {
    .box-card {
      .el-card__header {
        background-color: #2F4F4F;
      }
      .text {
        font-size: .8rem;
        font-weight: bold;
        letter-spacing: 1px;
      }
    
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }
    }
  }
</style>