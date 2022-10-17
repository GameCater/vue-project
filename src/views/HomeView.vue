<template>
  <div class="home">
    <el-header class="pageHeader" style="height: 100px">
      <el-menu 
        class="navBar" 
        mode="horizontal"
        background-color="#2F4F4F"
        text-color="#fff"
        active-text-color="#F0FFFF">
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
    </el-header>
    <el-container class="container">
      <el-main class="pageMain">
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive">前台二级路由</router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.isKeepAlive">前台二级路由</router-view>
      </el-main>
      <el-aside class="pageAside" style="width: 350px">
        Aside
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
  import HomeFooter from '@/components/HomeFooter.vue';
  export default {
    name: 'HomeView',
    components: {
      HomeFooter,
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pageHeader {
    height: 100px;
    padding: 20px;
    background-color: #2F4F4F;
    .navBar {
      border-bottom: none;
      a {
        text-decoration: none;
        font-size: .8rem;
        font-weight: bold;
        letter-spacing: 2px;
      }
      & > li:first-child > a {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }

  .pageFooter {
    background-color: #E0FFFF;
    text-align: center;
    font-size: .7rem;
    font-weight: bold;
    line-height: 4.5;
    color: #2F4F4F;

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
    background-color: #F0FFFF;
    width: 1400px;
    gap: 50px;
    margin: 0 auto;
    padding: 20px;
    .pageMain {
      background-color: aqua;
  
    }
  
    .pageAside {
      background-color: #E0FFFF;
    }
  }

</style>
