<template>
  <div class="search_item_card">
    <router-link :to="imagePath" class="card_image">
      <el-image
        style="height: 100%"
        :src="movieObj.image">
      </el-image>
    </router-link>
    <div class="card_brief">
      <p class="card_brief_title">{{ movieObj.title }}</p>
      <el-rate
        :value="movieObj.rating/2"
        disabled
        show-score
        :colors="['#2F4F4F', '#2F4F4F', '#2F4F4F']"
        score-template="{value}"
        style="margin-bottom: 50px">
      </el-rate>
      <p class="card_brief_info_1">{{ briefInfo_1 }}</p>
      <p class="card_brief_info_2">{{ briefInfo_2 }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['movieObj'],
    data() {
      return {

      }
    },
    computed: {
      imagePath() {
        const path = '/home/detail/' + this.movieObj._id;
        return path;
      }, 
      briefInfo_1() {
        const { areaName, language, timeCount } = this.movieObj;
        return [areaName, language, timeCount+'分钟'].join(' / ');
      },
      briefInfo_2() {
        return this.movieObj.actor;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search_item_card {
    display: flex;
    flex-direction: row;

    margin: 15px 5px;
    padding: 10px;
    background-color: #F0FFFF;
    box-shadow: 3px 5px 5px #eee;

    height: 200px;

    .card_image {
      margin-right: 20px;
    }
    .card_brief {
      .card_brief_title {
        font-size: 1rem;
        font-weight: bold;
      }

      [class^=card_brief_info] {
        margin: 5px;
        font-size: .8rem;
      }
    }
  }
</style>