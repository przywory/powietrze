<template>
  <HoursChart :data="januaryData"/>
  <p>Powyższy wykres pozwala określić zazwyczaj o jakich godzinach w ciągu doby powietrze było najczystsze, a o jakich wręcz przeciwnie.</p>
  <p>Ogólnie w styczniu lepiej było unikać w Przywoarch dłuższego przebywania na zewnątrz, szczególnie w okolichach 7 rano i 22 wieczorem.<br>Przyczyną braku świeżego powietrza w akurat tych godzinach było najprawdopodbniej dokładanie do pieca przed wyjściem do pracy i przed pójściem spać.<br>Nasuwa się przy tym pytanie czym i jak palimy w naszych piecach, że dołożenie/rozpalenie powoduje takie pogorszenie się jakości powietrza w okolicy?</p>
  <p>Najlepszymi porami na spacer albo inną aktywaność na "świeżym" powietrzu były okolice 3 w nocy i 13 w środku dnia. Może to jednak sprawiać pewne problemy bo o 3 w nocy większość z nas raczej śpi, a o 13 pracuje lub się uczy.</p>
  <p>Warto zwrócić też uwagę że nawet w tych godzinach z najlpeszym powietrzem jego czystość pozostawia wiele do życzenia. Według skali CAQI powietrze jest średnio zanieczyszczone (72 CAQI) blisko granicy z mocno zanieczyszczonym (75 CAQI).</p>
  <hr>
  <DaysChart :data="januaryData"/>
  <DaysCAQIChart :data="januaryData"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HoursChart from './components/HoursChart.vue'
import DaysChart from './components/DaysChart.vue'
import DaysCAQIChart from './components/DaysCAQIChart.vue'
import airData from './data/01-2021.json'

export default defineComponent({
  name: 'App',
  components: {
    HoursChart,
    DaysChart,
    DaysCAQIChart
  },
  setup() {
    const januaryData = airData
    return { januaryData }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

hr {
  margin: 3rem auto;
  height: 0;
  border: none;
}

</style>
