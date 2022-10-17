<template>
    <div class="search_result_list">
        <el-card class="box_card">
            <div slot="header">
                <span class="text">搜索 {{ keyword }}</span>
            </div>
            <div class="result_list" v-if="moviesBySearch !== null">
                <SearchResultItem 
                    v-for="movieObj in moviesBySearch" 
                    :key="movieObj._id"
                    :movieObj="movieObj">
                </SearchResultItem>
            </div>
        </el-card>
    </div>
</template>

<script>
    import SearchResultItem from '@/components/SearchResultItem.vue';
    export default {
        name: "SearchView",
        data() {
            return {
                keyword: '',
                pageInfo: {
                    page: 1,
                    pageSize: 20,
                },
                moviesBySearch: null
            }
        },
        watch: {
            '$route.params.keyword'(newVal, oldVal){
                this.keyword = newVal;
                if(newVal !== oldVal){
                    this.getSearchResult(newVal);
                }
            }
        },
        methods: {
            getSearchResult(keyword) {
                this.$axios.get(
                    '/api/searchMovie',
                    { 
                        params: {
                            keyword: keyword,
                            page: this.pageInfo.page,
                            pageSize: this.pageInfo.pageSize,
                        }
                    }
                ).then((res) => {
                    this.moviesInfo = res.data;
                    this.moviesBySearch = res.data.data;
                })
            }
        },
        components: {
            SearchResultItem,
        },
        mounted() {
            const { keyword } = this.$route.params;
            this.keyword = keyword;
            this.getSearchResult(keyword);
        }
    }
</script>

<style scoped lang="scss">
    .box_card {
        .text {
            font-size: 1.6rem;
            font-weight: bold;
        }
    }
</style>