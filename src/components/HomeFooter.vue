<template>
  <div class="content">
    <div class="front">
      <slot :front="front" name="front"></slot>
    </div>
    <div class="end">
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        front: 'developed and designed by alo in 2022'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    overflow: hidden;

    & > div {
      display: inline-block;
    }
    .front {
      float: left;
      line-height: initial;
      line-height: 60px;
    }
    .end {
      float: right;
    }
  }
</style>