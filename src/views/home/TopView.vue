<template>
  <div class="top_list">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span class="text">电影推荐</span>
        <!-- <ul class="category_list">
          <li 
            v-for="(item, idx) in CATEGORY_LIST" 
            :key="item" 
            @click="getMoviesByCate(idx)"
            :class="bolderAndBigger(idx)">
            {{ item }}
          </li>
        </ul> -->
      </div>
      <div class="movies-list" v-if="moviesList">
        <el-row>
          <el-col
            :span="4"
            v-for="movieObj in moviesList"
            :key="movieObj._id">
            <router-link :to="'/home/detail/' + movieObj._id">
              <el-card
                :body-style="{ padding: '0px', margin: '10px' }"
                style="margin: 10px"
                shadow="never">
                <img
                  :src="movieObj.image"
                  class="image"
                  style="width: 100%; height: 200px"/>
                <div class="card_text_zone">
                  <span :title="movieObj.title">{{ movieObj.title }}</span>
                  <el-rate
                    :value="movieObj.rating / 2"
                    disabled
                    text-color="#2f4f4f"
                    :colors="['#2F4F4F', '#2F4F4F', '#2F4F4F']"
                    :show-score="false">
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
  name: "TopView",
  data() {
    return {
      moviesList: null,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {
    this.$axios.get('/api/gettop')
        .then((res) => {
          const { data: { status, data } } = res;
          if (status) {
            this.moviesList = data;
          }
        })
  },
};
</script>

<style scoped lang="scss">
.card_text_zone {
  padding: 8px;
  height: 40px;
  font-size: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .el-rate {
    line-height: initial;
    text-align: center;
  }
}
</style>