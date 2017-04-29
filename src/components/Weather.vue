<template lang="html">
  <div class="weather">
    <h1>Weather app</h1>
    <div class = 'weather-data'>
      <div class='location'>Lat: {{lat}}, Lng: {{lng}}</div>
      <hr>
      <div class="summary">
        <div class='summary-head'>{{dailySummary.text}}</div>
      </div>
      <div class='current'>
        <h2>Now</h2>
        <div class='today-text'>{{current.summary}}</div>
        <div class="temp">Temperature {{current.temp}}</div>
        <div class="humidity">Humidity {{current.humidity}} %</div>
        <div class="pressure">Air pressure {{current.pressure}}</div>
        <div class="wind">Wind {{current.bearing}} &deg; / {{current.windspeed}} m/s</div>
      </div>

      <hr>

      <div class = 'hourly'>
        <h2>The next hours</h2>
        <ul>
          <li v-for="hour in hourlyForecasts">
            <h3 class="time">{{hour.time}}</h3>
            <div class='summary'>{{hour.summary}}</div>
            <div class="temp">Temperature {{hour.temp}} &deg;C</div>
            <div class="humidity">Humidity {{hour.humidity}} %</div>
            <div class="precip">Precimitation {{hour.precip}} mm (probability {{hour.preciProb}} %)</div>
            <div class="wind">Wind {{hour.windBearing }} &deg; {{hour.windspeed}} m/s</div>
          </li>
        </ul>
      </div>

      <hr>

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
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

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
            cloud: Math.round(dataItem.cloudCover * 100),
            humidity: Math.round(dataItem.humidity * 100),
            icon: dataItem.icon,
            ozone: Math.round(dataItem.ozone),
            precip: Math.round(dataItem.precipIntensity),
            preciProb: Math.round(dataItem.precipProbability * 100),
            pressure: Math.round(dataItem.pressure),
            summary: dataItem.summary,
            temp: Math.round(dataItem.temperature),
            time: moment.unix(dataItem.time).format('ddd HH:mm'),
            windBearing: dataItem.windBearing,
            windspeed: Math.round(dataItem.windSpeed)
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
      // TODO remove first item
      forecasts.map((forecast) => {
        let item = {
          date: moment.unix(forecast.time).format('ddd Do'),
          summary: forecast.summary,
          maxTemp: Math.round(forecast.apparentTemperatureMax),
          minTemp: Math.round(forecast.apparentTemperatureMin),
          cloud: Math.round(forecast.cloudCover * 100),
          humidity: forecast.humidity * 100,
          icon: forecast.icon,
          windSpeed: Math.round(forecast.windSpeed),
          bearing: forecast.windBearing,
          sunrise: moment.unix(forecast.sunriseTime).format('HH:mm'),
          sunset: moment.unix(forecast.sunsetTime).format('HH:mm'),
          moon: Math.round(forecast.moonPhase * 100),
        }
        this.dailyForecasts.push(item)
      })
    },
    parseCurrentWeatherData(current) {
      console.log('Current', current);
      this.current = {
            summary: current.summary,
            temp: Math.round(current.temperature),
            humidity: Math.round(current.humidity * 100),
            cloud: Math.round(current.cloudCover * 100),
            pressure: Math.round(current.pressure),
            bearing: current.windBearing,
            windspeed: Math.round(current.windSpeed),
            ozone: Math.round(current.ozone)
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

ul {
  list-style: none;
}

li {
  padding: 10px 20px 0 10px;
  border-radius: 2px solid black;
}
</style>
