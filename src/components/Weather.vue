<template lang="html">
  <div class="weather">
    <h1>Weather app</h1>
    <div class='location'>Lat: {{lat}}, Lng: {{lng}}</div>
  </div>
</template>

<script>
export default {
  data () {
      return {
        lat: 0.0,
        lng: 0.0
      }
  },
  mounted: function() {
  this.getCurrentLocation()
    .then((latLng)=>{
      this.getWeather(latLng)
    })
    .catch((err)=>{
      alert(err)
    })
},

  methods: {
    getWeather(latLng) {
      console.log('getWeather');
    },
    getCurrentLocation() {
      console.log('getCurrentLocation');
      return new Promise((resolve, reject) =>{
        if ('geolocation' in navigator) {
          var gl = navigator.geolocation
          gl.getCurrentPosition(function(position) {
            console.log(position);
            this.lng = position.coords.longitude
            this.lat = position.coords.latitude
          resolve(latLng);
          }.bind(this))
        } else {
          reject('Cannot use geolocation')
        }
      })
    },
  }
}
</script>

<style lang="css">
</style>
