<template>
  <div class="register">
    <el-card>
      <div slot="header">
        <span class="title">注册新用户</span>
      </div>
      <el-form :model="registerInfo" class="register_form">
        <el-form-item>
          <el-input 
            placeholder="账号"
            class="login_form_input"
            v-model.trim="registerInfo.username">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            placeholder="密码" 
            class="login_form_input"
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
export default {
  name: "RegView",
  data() {
    return {
      registerInfo: {
        image: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    handlerSuccess(res, file) {
      console.log(res.path, file);
      this.user.image = "http://localhost:6600/" + res.path;
    },
    handleChangeFn(file, fileList) {
      console.log(file, fileList);
    },
    onSubmit() {

    }
  },
  components: {},
  created() {},
  mounted() {
    console.log("加载完成 ");
    console.log(this.$route.meta.title);
    // document.title=this.$route.meta.title
  },
};
</script>

<style scoped lang="scss">
.register_form {
  width: 300px;
  margin: 0 auto;
}
</style>