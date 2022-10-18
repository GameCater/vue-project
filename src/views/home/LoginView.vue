<template>
  <div class="login">
    <el-card>
      <div slot="header">
        <span class="title">用户登录</span>
      </div>
      <el-form :model="loginInfo" class="login_form">
        <el-form-item>
          <el-input 
            placeholder="请输入账号" 
            class="login_form_input"
            v-model.trim="loginInfo.username">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            placeholder="请输入密码" 
            class="login_form_input"
            v-model.trim="loginInfo.pwd">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            class="login_form_submit"
            style="background-color: #2f4f4f; color: white; font-weight: bold; width: 300px;"
            @click="onSubmit">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      loginInfo: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit() {

    }
  },
  components: {},
  created() {},
  /*组件内的守卫*/
  beforeRouteLeave(to, from, next) {
    //判断当前路由离开时触发 函数
    this.$confirm('确认取消登录?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          confirmButtonClass: 'message_confirm_button'
        }).then(() => {
          next();
        })
  },
};
</script>

<style scoped lang="scss">
.login_form {
  width: 300px;
  margin: 0 auto;
  .login_form_input {
    /* 不奏效 */
    input:focus {
      border: 2px solid #2f4f4f;
      outline: none;
    }
  }
  .el-form-item:last-child {
    text-align: center;
  }

  .message_confirm_button {
    background-color: #2f4f4f; 
    color: white; 
    font-weight: bold;
  }
}
</style>