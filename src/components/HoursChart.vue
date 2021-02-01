<template>
  <div ref="hoursChart"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ApexCharts from 'apexcharts'

export default defineComponent({
  name: 'HoursChart',
  props: {
    data: Array,
    type: String
  },
  mounted() {

    const hoursData : Array<Object> = []

    this.data.forEach(hourStats => {
      if (!hoursData[hourStats.hour]) {
        hoursData[hourStats.hour] = {
          'PM25': { 'count': 0, 'sum': 0},
          'PM10': { 'count': 0, 'sum': 0},
        }
      }
      hoursData[hourStats.hour]['PM25']['count']++
      hoursData[hourStats.hour]['PM25']['sum'] += hourStats['PM25']
      hoursData[hourStats.hour]['PM10']['count']++
      hoursData[hourStats.hour]['PM10']['sum'] += hourStats['PM10']
    })

    const hours : Array<Number> = []
    const pm25 : Array<Number> = []
    const pm10 : Array<Number> = []

    hoursData.forEach((hourData, hour) => {
      hours.push(hour)
      pm25.push(hourData['PM25']['sum'] / hourData['PM25']['count'])
      pm10.push(hourData['PM10']['sum'] / hourData['PM10']['count'])
    })

    const options = {
      series: [],
      chart: {
        height: 400,
        type: 'area',
        toolbar: {
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          }
        },
      },
      colors:['#f89f41', '#9966ff', '#9C27B0'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: hours,
        labels: {
          formatter: (value: Number) => {
            let prefix = ''
            if (value < 10) {
              prefix = '0'
            }
            return `${prefix}${value}:00` },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => String(value.toFixed(2)),
        },
        min: 20,
        max: 110,
      },
      tooltip: {
        y: {
          formatter: (value: Number) => String(value.toFixed(2)),
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'bottom',
        horizontalAlign: 'center', 
        onItemClick: {
            toggleDataSeries: false
        },
      },
      annotations: {
        yaxis: [
          {
            y: 25,
            borderColor: '#861ba1',
            label: {
              borderColor: '#861ba1',
              style: {
                fontSize: '10px',
                color: '#000',
                background: '#9966ff',
              },
              text: 'Poziom dopuszczalny PM2.5',
            }
          },
          {
            y: 50,
            borderColor: '#d28970',
            label: {
              borderColor: '#d28970',
              position: 'right',
              style: {
                fontSize: '10px',
                color: '#000',
                background: '#f89f41',
                marginRight: '10px'
              },
              text: 'Poziom dopuszczalny PM10',
            }
          },
        ],
      },
      title: {
        text: 'Średnie godzinowe miesięczne stężenia pyłów PM2.5 i PM10 w styczniu 2021',
        align: 'center'
      },
      subtitle: {
        text: '(na podstawie danych z czujnika w Przyworach na Wiejskiej 8)',
        align: 'center',
        // margin: 10,
        // offsetX: 0,
        // offsetY: 0,
        // floating: false,
        // style: {
        //   fontSize:  '12px',
        //   fontWeight:  'normal',
        //   fontFamily:  undefined,
        //   color:  '#9699a2'
        // },
      }
    }

    options.series.push({
      name: 'PM10 (ug/m<sup>3</sup>)',
      data: pm10
    })
    options.series.push({
      name: 'PM2.5 (ug/m<sup>3</sup>)',
      data: pm25
    })

    const chart = new ApexCharts(this.$refs.hoursChart, options)
    chart.render()
  },
  setup() {
      const hoursChart = ref(null)
      return {
        hoursChart
      }
  }
})
</script>
