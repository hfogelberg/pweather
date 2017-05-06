<template lang="html">
  <div class = 'hourly'>
    <h2>The next hours</h2>
    <ul>
      <li v-for="hour in hourlyForecasts">
        <h3 class="time">{{hour.time}}</h3>
        <div class='summary'>{{hour.summary}}</div>
        <div class="temp">Temperature {{hour.temp}} &deg;C</div>
        <div class="humidity">Humidity {{hour.humidity}} %</div>
        <div class="precip">Precimitation {{hour.precip}} mm (probability {{hour.preciProb}} %)</div>
        <div class="wind">Wind {{hour.windBearing }} &deg; {{hour.windspeed}} m/s</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['hourlyForecasts']
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}
</style>
