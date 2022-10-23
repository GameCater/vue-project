<template>
  <div class="user">
    <el-card class="user_box">
      <div slot="header">
        <span>用户中心</span>
      </div>
      <div class="user_detail" v-if="userInfo">
        <div class="user_detail_main">
          <el-image 
              style="height: 240px; width: 240px; border: 2px solid #eee"
              :src="userInfo.image">
          </el-image>
          <div class="user_detail_main_info">
            <el-form ref="form" :model="userInfo" label-width="80px" size="medium" :disabled="cannotUpdate">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="userInfo.nickname"></el-input>
              </el-form-item>
              <el-form-item label="密码" v-if="!cannotUpdate">
                <el-input type="password" v-model="userInfo.pwd"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model.number="userInfo.age"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model.number="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="userInfo.gender" size="medium">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号" v-if="!cannotUpdate">
                <el-input v-model="userInfo.card"></el-input>
              </el-form-item>
              <el-form-item label="小程序ID" v-if="!cannotUpdate && userInfo.openid">
                <el-input v-model="userInfo.openid" disabled></el-input>
              </el-form-item>
              <el-form-item size="large" v-if="!cannotUpdate">
                <el-button size="mini" @click="onSubmit">保存</el-button>
                <el-button size="mini" @click="handleCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="user_detail_aside">
          <div class="operation">
            <el-button :class="{update:true, notShow: editShow}" type="primary" icon="el-icon-edit" circle @click="update"></el-button>
            <el-button :class="{update:true, notShow: editShow}" type="primary" icon="el-icon-switch-button" circle @click="exit"></el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UcenterView",
  data() {
    return {
      userInfo: null,
      cannotUpdate: true,
      editShow: false,
      changeCoreAccount: false
    };
  },
  watch: {},
  methods: {
    exit() {
      this.$store.commit('TAB_USER');
      localStorage.clear();
      this.$router.replace('/home/login');
    },
    onSubmit() {
      const user = this.userInfo;
      if (!this.changeCoreAccount) {
        delete user.pwd;
      }
      this.$axios.post('/api/updateUserInfo', { user })
          .then((res) => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '更新失败'
              })
            }
          }).then(() => {
            if (this.changeCoreAccount) {
              this.$store.commit('TAB_USER');
              localStorage.clear();
              this.$router.replace('/home/login');
              return;
            }
            this.update();
            this.getUserInfo();
          }).catch((err) => {
            console.log(err);
          })
    },
    pretreated(user) {

    },
    update() {
      this.cannotUpdate = !this.cannotUpdate;
      this.editShow = !this.editShow;
    },
    handleCancel() {
      this.userInfo = { ...this.oldUserInfo };
      this.cannotUpdate = !this.cannotUpdate;
      this.editShow = !this.editShow;
    },
    getUserInfo() {
      this.$axios.get(`/api/getUserInfo?id=${this.$store.state.USER._id}`)
        .then((res) => {
          const { data: { message, code, data: user } } = res;
          if (code === 200) {
            this.userInfo = user;
            this.oldUserInfo = { ...user };
          }
        })
    }
  },
  components: {},
  mounted() {
    this.getUserInfo();
  },
  watch: {
    'userInfo.pwd'(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal !== oldVal) {
        this.changeCoreAccount = true;
      }
    },
    'userInfo.email'(newVal, oldVal) {
      if (newVal !== oldVal)
        this.changeCoreAccount = true;
    }
  }
};
</script>

<style scoped lang="scss">
.user_detail {
  display: flex;
  flex-direction: row;
  align-items:flex-end;
  justify-content: space-around;

  gap: 50px;
  .user_detail_main {
    display: flex;
    flex-direction: row;
    align-items: center;

    .el-form {
      padding: 20px;
      .el-form-item {
        margin: 15px;
      }
      .el-form-item:last-child {
        margin-bottom: 0;
      }
    }
  }

  .user_detail_aside {
    .update {
      margin-bottom: 20px;
      background-color: #2f4f4f;
      border: none;
    }
    .notShow {
      display: none;
    }
  }
}
</style>