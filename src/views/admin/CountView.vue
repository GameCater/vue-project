<template>
  <div class="main-panel">
    <el-card>
      <div slot="header">
        <span>后台数据统计</span>
      </div>
      <div id="main" style="width: 100%; height: 400px; text-align: center;">
      </div>
    </el-card>
    <div class="sub-panel">
      <el-card>
        <div slot="header">
          <span>日历</span>
        </div>
        <div id="sub1" style="width: 100%; height: 300px;">
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span>统计</span>
        </div>
        <div id="main" style="width: 100%; height: 300px;">
    
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';
export default {
  name: "CountView",
  data() {
    return {
      option: {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: []
          }
        ]
      },
      option1: {
        title: {
          top: 30,
          left: 'center',
          text: '管理系统使用记录'
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 100,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2016',
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.getVirtulData()
        }
      }
    }
  },
  methods: {
    getVirtulData(year) {
      year = year || new Date().getFullYear();
      var date = +echarts.time.format(year + '-01-01');
      var end = +echarts.time.format(+year + 1 + '-01-01');
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 100)
        ]);
      }
      return data;
    },
    getEcharts() {
      this.$axios.get('/api/statistic')
        .then((res) => {
          let arr = res.data.data;
          this.option.series[0].data = arr;
          this.initEcharts();
        });

      
    },
    initEcharts() {
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option);

      const calendarChart = echarts.init(document.getElementById('sub1'));
      calendarChart.setOption(this.option1);
    }
  },
  mounted() {
    this.getEcharts();
  }
};
</script>

<style scoped lang="scss">
.main-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .sub-panel {
    display: flex;
    flex-direction: row;
    gap: 20px;

    .el-card {
      flex: 1;
    }
  }
}
</style>