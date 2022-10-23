<template>
  <div class="movie">
    <el-card class="movie_content" v-if="movieInfo">
      <div slot="header">
        <span class="movie_title">{{ movieInfo.title }}</span>
      </div>
      <div class="movie_detail">
        <div class="movie_detail_main">
          <el-image 
              style="height: 240px"
              :src="movieInfo.image">
          </el-image>
          <div class="movie_detail_main_info">
            <p>导演: {{ movieInfo.actor }}</p>
            <p>类型: {{ movieInfo.category }}</p>
            <p>制片国家/地区: {{ movieInfo.areaName }}</p>
            <p>语言: {{ movieInfo.language }}</p>
            <p>发布时间: {{ movieInfo.pbtime | timeFormater}}</p>
            <p>上映时间: {{ movieInfo.startDate | timeFormater}}</p>
            <p>片长: {{ movieInfo.timeCount }} 分钟</p>
            <p>ID: {{ movieInfo._id}}</p>
          </div>
        </div>
        <div class="movie_detail_aside">
          <p>瞎几把评分</p>
          <div class="rating">
            <h2>{{ movieInfo.rating }}</h2>
            <div class="rating_aside">
              <el-rate
                :value="movieInfo.rating/2"
                disabled>
              </el-rate>
              <span class="rating_aside_overview">{{ movieInfo.judge }}评价</span>
            </div>
          </div>
        </div>
      </div>
      <div class="movie_detail_footer">
        <h5>{{ movieInfo.title }}的剧情简介 ---------</h5>
        <p>
          {{ movieInfo.brief }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: "DetailView",
  data() {
    return {
      movieInfo: null
    };
  },
  computed: {},
  watch: {},
  filters: {
    timeFormater(val, str='YYYY-MM-DD') {
      return dayjs(val).format(str);
    }
  },
  methods: {
    getMovieDetail() {
      this.$axios
        .get("/api/getMovieDetail/", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then(
          (res) => {
            this.movieInfo = res.data.data;
          },
          (err) => {
            this.$message(err);
            this.$router.push('/home');
          }
        );
    },
  },
  created() {
    this.getMovieDetail();
  },
};
</script>

<style scoped lang="scss">

  .movie_title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2f4f4f;
  }
  .movie_detail {
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    .movie_detail_main {
      flex: 3;

      display: flex;
      flex-direction: row;
      gap: 10px;

      .movie_detail_main_info {
        P {
          margin: 5px;
          font-size: .9rem;
        }
      }
    }

    .movie_detail_aside {
      width: 171px;
      flex: 1;
      padding: 0 15px;
      border-left: 1px solid #eee;

      font-size: .9rem;
      
      p {
        margin: 0;
        font-size: .7rem;
      }
      .rating {
        height: 50px;
        display: flex;
        align-items: center;
        gap: 10px;

        .rating_aside_overview {
          font-size: .5rem;
          margin-left: 4px;
        }
        .el-rate {
          width: 120px;
          .el-rate__item {
            width: 10px;
            height: 10px;
            .el-rate__icon.el-icon-star-on::before{
              margin-right: 1px;
            }
          }
        }
      }
    }
  }
  .movie_detail_footer {
    & > h5 {
      margin: 15px 0;
      color: #2f4f4f;
    }
    p {
      margin: 0;
      font-size: .9rem;
      letter-spacing: 1px;
      line-height: 1.5;
    }
  }
</style>