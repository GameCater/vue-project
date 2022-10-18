<template>
  <div class="ad-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">电影列表</span>
      </div>
      <div class="movies-list" v-if="moviesList">
        <el-row>
          <el-col
            :span="6"
            v-for="movieObj in moviesList.data"
            :key="movieObj._id"
          >
            <router-link :to="$route.path + '/detail/' + movieObj._id">
              <el-card
                :body-style="{ padding: '0px', margin: '10px' }"
                style="margin: 10px"
                shadow="never"
              >
                <img
                  :src="movieObj.image"
                  class="image"
                  style="width: 100%; height: 300px"
                />
                <div class="card_text_zone">
                  <span :title="movieObj.title">{{ movieObj.title }}</span>
                  <el-rate
                    :value="movieObj.rating / 2"
                    disabled
                    show-score
                    text-color="#2f4f4f"
                    :colors="['#2F4F4F', '#2F4F4F', '#2F4F4F']"
                  >
                  </el-rate>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SubHomeView",
  data() {
    return {
      moviesList: null,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {},
  mounted() {
    this.$axios.get("/api/getmovie").then((res) => {
      this.moviesList = res.data;
    });
  },
};
</script>

<style scoped lang="scss">
.card_text_zone {
  padding: 14px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-rate {
  text-align: center;
  .el-rate__item {
    width: 5px;
    height: 5px;
  }
}
</style>