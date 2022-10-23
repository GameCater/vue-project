<template>
  <div id="app">
    <router-view></router-view>
    <el-backtop 
      :visibility-height="500"
      :bottom="50"
      :right="200">
    </el-backtop>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['TAB_USER']),
    checkUser() {
      // 检查用户登录状态是否过期
      this.$axios({
        url: '/api/loginCheck',
        method: 'post',
        data: { token: localStorage.getItem('token') }
      }).then(({ data }) => {
        const { status, err, data: user } = data;
        if (status) {
          this.TAB_USER(user.user);
        } else {
          this.TAB_USER();
        }
      }).catch((err) => {
        this.TAB_USER();
      })
    }
  },
  mounted() {
    this.checkUser();
  }
}
</script>

<style lang="scss">
  @import url('@/assets/style.scss');
  .el-icon-caret-top {
    color: #2f4f4f;
  }
</style>
