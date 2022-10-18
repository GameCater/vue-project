<template>
    <div class="movie_detail">
        <el-card class="movie_content">
            <div slot="header">
                <span class="title">电影详情</span>
            </div>
            <div class="movie_detail">
                
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "DetailView",
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {
            getMovieDetail() {
                this.$axios.get('/api/getMovieDetail/', { 
                        params: {
                            id: this.$route.params.id
                        }
                    }).then((res) => {
                            this.movieInfo = res.data.data;
                        }, (err) => {
                            console.log(err);
                        })
            }
        },
        components: {},
        created() {
            this.getMovieDetail();
        }
    }
</script>

<style scoped lang="scss">

</style>