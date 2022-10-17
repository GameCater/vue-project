import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/SubHomeView.vue')
      },
      {
        path: "movies",
        name: "movies",
        component: () => import("@/views/home/MoviesView.vue")
      },
      {
        path: "top",
        name: "top",
        component: () => import("@/views/home/TopView.vue")
      },
      {
        path: "ucenter",
        name:"ucenter",
        component: () => import("@/views/home/UcenterView.vue"),
        beforeEnter: (to, from, next) => {
          const token = true;
          if (token) {
            next();
          } else {
            alert('请先登录');
            next('/home/login');
          }
        }
      },
      {
        path: "login",
        name: "login",
        meta: {
          isKeepAlive: true,  //该路由节点被缓存
        },
        component: () => import("@/views/home/LoginView.vue")
      }, 
      {
        path: "reg",
        name: "reg",
        component: () => import("@/views/home/RegView.vue"),
        meta:{
          isKeepAlive: true,  //该路由节点被缓存
          title: "会员注册",
          powerState: 3
        }
      },
      {
        path: "detail/:id",
        name: "detail",
        component: () => import("@/views/home/DetailView.vue")
      }
    ]
  },
  { 
    path: '/admin',
    component: () => import('@/views/AdminView.vue'),
    children: [
      {
        path: "",
        name:"admin",
        component:()=>import("../views/admin/CountView.vue")
      }, 
      {
        path: "usermanage",
        name:"usermanage",
        component:()=>import("../views/admin/UserManageView.vue")
      },
      {
        path: "moviemanage",
        name:"moviemanage",
        component:()=>import("../views/admin/MovieManageView.vue")
      },
      {
        path: "cinemanage",
        name:"cinemanage",
        component:()=>import("../views/admin/CineManageView.vue")
      },
      {
        path: "ordermanage",
        name:"ordermanage",
        component:()=>import("../views/admin/OrderManageView.vue")
      }
    ]
  },
  { path: '/err', component: () => import('@/views/NotFound.vue') },
  { path: '*', redirect: '/err' }
]

const router = new VueRouter({
  routes
})

export default router
