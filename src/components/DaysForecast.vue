<template lang="html">
  <div class='daily'>
    <h2>This week</h2>
    <ul>
      <li v-for='daily in dailyForecasts' class='daily-forecast'>
        <h3>{{daily.date}}</h3>
        <div class="summary">{{daily.summary}}</div>
        <div class='temp'>Temperature {{daily.minTemp}} - {{daily.maxTemp}} &deg; C</div>
        <div class="humidity">Humidity {{daily.humidity}} %</div>
        <div class="wind">Wind {{daily.bearing}} &deg; / {{daily.windspeed}} m/s</div>
        <div class='clouds'>Cloudines {{daily.cloud}} %</div>
        <div class='sunrise'>Sunrise {{daily.sunrise}}</div>
        <div class='sunset'>Sunset {{daily.sunset}}</div>
        <div class='moon'> Moon phase {{daily.moonPhase}} % </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['dailyForecasts']
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}
</style>
