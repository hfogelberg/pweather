<template lang="html">
  <div class="location">
    <div class='location' v-if = "location.hasLocationName">
      <h2 class="locationName">{{location.station}}</h2>
      <div class="coords">(Lat: {{location.lat}}, Lng: {{location.lng}})</div>
    </div>
    <div class = "locationSpinner" v-else>
      <h2>Checking where you are ... </h2>
    </div>
  </div>
</template>

<script>
  export default {
  props: ["location"]
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/fonts';

  .location {
    text-align: center;
    margin-bottom: 1em;
  }

  .coords {
    font-size: 0.8em;
    font-style: italic;
  }

  .location-spinner {
    text-align: center;
    width: 100vw;
  }
</style>
