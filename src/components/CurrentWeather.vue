<template lang="html">
  <div class='current'>
    <h2>Now</h2>
    <div class='today-text'>{{current.summary}}</div>
    <div class="temp">Temperature {{current.temp}}</div>
    <div class="humidity">Humidity {{current.humidity}} %</div>
    <div class="pressure">Air pressure {{current.pressure}}</div>
    <div class="wind">Wind {{current.bearing}} &deg; / {{current.windspeed}} m/s</div>
  </div>
</template>

<script>
export default {
  props: ['current']
}
</script>

<style lang="css">
</style>
