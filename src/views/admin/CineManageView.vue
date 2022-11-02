<template>
  <el-card>
    <div slot="header">
      <span>影院管理</span>
    </div>
    <div v-if="cinemasInfo">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        style="width: 400px; margin-right: 5px">
      </el-input>
      <el-button
        size="middle"
        @click="search"
        style="background-color: #2f4f4f; color: white">查询
      </el-button>
      <el-table
        ref="multipleTable"
        :data="cinemasInfo.data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="brandName" label="影院名"> </el-table-column>
        <el-table-column prop="cinemaAddress" label="影院地址"> </el-table-column>
        <el-table-column label="联系电话" prop="cinemaPhone"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="updateClick(scope.row._id)"
              type="text"
              size="small"
              style="margin-right: 5px; color: #2f4f4f">修改
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确认删除此条目？"
              @confirm="delClick(scope.row._id)">
              <el-button
                type="text"
                size="small"
                slot="reference"
                style="color: darkRed">删除
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
        :total="cinemasInfo.count">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CineManageView",
  data() {
    return {
      pageInfo: {
        pageSize: 20,
        page: 1,
      },
      cinemasInfo: null,
      chooseArr: [],
      keyword: "",
    };
  },
  watch: {
    keyword(newVal, oldVal) {
      if (oldVal && !newVal) {
        this.getData();
      }
    },
  },
  methods: {
    updateClick(id) {
      this.$router.push(`/admin/editcinema/${id}`);
    },
    delClick(id) {
      this.$axios({
        url: "/api/deleteSession",
        params: { id },
        method: "get",
      }).then(({ data }) => {
        const status = data.status;
        this.$message({
          message: status ? "删除成功" : "删除失败",
          type: status ? "success" : "error",
        });
        this.getData();
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.getData();
    },
    handleSelectionChange(arr) {
      this.chooseArr = arr.map((item) => item._id);
    },
    getData() {
      this.$axios({
        url: "/api/getcinema",
        params: this.pageInfo,
        method: "get",
      }).then((res) => {
        this.cinemasInfo = res.data;
      });
    },
    search() {
      this.$axios({
        url: "/api/searchSession",
        params: { keyword: this.keyword, ...this.pageInfo },
        method: "get",
      }).then((res) => {
        this.cinemasInfo = res.data;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
</style>