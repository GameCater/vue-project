<template>
  <div class="home">
    <el-header class="pageHeader" style="height: 100px">
      <div class="header_container">
        <el-menu
          class="navBar"
          mode="horizontal"
          background-color="#2F4F4F"
          text-color="#fff"
          active-text-color="#F0FFFF"
        >
          <el-menu-item index="1">
            <router-link to="/home">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/home/movies">电影</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/home/top">推荐电影</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/home/ucenter">用户中心</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="/home/login">登录</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <router-link to="/home/reg">注册</router-link>
          </el-menu-item>
          <el-menu-item index="7" disabled>
            <router-link to="/home/detail/34543456564">测试详情</router-link>
          </el-menu-item>
          <el-menu-item index="8">
            <router-link to="/admin">admin</router-link>
          </el-menu-item>
        </el-menu>
        <div class="input">
          <el-input
            v-model="keyword"
            placeholder="请输入查询内容，按enter确认"
            @change="searchMovies"
          >
          </el-input>
        </div>
      </div>
    </el-header>
    <el-container class="container">
      <el-main class="pageMain">
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive">前台二级路由</router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.isKeepAlive">前台二级路由</router-view>
      </el-main>
      <el-aside class="pageAside" style="width: 350px">
        <!-- 广告位 -->
        <Advert :prop="prop">
          <template>
            <div class="ad" v-for="adObj in prop.ads" :key="adObj.id">
              <el-image
                style="width: 310px; height: 400px; margin-bottom: 10px"
                :src="adObj.pic"
              >
              </el-image>
            </div>
          </template>
        </Advert>
      </el-aside>
    </el-container>
    <el-footer class="pageFooter">
      <!-- @vue -->
      <HomeFooter>
        <template v-slot:front="slotProps">
          {{ slotProps.front }}
        </template>
        <template #end>
          <ul class="link-list">
            <li><a>联系我</a></li>
            <li><a>其他网站</a></li>
            <li><a>提供奶茶钱</a></li>
          </ul>
        </template>
      </HomeFooter>
    </el-footer>
  </div>
</template>

<script>
import HomeFooter from "@/components/HomeFooter.vue";
import Advert from "@/components/Advert.vue";
export default {
  name: "HomeView",
  components: {
    HomeFooter,
    Advert,
  },
  data() {
    return {
      keyword: "",
      prop: {
        title: "广告位",
        ads: [
          {
            id: "001",
            name: "ad 1",
            pic: "upload/top250/1.jpg",
            link: "http://xxx.xxx1.com",
          },
          {
            id: "002",
            name: "ad 2",
            pic: "upload/top250/1.jpg",
            link: "http://xxx.xxx2.com",
          },
          {
            id: "003",
            name: "ad 3",
            pic: "upload/top250/1.jpg",
            link: "http://xxx.xxx3.com",
          },
        ],
      },
    };
  },
  methods: {
    searchMovies() {
      if (this.keyword) {
        this.$router.push("/home/search/" + this.keyword);
      }
      this.keyword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  overflow: hidden;
}

.pageHeader {
  width: 100%;
  background-color: #2f4f4f;
  height: 100px;
  padding: 20px 100px;
  position: fixed;
  z-index: 1;
  overflow: hidden;
}
.header_container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .navBar {
    border-bottom: none;
    a {
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 2px;
    }
    & > li:first-child > a {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .input {
    padding: 0 20px;
    width: 300px;
  }
}

.pageFooter {
  background-color: #e0ffff;
  text-align: center;
  font-size: 0.7rem;
  font-weight: bold;
  line-height: 4.5;
  color: #2f4f4f;

  .link-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    & li {
      display: inline-block;
      padding: 0 10px;
      line-height: 60px;

      & a {
        cursor: pointer;
        font-weight: normal;
      }
    }
  }
}

.container {
  background-color: #f0ffff;
  width: 1700px;
  gap: 50px;
  margin: 100px auto 0;
  padding: 40px 70px;
  .pageMain {
    // background-color: aqua;
    padding: 0;
  }

  .pageAside {
    // background-color: #E0FFFF;
  }
}
</style>
