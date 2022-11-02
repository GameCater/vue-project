<template>
  <el-card>
    <div slot="header">
      <span>{{ $route.params.id ? '修改电影' : '新增电影'}}</span>
    </div>
    <el-form ref="myForm" :model="form" label-width="80px" style="">
      <el-form-item label="电影名">
        <el-input v-model.trim="form.title" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="演员名单">
        <el-input v-model.trim="form.actor" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="电影简介">
        <el-input type="textarea" v-model="form.brief" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="官方链接">
        <el-input v-model.trim="form.link" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="播放时间">
        <el-input v-model.number="form.timeCount" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="发售地区">
        <el-select v-model="form.areaName" placeholder="请选择发售地区" style="width: 100px">
          <el-option label="中国" value="中国"></el-option>
          <el-option label="美国" value="美国"></el-option>
          <el-option label="日本" value="日本"></el-option>
          <el-option label="德国" value="德国"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span="4">
          <el-date-picker value-format="timestamp" type="date" placeholder="选择日期" v-model="form.pbtime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="上映时间">
        <el-col :span="4">
          <el-date-picker value-format="timestamp" type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="语言">
        <el-checkbox-group v-model="form.language">
          <el-checkbox label="国语" name="language"></el-checkbox>
          <el-checkbox label="粤语" name="language"></el-checkbox>
          <el-checkbox label="英语" name="language"></el-checkbox>
          <el-checkbox label="日语" name="language"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio :label="0">禁止</el-radio>
          <el-radio :label="1">上映</el-radio>
          <el-radio :label="2">推荐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片地址">
        <!-- <el-input v-model.trim="form.image" style="width: 450px"></el-input> -->
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
        title: '',
        link: '',
        image: '',
        brief: '',
        actor: '',
        pbtime: Date.now(),
        category: 0,
        startDate: Date.now(),
        language: [],
        areaName: '',
        timeCount: 60,
        state: 1
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
        this.$axios.post('/api/addMovie', this.form)
          .then(({ data }) => {
            const { status, reason } = data;
            this.$message({
              message: status ? '更新成功' : '更新失败 ' + reason,
              type: status ? 'success' : 'error',
            })
            this.$router.replace('/admin/moviemanage');
        });
      }
    },
    onCancel() {
      this.$router.push('/admin/moviemanage');
    }
  },
  created() {
    this.model = this.$route.params.id ? 1 : 0;
  }
}
</script>

<style lang="scss" scoped>

</style>