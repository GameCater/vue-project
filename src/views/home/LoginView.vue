<template>
  <div class="login">
    <el-card>
      <div slot="header">
        <span class="title">用户登录</span>
      </div>
      <el-form :model="loginInfo" class="login_form">
        <el-form-item>
          <el-input 
            placeholder="请输入邮箱号" 
            class="login_form_input"
            v-model.trim="loginInfo.email">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            placeholder="请输入密码" 
            class="login_form_input"
            type="password"
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
import { mapMutations } from 'vuex';
import md5 from 'md5';
export default {
  name: "LoginView",
  data() {
    return {
      loginInfo: {},
    };
  },
  computed: {
    pwd() {
      return md5(this.loginInfo.pwd);
    }
  },
  watch: {},
  methods: {
    ...mapMutations(['TAB_USER']),
    onSubmit() {
      this.$axios({
        url: '/api/login',
        method: 'post',
        data: {
          email: this.loginInfo.email,
          pwd: this.pwd
        }
      }).then(({ data }) => {
        const { status, data: user, token } = data;
        if (status) {
          // 更新状态机状态
          this.TAB_USER(user);
          // 本地存储token
          localStorage.setItem('token', token);
          this.$message({
            type: 'success',
            message: '登陆成功'
          })
          this.$router.replace('/home');
        } else {
          this.$message({
            type: 'error',
            message: '登陆失败'
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '登陆失败'
        })
      })
    }
  }
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