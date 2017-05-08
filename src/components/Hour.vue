<template lang="html">
  <div class="hour">
    <h4 class="time">{{hour.time}}</h4>

    <div class='container'>
      <div class="img-container">
        <img src="../assets/img/sun.svg">
      </div>

      <div class="center">
        <label>{{hour.summary}}</label><br>
       <label>Temperature {{hour.temp}} &deg;C</label>
      </div>

      <div class='right'>
        <label>Humidity {{hour.humidity}} %</label><br>
        <label>Precimitation {{hour.precip}} mm (probability {{hour.preciProb}} %)</label><br>
        <label>Wind {{hour.windBearing }} &deg; {{hour.windspeed}} m/s</label><br>
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

img {
  height: 100px;
  width: 100px;
}
</style>
