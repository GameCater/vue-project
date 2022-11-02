<template>
  <el-card>
    <div slot="header">
      <span>{{ $route.params.id ? '修改用户' : '新增用户'}}</span>
    </div>
    <el-form ref="myForm" :model="form" label-width="80px" style="">
      <el-form-item label="用户名">
        <el-input v-model.trim="form.name" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model.trim="form.nickname" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱账号">
        <el-input v-model.trim="form.email" style="width: 450px" aria-required></el-input>
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input type="password" v-model.trim="form.pwd" style="width: 450px" aria-required></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.card" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0">未知</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.state" placeholder="请设置用户权限" style="width: 100px">
          <el-option label="禁止" :value="0"></el-option>
          <el-option label="正常" :value="1"></el-option>
          <el-option label="vip" :value="2"></el-option>
          <el-option label="认证用户" :value="3"></el-option>
          <el-option label="超级管理员" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-upload
          name="img"
          ref="upload"
          action="http://localhost:6600/api/upload"
          :on-preview="handlePreview"
          :before-remove="beforeRemove"
          :on-success="uploadSuccess">
          <el-button size="small" type="primary" style="border: none; background-color: #2F4F4F; color: white;" >点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button 
          @click="onSubmit"
          style="background-color: #2F4F4F; color: white;">保存
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        age: 10,
        pwd: '',
        image: '',
        card: '',
        gender: 0,
        openid: '0',
        email: '',
        state: 1,
      },
      model: 0, // 默认新增
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.form.image = response.path;
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSubmit() {
      if (this.model === 0) {
        this.$axios.post('/api/addUser', this.form)
          .then(({ data }) => {
            const { status, e } = data;
            this.$message({
              message: status ? '新增成功' : '新增失败 ' + e,
              type: status ? 'success' : 'error',
            })
            this.$router.replace('/admin/usermanage');
        });
      } else {
        this.$axios.post('/api/updateUser', this.form)
          .then(({ data }) => {
            const { status, e } = data;
            this.$message({
              message: status ? '更新成功' : '更新失败 ' + e,
              type: status ? 'success' : 'error',
            })
            this.$router.replace('/admin/usermanage');
        });
      }
    },
    onCancel() {
      this.$router.push('/admin/usermanage');
    }
  },
  created() {
    this.model = this.$route.params.id ? 1 : 0;
    if (this.model === 1) {
      this.$axios.get('/api/fetchUser', {
        params: {
          id: this.$route.params.id,
        }
      }).then(response => {
        const { status, data } = response.data;
        if (status) {
          this.form = data;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>