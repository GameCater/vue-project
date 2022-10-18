<template>
  <dl class="card">
    <dt class="card-header">RegView</dt>
    <dd class="card-body">
      <div>用户头像</div>
      <input type="text" v-model.trim="user.image" class="el-input__inner" />
      <div>
        <el-image :src="user.image" class="float-right"></el-image>
        <el-upload
          drag
          name="img"
          action="/api/upload"
          :on-success="handlerSuccess"
          :on-change="handleChangeFn"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "RegView",
  data() {
    return {
      user: {
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
</style>