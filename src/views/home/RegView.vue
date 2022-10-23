<template>
  <div class="register">
    <el-card>
      <div slot="header">
        <span class="title">注册新用户</span>
      </div>
      <el-form :model="registerInfo" class="register_form">
        <el-form-item>
          <el-input 
            placeholder="邮箱"
            class="login_form_input"
            v-model.trim="registerInfo.email">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            placeholder="密码" 
            class="login_form_input"
            type="password"
            v-model.trim="registerInfo.pwd">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            class="login_form_submit"
            style="background-color: #2f4f4f; color: white; font-weight: bold; width: 300px;"
            @click="onSubmit">注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from 'md5';
export default {
  name: "RegView",
  data() {
    return {
      registerInfo: {},
    };
  },
  computed: {
    pwd() {
      return md5(this.registerInfo.pwd);
    }
  },
  methods: {
    onSubmit() {
      this.$axios({
        url: '/api/adduserdata',
        method: 'post',
        data: {
          email: this.registerInfo.email,
          pwd: this.pwd
        }
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '注册成功'
        })
        this.$router.replace('/home');
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  },
};
</script>

<style scoped lang="scss">
.register_form {
  width: 300px;
  margin: 0 auto;
}
</style>