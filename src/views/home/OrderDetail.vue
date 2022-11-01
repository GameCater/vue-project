<template>
  <div class="order">
    <el-card class="movie_content" v-if="orderInfo && sessionInfo">
      <div slot="header">
        <span class="order_title">订单信息</span>
      </div>
      <div class="order_detail">
        <div class="order_info">
          <h1>{{ sessionInfo.movies[0].title }}</h1>
          <h3 style="color: #2f4f4f;">时间： {{ sessionInfo.startTime | timeFormat}}</h3>
          <h3>地址：{{ sessionInfo.cinema[0].brandName }} {{ sessionInfo.cinema[0].cinemaAddress }}</h3>
          <h3>联系方式： {{ sessionInfo.cinema[0].cinemaPhone }}</h3>
          <div class="code">
            票号：{{ orderInfo._id }}
          </div>
        </div>
        <div class="order_wrap">
          <el-image
            style="height: 100%; width: 240px;"
            :src="`${sessionInfo.movies[0].image}`">
          </el-image>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      orderInfo: null,
      sessionInfo: null
    }
  },
  methods: {
    async getInfo() {
      // 获取订单基本数据
      const response1 = await this.$axios.get(`/api/getOrderDetail?id=${this.$route.params.id}`)
      this.orderInfo = response1.data.data;
    
      // 获取场次信息
      const response2 = await this.$axios.get(`/api/searchSession?id=${this.orderInfo.sid}`);
      this.sessionInfo = response2.data.data[0];
    }
  },  
  created() {
    this.getInfo();
  },
  filters: {
    timeFormat(val) {
      return dayjs(val).format('YYYY-MM-DD HH-mm');
    }
  }
}
</script>

<style lang="scss" scoped>
.order_detail {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;

  .code {
    padding: 5px 10px;
    backdrop-filter: #eee;
    border: 2px solid #2f4f4f;
    border-radius: .3em;
    outline: #2f4f4f solid 2px;
  }
}
</style>