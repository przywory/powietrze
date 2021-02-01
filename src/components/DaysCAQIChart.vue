<template>
  <div ref="daysChart"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ApexCharts from 'apexcharts'
import { calculatePM25CAQI, calculatePM10CAQI, getCAQIdata, CAQIScaleData } from '../CAQI'

export default defineComponent({
  name: 'DaysCAQIChart',
  props: {
    data: Array,
    type: String
  },
  mounted() {

    const daysData : Array<Object> = []

    this.data.forEach(hourStats => {
      if (!daysData[hourStats.day]) {
        daysData[hourStats.day] = {
          'PM25': { 'count': 0, 'sum': 0},
          'PM10': { 'count': 0, 'sum': 0},
        }
      }
      daysData[hourStats.day]['PM25']['count']++
      daysData[hourStats.day]['PM25']['sum'] += hourStats['PM25']
      daysData[hourStats.day]['PM10']['count']++
      daysData[hourStats.day]['PM10']['sum'] += hourStats['PM10']
    })

    const days : Array<number> = []
    const caqi : Array<number> = []

    daysData.forEach((dayData, day) => {
      days.push(day)

      const pm25caqi = calculatePM25CAQI(dayData['PM25']['sum'] / dayData['PM25']['count'])
      const pm10caqi = calculatePM10CAQI(dayData['PM10']['sum'] / dayData['PM10']['count'])
      const caqiValue = (pm25caqi > pm10caqi) ? pm25caqi : pm10caqi

      caqi.push(caqiValue)
    })

    

    const options = {
      series: [],
      chart: {
        height: 400,
        type: 'line',
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
      colors:['#000', '#9966ff', '#9C27B0'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: days,
        labels: {
          formatter: (value: number) => {
            let prefix = ''
            if (value < 10) {
              prefix = '0'
            }
            return `${prefix}${value}.01` },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => String(value.toFixed(2)),
        },
        min: 0,
        max: 100,
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
              const val = value > 100 ? '>100' : value.toFixed(2)
              const caqi = getCAQIdata(value)
              return `${val} (${caqi.label})`
            }
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
        yaxis: []
      },
      title: {
        text: 'Średnie 24h wartości indeksu jakości powietrza CAQI w styczniu 2021',
        align: 'center'
      },
      subtitle: {
        text: '(na podstawie danych z czujnika w Przyworach na Wiejskiej 8, w tle zaznaczone przedziały jakości powietrza)',
        align: 'center',
      }
    }


    CAQIScaleData.forEach(caqi => {
        const annotation = {
            y: caqi.from,
            y2: caqi.to,
            borderColor: 'transparent',
            fillColor: caqi.color,
            opacity: 0.2,
            position: 'back',
            label: {
              borderColor: caqi.color,
              offsetY: (caqi.to - caqi.from) * 2 + 10,
              style: {
                fontSize: '10px',
                color: '#000',
                background: caqi.color,
                bottom: 0,
              },
              text: caqi.label,
            }
        }
        if (caqi.from > 100) {
            annotation.label.offsetY = 0
            annotation.y = 99.99
            annotation.y2 = 100
        }

        options.annotations.yaxis.push(annotation)
    });



    options.series.push({
      name: 'CAQI',
      data: caqi
    })

    const chart = new ApexCharts(this.$refs.daysChart, options)
    chart.render()
  },
  setup() {
      const daysChart = ref(null)
      return {
        daysChart
      }
  }
})
</script>
