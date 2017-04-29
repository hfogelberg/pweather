<template lang="html">
  <div class="weather">
    <h1>Weather app</h1>
    <div class='location'>Lat: {{lat}}, Lng: {{lng}}</div>

    <pre>{{current}}</pre>
  </div>
</template>

<script>
import axios from 'axios'
// import { DARK_WEATHER_KEY } from '../../config.js'

export default {
  data () {
      return {
        lat: 0.0,
        lng: 0.0,
        current: {
          summary: '',
          temp: 0,
          humidity: 0,
          cloud: '',
          pressure: '',
          bearing: '',
          windspeed: 0,
          ozone: 0
        }
      }
  },
  mounted: function() {
  this.getCurrentLocation()
    .then(()=>{
      this.getWeather()
    })
    .catch((err)=>{
      alert(err)
    })
},

  methods: {
    getWeather() {
      console.log('getWeather');
//https://api.darksky.net/forecast/dd7aee29471de7467a81eb91c6be98d9/28.4071789,-16.567483199999998?units=auto


//https://localhost:8081/api/weather/28.4071789,-16.567483199999998

    let url = `http://localhost:8081/api/forecast/${this.lat},${this.lng}`
    axios.get(url)
            .then((res) => {
              const data = res.data.data
              let current = data.currently
              this.parseCurrentWeatherData(current)
            })
            .catch((err) => {
              console.log(err);
            })
    },
    parseCurrentWeatherData(current) {
      console.log('Current weather', current);
      this.current = {
            summary: current.summary,
            temp: current.temperature,
            humidity: current.humidity * 100,
            cloud: current.cloudCover * 100,
            pressure: current.pressure,
            bearing: current.windBearing,
            windspeed: current.windSpeed,
            ozone: current.ozone
          }

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
          resolve();
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
