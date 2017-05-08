<template lang="html">
  <div class="weather">
    <h1>Weather App</h1>

    <location :location="location"></location>

    <div v-if="hasForecast">
      <now :summary = "dailySummary"></now>
    </div>

    <div class="tabs-container" v-if="hasForecast">
      <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
      <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
      <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />

      <div class="tabs flex-tabs">
        <label for="tab-one" id="tab-one-label" class="tab">Today</label>
        <label for="tab-two" id="tab-two-label" class="tab">The next hours</label>
        <label for="tab-three" id="tab-three-label" class="tab">The next days</label>

        <div id="tab-one-panel" class="panel active">
          <current-weather :current="current"></current-weather>
        </div>
        <div id="tab-two-panel" class="panel">
          <hour-forecast :hourlyForecasts = "hourlyForecasts"></hour-forecast>
        </div>
        <div id="tab-three-panel" class="panel">
          <days-forecast :dailyForecasts = "dailyForecasts"></days-forecast>
        </div>
      </div>
    </div>

    <div v-else>
      <h3 class='forecasts-spinner-text' v-if="location.hasLocationName">Fetching forecast ... </h3>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Summary from './Summary.vue'
import CurrentWeather from './CurrentWeather.vue'
import DaysForecast from './DaysForecast.vue'
import HoursForecast from './HoursForecast.vue'
import Location from './Location.vue'

export default {
  components: {
    'now': Summary,
    'current-weather': CurrentWeather,
    'hour-forecast': HoursForecast,
    'days-forecast': DaysForecast,
    'location': Location
  },
  data () {
      return {
        // station: '',
        // lat: 0.0,
        // lng: 0.0,
        // hasLocationName: false,
        hasForecast: false,
        location: {
          station: '',
          lat: 0.0,
          lng: 0.0,
          hasLocationName: false
        },
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
      this.reverseGeocode()
    })
    .catch((err)=>{
      alert(err)
    })
  },

  methods: {
    getWeather() {
      let url = `http://localhost:8081/api/forecast/${this.location.lat},${this.location.lng}`
      console.log(url)
      axios.get(url)
            .then((res) => {
              this.hasForecast = true
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

      reverseGeocode() {
        var geocoder = new google.maps.Geocoder();
        var pos = new google.maps.LatLng(this.location.lat, this.location.lng);
        geocoder.geocode({'latLng': pos}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              let station = '';
              if (results[0].address_components) {
                results[0].address_components.forEach((component)=>{
                  let componentType = component.types[0].trim()
                  if (componentType === 'postal_town') {
                    this.location.station = component.long_name;
                    this.location.hasLocationName = true;
                  }
                  if ((componentType === 'locality') && (this.location.station==='')) {
                    this.location.station = component.long_name;
                    this.location.hasLocationName = true;
                  }
                  if((componentType === 'administrative_area_level_1') && (this.location.station==='')) {
                    this.station = component.long_name
                    this.hasLocationName = true;
                  }
                  if((componentType ===  'administrative_area_level_2') && (this.location.station==='')) {
                    this.location.station = component.long_name
                    this.location.hasLocationName = true;
                  }
                })
              }
            }
          }.bind(this))
      },

    parseHourlyForecast(hourly) {
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

      console.log('dailySummary: ' + this.dailySummary)

      let forecasts = daily.data
      console.log('Iterating Daily forecasts');

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
              this.location.lng = position.coords.longitude
              this.location.lat = position.coords.latitude
              resolve()
            }.bind(this))
          } else {
            reject('Cannot use geolocation')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts';
@import '../assets/styles/flexcordion';

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

.forecasts-spinner-text {
  text-align: center;
  margin-top: 1em;

}
</style>
