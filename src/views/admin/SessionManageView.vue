<template>
  <el-card>
    <div slot="header">
      <span>场次管理</span>
    </div>
    <!-- 增加场次 -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="session.money" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="session.startTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电影">
          <!-- <el-select v-model="session.mid" placeholder="选择电影">
            <el-option label="区域一" v-for="item in options" :key="item._id"></el-option>
          </el-select> -->
            <el-select
                v-model="session.mid"
                filterable
                placeholder="请选择"
                :filter-method="searchMovies">
              <el-option
                v-for="item in moviesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="影院">
          <!-- <el-select v-model="session.mid" placeholder="选择电影">
            <el-option label="区域一" v-for="item in options" :key="item._id"></el-option>
          </el-select> -->
            <el-select
                v-model="session.cid"
                filterable
                placeholder="请选择"
                :filter-method="searchCinemas">
              <el-option
                v-for="item in cinemasOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <div v-if="session">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        style="width: 400px; margin-right: 5px"
      >
      </el-input>
      <el-button
        size="middle"
        @click="searchSession"
        style="background-color: #2f4f4f; color: white"
        >查询
      </el-button>
      <el-table
        ref="multipleTable"
        :data="sessions"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="movies[0].title" label="电影名"></el-table-column>
        <el-table-column prop="cinema[0].brandName" label="影院名"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="money" label="价格"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="updateSession(scope.row._id)"
              type="text"
              size="small"
              style="margin-right: 5px; color: #2f4f4f"
              >修改
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确认删除此条目？"
              @confirm="delClick(scope.row._id)"
            >
              <el-button
                type="text"
                size="small"
                slot="reference"
                style="color: darkRed"
                >删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.page"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next"
        :total="moviesInfo.count"
      >
      </el-pagination> -->
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      session: {
        money: 10, //金额 
        mid: '', // 电影编号 movie _id
        cid: '', // 影院表编号 cinema _id
        startTime: Date.now(), //5: 00
        state: 1
      },
      moviesOptions: [],
      cinemasOptions: [],
      sessions: [],
      keyword: ''
    }
  },
  watch: {
    keyword(val) {
      if (val === '') {
        this.search();
      }
    }
  },
  methods: {
    searchMovies(str) {
      if (!str.trim()) return;
      this.$axios.get(`/api/searchMoviesLess?word=${str}`)
          .then((res) => {
            const { data, status } = res.data;
            if (status) {
              this.moviesOptions = data.map((m) => ({
               label: m.title,
               value: m._id, 
              }));
            }
          })
    },
    searchCinemas(str) {
      if (!str.trim()) return;
      this.$axios.get(`/api/searchCinemas?word=${str}`)
          .then((res) => {
            const { data, status } = res.data;
            if (status) {
              this.cinemasOptions = data.map((m) => ({
               label: m.brandName,
               value: m._id, 
              }));
            }
          })
    },
    search() {
      this.$axios({
        url: "/api/getsession",
        method: 'GET',
      }).then((res) => {
        console.log(res);
        this.sessions = res.data.data.map((item) => {
          item.startTime = this.formatTime(item.startTime);
          return item;
        });
      })
    },
    onSubmit() {
      delete this.session._id;
      const item={...this.session}
      item.startTime=+new Date(item.startTime)
      this.$axios.post('/api/createSession', {
        data: item
      }).then((res) => {
        this.search();
      })

    },
    handleSelectionChange() {

    },
    formatTime(timeStamp) {
      const date = new Date(timeStamp),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDay();
      return `${year}-${month}-${day}`;
    },
    delClick(id) {
      this.$axios.get(`/api/deleteSession?id=${id}`)
          .then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
      this.search();
    },
    searchSession() {
      if (!this.keyword.trim()) return;
      this.$axios({
        url: '/api/querySessions',
        params: {
          word: this.keyword,
        }
      }).then((res) => {
        console.log(res.data);
        this.sessions = res.data.result;
      })
    },
    updateSession(id) {
      this.$axios.get(`/api/searchSession?id=${id}`)
          .then((res) => {
            const data = res.data.data[0];
            console.log(data);
            this.session = data;
          })
    }
  },
  mounted() {
    this.search();
  },
  // filters: {
  //   formatTime(timeStamp) {
  //     return new Date(timeStamp);
  //   }
  // }
}
</script>

<style lang="scss" scoped>

</style>