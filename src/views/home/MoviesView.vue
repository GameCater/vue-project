<template>
  <div class="ad-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span class="text">热门分类</span>
        <ul class="category_list">
          <li 
            v-for="(item, idx) in CATEGORY_LIST" 
            :key="item" 
            @click="getMoviesByCate(idx)"
            :class="bolderAndBigger(idx)">
            {{ item }}
          </li>
        </ul>
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
import { mapState } from 'vuex';

export default {
  name: "MoviesView",
  data() {
    return {
      moviesList: null,
      current: 0
    };
  },
  computed: {
    ...mapState(['CATEGORY_LIST']),
  },
  watch: {},
  methods: {
    bolderAndBigger(idx) {
      return this.current === idx ? ['bold', 'big'] : '';
    },
    getMoviesByCate(cate){
      this.current = cate;
      this.$axios({
        url: '/api/getcate',
        method: 'get',
        params: { cate }
      }).then(({ data }) => {
        const { status, data: movies } = data;
        if (status) {
          this.moviesList = movies;
        }
      })
    }
  },
  components: {},
  created() {
    this.getMoviesByCate(0);
  },
};
</script>

<style scoped lang="scss">
.bold {
  font-weight: bold;
}
.big {
  font-size: 1rem;
}
.header {
  display: flex;
  align-items: baseline;
  .category_list {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    gap: 10px;
    li {
      font-size: .8rem;
      cursor: pointer;
      &:hover {
        color: #2f4f4f;
        font-weight: bold;
      }
    }
  }
}
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