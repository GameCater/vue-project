<template>
  <div id="app">
    <router-view></router-view>
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
          this.TAB_USER(user);
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
</style>
