<template lang="html">
  <div class='current-container'>
    <div class='current'>
      <img src="../assets/img/sun.svg">
      <div class='description'>
        <h3>{{current.summary}}</h3>
        <div class="temp">
          Temperature {{current.temp}}
        </div>
        <div class="humidity">
          Humidity {{current.humidity}} %
        </div>
        <div class="pressure">
          Air pressure {{current.pressure}}
        </div>
        <div class="wind">
          Wind {{current.bearing}} &deg; / {{current.windspeed}} m/s
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['current']
}
</script>

<style lang="css" scoped>
.current-container {
	display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.current {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.description {
  padding: 2em;
}
</style>
