<template>
  <el-card>
    <div slot="header">
      <span>统计</span>
    </div>
    <div id="main" style="width: 100%; height: 400px;">

    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';
export default {
  name: "CountView",
  data() {
    return {
      option: {
        title: {
          text: 'Referer of a Website',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(['CATEGORY_LIST'])
  },
  watch: {},
  methods: {
    getEcharts() {
      this.$axios.post('/api/getCharts')
        .then((res) => {
          let arr = res.data.data;
          arr = arr.map((item, idx) => {
            return {
              value: item,
              name: this.CATEGORY_LIST[idx]
            }
          })
          this.option.series[0].data = arr;
          this.initEcharts();
        })
    },
    initEcharts() {
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option);
    }
  },
  components: {},
  created() {},
  mounted() {
    this.getEcharts();
  }
};
</script>

<style scoped lang="scss">
</style>