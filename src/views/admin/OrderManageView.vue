<template>
  <el-card>
    <div slot="header">
      <span>订单管理</span>
    </div>
    <div>
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
        @expand-change="handleExpandChange"
        :data="ordersInfo.data"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订阅用户">
                <span>{{ props.row.users[0].name }}</span>
              </el-form-item>
              <el-form-item label="观看电影">
                <span>{{ props.row.sessions[0].movie[0].title }}</span>
              </el-form-item>
              <el-form-item label="观看时间">
                <span>{{ props.row.sessions[0].startTime | timeFormat }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="订购用户"> </el-table-column>
        <el-table-column prop="sid" label="订购场次"> </el-table-column>
        <el-table-column label="订购时间" prop="orderTime" :formatter="formatTime"> </el-table-column>
        <el-table-column label="订单状态" prop="state" :formatter="formatState"> </el-table-column>
      </el-table>
      <el-pagination
        v-if="ordersInfo.data"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.page"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next"
        :total="ordersInfo.total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: "OrderManageView",
  data() {
    return {
      ordersInfo: {},
      keyword: '',
      pageInfo: {
        page: 1,
        pageSize: 5
      }
    };
  },
  methods: {
    handleExpandChange(x, y) {
      console.log(x, y);
    },
    search() {

    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.getData();
    },
    async getData() {
      const response = await this.$axios.get(`/api/getOrderList?page=${this.pageInfo.page}&pageSize=${this.pageInfo.pageSize}`);
      this.ordersInfo = response.data;
    },
    formatTime(row, column) {
      return dayjs(row.orderTime).format('YYYY-MM-DD HH:mm');
    },
    formatState(row) {
      return row.state ? '已过期' : '未过期';
    }
  },
  mounted() {
    this.getData();
  },
  filters: {
    timeFormat(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm');
    },
  }
};
</script>

<style scoped lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #2f4f4f;
  font-size: 1rem;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>