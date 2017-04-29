<template lang="html">
  <div class="weather">
    <h1>Weather app</h1>
    <div class = 'weather-data'>
      <div class='location'>Lat: {{lat}}, Lng: {{lng}}</div>
      <hr>
      <pre>{{current}}</pre>
      <hr>
      <pre>{{dailySummary}}</pre>
      <hr>
      <pre>{{dailyForecasts}}</pre>
      <pre>{{hourlyForecasts}}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
        },
        dailySummary: {
          text: '',
          icon: ''
        },
        dailyForecasts: [],
        hourlyForecasts: []
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
    let url = `http://localhost:8081/api/forecast/${this.lat},${this.lng}`
    axios.get(url)
            .then((res) => {
              const data = res.data.data
              console.log(data);
              let current = data.currently
              let hourly = data.hourly
              let daily = data.daily
              this.parseCurrentWeatherData(current)
              this.parseHourlyForecast(hourly)
              this.parseDayForecast(daily)
            })
            .catch((err) => {
              console.log(err);
            })
    },
    parseHourlyForecast(hourly) {
      console.log('*** HOURLY ***' , hourly);
      let hourlyData = hourly.data

      for (let i = 0; i  < hourlyData.length; i++) {
        if (i  % 3 === 0) {
          let dataItem = hourlyData[i]
          console.log('Hourly data item: ' + dataItem);
          let hourlyItem = {
            clour: dataItem.cloudCover * 100,
            humidity: dataItem.humidity * 100,
            icon: dataItem.icon,
            ozone: dataItem.ozone,
            precip: dataItem.precipIntensity,
            preciProb: dataItem.precipProbability * 100,
            pressure: dataItem.pressure,
            summare: dataItem.summary,
            temp: dataItem.temperature,
            time: dataItem.time,
            windBearing: dataItem.windBearing,
            windspeed: dataItem.windSpeed
          }

          this.hourlyForecasts.push(hourlyItem)
        }
      }

    },
    parseDayForecast(daily) {
      this.dailySummary = {
        text: daily.summary,
        icon: daily.icon
      }

      let forecasts = daily.data
      console.log('Iterating Daily forecasts');
      forecasts.map((forecast) => {
        let item = {
          date: forecast.time,
          summary: forecast.summary,
          maxTemp: forecast.apparentTemperatureMax,
          minTemp: forecast.apparentTemperatureMin,
          humidity: forecast.humidity * 100,
          icon: forecast.icon,
          windSpeed: forecast.windSpeed,
          bearing: forecast.windBearing,
          ozon: forecast.ozone,
          moon: forecast.moonPhase * 100,
          cloud: forecast.cloudCover * 100
        }
        this.dailyForecasts.push(item)
      })
    },
    parseCurrentWeatherData(current) {
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

<style lang="css" scoped>
h1 {
  text-align: center;
}

.weather-data {
  margin-left: 40px;
  margin-top: 20px;
}
</style>
