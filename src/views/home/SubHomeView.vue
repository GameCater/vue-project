<template>
    <div class="ad-list">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="text">电影列表</span>
            </div>
            <div class="movies-list" v-if="moviesList">
                <el-row>
                    <el-col :span="6" v-for="movieObj in moviesList.data" :key="movieObj._id">
                        <el-card 
                            :body-style="{ padding: '0px', margin: '10px' }"
                            style="margin: 10px"
                            shadow="never">
                            <img 
                                :src="movieObj.image" 
                                class="image"
                                style="width: 100%; height: 300px;">
                            <div style="padding: 14px; height: 50px; overflow: hidden;">
                                <span>{{ movieObj.title }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SubHomeView",
        data() {
            return {
                moviesList: null
            }
        },
        computed: {},
        watch: {},
        methods: {},
        components: {},
        created() {

        },
        mounted() {
            this.$axios.get('/api/getmovie')
                .then((res) => {
                    this.moviesList = res.data;
                })
        }
    }
</script>

<style scoped lang="scss">

</style>