<template lang="html">
  <div class="hour">
    <h3 class="time">{{hour.time}}</h3>

    <div class='container'>
      <div class="img-container">
        <img src="../assets/img/sun.svg">
      </div>

      <div class="center">
        <label>{{hour.summary}}</label><br>
       <label>Temperature {{hour.temp}} &deg;C</label>
      </div>

      <div class='right'>
        <label>Humidity {{hour.humidity}} %</label>
        <label>Precimitation {{hour.precip}} mm (probability {{hour.preciProb}} %)</label>
        <label>Wind {{hour.windBearing }} &deg; {{hour.windspeed}} m/s</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hour']
}
</script>

<style lang="scss">
@import '../assets/styles/fonts';
@import '../assets/styles/panel-content';
</style>
