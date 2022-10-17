<template>
    <el-container>
        <el-header class="pageHeader">
            管理后台
        </el-header>
        <el-container class="container">
            <el-aside width="300px">
                <el-menu
                    default-active="1"
                    class="navBar"
                    background-color="#B0E0E6"
                    text-color="#2F4F4F"
                    unique-opened>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>后台首页</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item >
                                <router-link to="/admin">后台统计</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <router-link to="/home">前台</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item >
                                <router-link to="/admin/adduser">增加用户</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <router-link to="/admin/usermanage">用户列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>电影管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item >
                                <router-link to="/admin/addmovie">增加电影</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <router-link to="/admin/moviemanage">电影列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>影院管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item >
                                <router-link to="/admin/addcinema">增加影院</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <router-link to="/admin/cinemanage">影院列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item >
                                <router-link to="/admin/ordermanage">订单列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>  
            </el-aside>
            <el-container>
                <el-main class="main">
                    <router-view>后台二级路由</router-view>
                </el-main>
                <el-footer class="pageFooter">
                    @vue
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "AdminIndexView",
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
        components: {},
        created() {

        }
    }
</script>

<style scoped lang="scss">
    .pageHeader {
        height: 80px;
        padding: 10px;
        background-color: #2F4F4F;
        line-height: 2;
        color: aliceblue;
        font-weight: bold;
    }

    .pageFooter {
        background-color: #E0FFFF;
        text-align: center;
        font-size: .7rem;
        font-weight: bold;
        line-height: 4.5;
        color: #2F4F4F;
    }

    .container {
        height: calc(100vh - 60px);
        
        .el-aside {
            background-color: #5F9EA0;
            .navBar {
                font-weight: bold;
                .el-submenu__title {
                    & > span {
                        font-size: .9rem;
                    }
                    & > i {
                        color: #5F9EA0;
                    }
                }
                .el-menu-item {
                    font-size: .8rem;
                    & a {
                        color: #2F4F4F;
                        text-decoration: none;
                    }
                }
            }
        }

        .el-main {
            &::-webkit-scrollbar {
                width: 0 !important
            }
        }
    }
</style>