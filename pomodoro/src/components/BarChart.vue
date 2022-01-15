<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['1/12', '1/13', '1/14', '1/15', '1/16', '1/17', '1/18'],
      datasets: [
        {
          label: '已完成',
          backgroundColor: '#f08448',
          data: [0, 0, 0, 0, 0, 0, 2],
          categoryPercentage: 1.0,
          barPercentage: 0.3
        }
      ]
    },
    options: {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 100,
      color: '#ffffff',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }),
  computed: {
    done () {
      return this.$store.state.done
    }
  },

  mounted () {
    this.renderChart(this.chartdata, this.options)
    console.log(this.done)
    console.log(this.chartdata.datasets[0].data[6])
    this.chartdata.datasets[0].data[6] = this.done
  }
}
</script>

<style>
</style>
