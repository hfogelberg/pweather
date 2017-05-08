<template lang="html">
  <div class="day">
      <h3>{{daily.date}}</h3>

      <div class="container">
        <div class="img-container">
          <img src="../assets/img/sun.svg">
        </div>

        <div class="center">
          <label>{{daily.summary}}</label><br>
            <label class='temp'>Temperature {{daily.minTemp}} - {{daily.maxTemp}} &deg; C
            </label>
          </div>

        <div class="right>">
          <label>Humidity {{daily.humidity}} %</label><br>
          <label>Wind {{daily.bearing}} &deg;, {{daily.windSpeed}} m/s</label><br>
          <label>Cloudines {{daily.cloud}} %</label><br>
          <label>Sunrise {{daily.sunrise}}</label><br>
          <label>Sunset {{daily.sunset}}</label><br>
          <label> Moon {{daily.moon}} % </label><br>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['daily']
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts';
@import '../assets/styles/panel-content';
</style>
