<template>
    <el-card >
        <div slot="header">
            <span>电影管理</span>
        </div>
        <div v-if="toUpdate">
            <MovieUpdate 
                @exit="toUpdate = !toUpdate"
                :updateForm="updateForm">
            </MovieUpdate>
        </div>
        <!-- <keep-alive> -->
            <div v-if="moviesInfo && !toUpdate">
                <el-input 
                    placeholder="请输入内容" 
                    v-model="keyword" 
                    style="width: 400px; margin-right: 5px;">
                </el-input>
                <el-button 
                    size="middle"
                    @click="search"
                    style="background-color: #2F4F4F; color: white;">查询
                </el-button>
                <el-table
                    ref="multipleTable"
                    :data="moviesInfo.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="电影名">
                    </el-table-column>
                    <el-table-column
                        prop="actor"
                        label="演员">
                    </el-table-column>
                    <el-table-column
                        label="类别"
                        prop="category">
                    </el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="scope">
                            <el-image
                                style="width: 30px; height: 30px"
                                :src="scope.row.image"
                                :preview-src-list="[scope.row.image]"
                                fit="fill">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button 
                                @click="updateClick(scope.row)" 
                                type="text" 
                                size="small"
                                style="margin-right: 5px; color: #2F4F4F;">修改
                            </el-button>
                            <el-popconfirm
                                confirm-button-text='确定'
                                cancel-button-text='取消'
                                icon="el-icon-info"
                                icon-color="red"
                                title="确认删除此条目？"
                                @confirm="delClick(scope.row._id)">
                                <el-button 
                                    type="text" 
                                    size="small"
                                    slot="reference"
                                    style="color: darkRed;">删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageInfo.page"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="moviesInfo.count">
                </el-pagination>
            </div>
        <!-- </keep-alive> -->
    </el-card>
</template>

<script>
    import MovieUpdate from '@/components/MovieUpdate.vue';
    export default {
        name: "MovieManageView",
        components: {
            MovieUpdate
        },
        data() {
            return {
                pageInfo:{
                    pageSize:20,
                    page:1
                },
                moviesInfo:null,
                chooseArr:[],
                keyword: '',
                toUpdate: false,
                updateForm: null
            }
        },
        computed: {},
        watch: {
            keyword(newVal, oldVal) {
                if (oldVal && !newVal) {
                    this.getData();
                }
            }
        },
        methods: {
            updateClick(obj){
                this.updateForm = obj;
                this.toUpdate = true;
            },
            delClick(id){
                this.$axios({
                    url: "/api/deleteMovie",
                    params: { id },
                    method: 'get'
                }).then(({ data }) => {
                    const status = data.status;
                    this.$message({
                        message: status ? '删除成功' : '删除失败',
                        type: status ? 'success' : 'error',
                    })
                    this.getData();
                })
            },
            handleCurrentChange(val) {
                this.pageInfo.page=val
                this.getData()
            },
            handleSelectionChange(arr){
                this.chooseArr=arr.map(item=>item._id)
            },
            getData(){
                this.$axios({
                    url:"/api/getmovie",
                    params:this.pageInfo,
                    method:"get"
                }).then(res=>{
                    this.moviesInfo=res.data
                })
            },
            search() {
                this.$axios({
                    url: "/api/searchMovie",
                    params: { keyword: this.keyword, ...this.pageInfo },
                    method: "get"
                }).then((res) => {
                    this.moviesInfo = res.data;
                })
            }
        },
        components: { MovieUpdate },
        created() {

        },
        mounted(){
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    
</style>