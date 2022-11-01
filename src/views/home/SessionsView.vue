<template>
  <div class="search_result_list">
    <el-card class="box_card">
      <div slot="header">
        <span class="text">该电影所有场次</span>
      </div>
      <div class="result_list" v-if="sessions !== null">
        <div class="search_item_card" v-for="(sessionObj, idx) in sessions" :key="idx">
          <!-- <router-link :to="imagePath" class="card_image"> -->
          <div class="card_main">
            <div class="card_image">
              <el-image
                style="height: 100%; width: 300px;"
                :src="`http://localhost:6600/${sessionObj.cinema[0].brandlogo}`">
              </el-image>  
            </div>
            <!-- </router-link> -->
            <div class="card_brief">
              <p class="card_brief_title">{{ sessionObj.cinema[0].brandName }}</p>
              <p class="card_brief_info_1">{{ sessionObj.cinema[0].cinemaAddress }}</p>
              <p class="card_brief_info_2">联系方式：{{ sessionObj.cinema[0].cinemaPhone }}</p>
            </div>
          </div>

          <div class="operations">
            <h4>￥{{ sessionObj.money }}起</h4>
            <p>
              <button @click="genOrder(sessionObj._id)">购票</button>
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: []
    }
  },
  methods: {
    genOrder(sid) {
      const uid = this.$store.state.USER._id;
      if (!uid) return;
      this.$axios.get(`/api/generateOrder?uid=${uid}&sid=${sid}`)
          .then(response => {
            // console.log(response);
            const { status, data } = response.data;
            if (status) {
              this.$message({
                type: 'success',
                message: '订单生成成功'
              })
              this.$router.push(`/home/order/${data._id}`);
            }
          })
    }
  },
  created() {
    this.$axios.get('/api/getSessionsByMid', {
      params: {
        id: this.$route.params.id,
      }
    }).then(response => {
      const { results } = response.data;
      this.sessions = results;
    })
  }
}
</script>

<style lang="scss" scoped>
.box_card {
  .text {
    font-size: 1.6rem;
    font-weight: bold;
  }
}

.search_item_card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 15px 5px;
    padding: 10px;
    background-color: #F0FFFF;
    box-shadow: 3px 5px 5px #eee;

    height: 200px;

    gap: 10px;

    .card_main {
      
      display: flex;
      flex-direction: row;

      .card_image {
        margin-right: 20px;
      }
      .card_brief {
        align-self: center;
        .card_brief_title {
          font-size: 1.4rem;
          font-weight: bold;
        }
  
        [class^=card_brief_info] {
          margin: 5px;
          font-size: .8rem;
        }
      }
    }

    .operations {
      width: 300px;
      text-align: right;
      align-self: center;
      p {
        color: #2f4f4f;
        font-size: .9rem;
      }

      button {
        background-color: #2f4f4f;
        color: #eee;
        border-radius: .2em;
        width: 100px;
        height: 40px;
        letter-spacing: .2em;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
</style>
