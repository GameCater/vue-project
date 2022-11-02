<template>
  <el-card>
    <div slot="header">
      <span>{{ $route.params.id ? '修改影院' : '新增影院'}}</span>
    </div>
    <el-form ref="myForm" :model="form" label-width="80px" style="">
      <el-form-item label="影院名">
        <el-input v-model.trim="form.brandName" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="影院地址">
        <el-input v-model.trim="form.cinemaAddress" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.cinemaPhone" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="影院logo">
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
        brandName: '',
        brandlogo: '',
        cinemaAddress: '',
        cinemaPhone: '',
      },
      model: 0, // 默认新增
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.form.brandlogo = response.path;
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSubmit() {
      if (this.model === 0) {
        this.$axios.post('/api/addCinema', this.form)
          .then(({ data }) => {
            const { status, e } = data;
            this.$message({
              message: status ? '更新成功' : '更新失败 ' + e,
              type: status ? 'success' : 'error',
            })
            this.$router.replace('/admin/cinemanage');
        });
      } else {
        this.$axios.post('/api/updateCinema', this.form)
          .then(({ data }) => {
            const { status, e } = data;
            this.$message({
              message: status ? '更新成功' : '更新失败 ' + e,
              type: status ? 'success' : 'error',
            })
            this.$router.replace('/admin/cinemanage');
        });
      }
    },
    onCancel() {
      this.$router.push('/admin/cinemanage');
    }
  },
  created() {
    this.model = this.$route.params.id ? 1 : 0;
    if (this.model === 1) {
      this.$axios.get('/api/fetchCinema', {
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