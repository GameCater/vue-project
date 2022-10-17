<template>
  <el-form ref="myForm" :model="form" label-width="80px" style="" v-if="form">
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
    <el-form-item label="图片地址">
      <el-input v-model.trim="form.image" style="width: 450px"></el-input>
    </el-form-item>
    <el-form-item label="电影评分">
      <el-input v-model.number="form.rating" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="评价人数">
      <el-input v-model.number="form.judge" style="width: 200px"></el-input>
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
        <el-date-picker type="date" placeholder="选择日期" v-model="form.pbtime" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="上映时间">
      <el-col :span="4">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="语言">
      <el-checkbox-group v-model="form.language">
        <el-checkbox label="粤语" name="language" value="粤语"></el-checkbox>
        <el-checkbox label="国语" name="language" value="国语"></el-checkbox>
        <el-checkbox label="英语" name="language" value="英语"></el-checkbox>
        <el-checkbox label="日语" name="language" value="日语"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio-group v-model="form.state">
        <el-radio label="上映" value="0"></el-radio>
        <el-radio label="禁止" value="1"></el-radio>
        <el-radio label="推荐" value="2"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button 
        @click="onSubmit"
        style="background-color: #2F4F4F; color: white;">确认修改
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      updateForm: Object,
    },
    data() {
      return {
        form: null
      }
    },
    watch: {
      'form.pbtime'(val) {
        this.form.pbtime = +this.form.pbtime;
      },
      'form.startDate'(val) {
        this.form.startDate = +this.form.startDate;
      }
    },
    methods: {
      onSubmit() {
        // this.$emit('updated', this.form);
        console.log(this.form);
        this.$axios.post('/api/updateMovie', this.form)
          .then(({ data }) => {
            const { status, reason } = data;
            this.$message({
              message: status ? '更新成功' : '更新失败 ' + reason,
              type: status ? 'success' : 'error',
            })
        });
        this.$emit('exit');
      },
      onCancel() {
        this.$emit('exit');
      }
    },
    mounted() {
      this.form = { ...this.updateForm };
    }
  }
</script>

<style lang="scss" scoped>
</style>