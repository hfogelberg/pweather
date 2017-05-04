<template lang="html">
  <div class="weather">
    <h1>Weather App</h1>

    <div class='location' v-if = "hasLocationName">
      Lat: {{lat}}, Lng: {{lng}}
    </div>
    <div class = "locationSpinner">
      <h2>Checking where you are ... </h2>
    </div>

    <div class="tabs-container">
      <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
      <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
      <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />

      <div class="tabs flex-tabs">
        <label for="tab-one" id="tab-one-label" class="tab">Daily Summary</label>
        <label for="tab-two" id="tab-two-label" class="tab">The next hours</label>
        <label for="tab-three" id="tab-three-label" class="tab">The next days</label>

        <div id="tab-one-panel" class="panel active">
          <now :summaryText = "dailySummary"></now>
        </div>
        <div id="tab-two-panel" class="panel">
          <hour-forecast :hourlyForecasts = "hourlyForecasts"></hour-forecast>
        </div>
        <div id="tab-three-panel" class="panel">
          <days-forecast :dailyForecasts = "dailyForecasts"></days-forecast>
        </div>
      </div>
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

export default {
  components: {
    'now': Summary,
    'current-weather': CurrentWeather,
    'hour-forecast': HoursForecast,
    'days-forecast': DaysForecast
  },
  data () {
      return {
        station: '',
        lat: 0.0,
        lng: 0.0,
        hasLocationName: true,
        hasForecast: true,
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
              var geocoder = new google.maps.Geocoder();
              this.lng = position.coords.longitude
              this.lat = position.coords.latitude
              var pos = new google.maps.LatLng(this.lat, this.lng);
              geocoder.geocode({'latLng': pos}, function(results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                    let station = '';
                    if (results[0].address_components) {
                      results[0].address_components.forEach((component)=>{
                        let componentType = component.types[0].trim()
                        console.log(componentType);
                        if (componentType === 'postal_town') {
                          console.log('1');
                          station = component.long_name;
                        }
                        if ((componentType === 'locality') && (station==='')) {
                          console.log('2');
                          station = component.long_name;
                        }
                        if((componentType === 'administrative_area_level_1') && (station==='')) {
                          console.log('3');
                          station = component.long_name
                        }
                        if((componentType ===  'administrative_area_level_2') && (station==='')) {
                          console.log('4');
                          station = component.long_name
                        }
                      })
                      this.station = station;
                      hasLocationName: true;
                    }
                  }
                })
            }.bind(this))
          } else {
            reject('Cannot use geolocation')
        }
      })
    }
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

/*Flexcordion*/
/* Android 2.3 :checked fix */
@-webkit-keyframes fake {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
@keyframes fake {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
body {
  -webkit-animation: fake 1s infinite;
          animation: fake 1s infinite;
}

.tabs-container {
  margin: 20px;
  width: 80%;
}

.tabs-container .state {
  position: absolute;
  left: -10000px;
}

.tabs-container .flex-tabs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}

.tabs-container .flex-tabs .tab {
  -webkit-box-flex: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  max-height: 40px;
}

.tabs-container .flex-tabs .panel {
  background-color: #fff;
  padding: 20px;
  min-height: 300px;
  display: none;
  width: 100%;
  -ms-flex-preferred-size: auto;
      flex-basis: auto;
}

.tabs-container .tab {
  display: inline-block;
  padding: 10px;
  vertical-align: top;
  background-color: #eee;
  cursor: hand;
  cursor: pointer;
  border-left: 10px solid #ccc;
}

.tabs-container .tab:hover {
  background-color: #fff;
}

#tab-one:checked ~ .tabs #tab-one-label,
#tab-two:checked ~ .tabs #tab-two-label,
#tab-three:checked ~ .tabs #tab-three-label,
#tab-four:checked ~ .tabs #tab-four-label {
  background-color: #fff;
  cursor: default;
  border-left-color: #69be28;
}

#tab-one:checked ~ .tabs #tab-one-panel,
#tab-two:checked ~ .tabs #tab-two-panel,
#tab-three:checked ~ .tabs #tab-three-panel,
#tab-four:checked ~ .tabs #tab-four-panel {
  display: block;
}

@media (max-width: 600px) {
  .flex-tabs {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .flex-tabs .tab {
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
  .flex-tabs .tab:last-of-type {
    border-bottom: none;
  }
  .flex-tabs #tab-one-label {
    -webkit-box-ordinal-group: 2;
        -ms-flex-order: 1;
            order: 1;
  }
  .flex-tabs #tab-two-label {
    -webkit-box-ordinal-group: 4;
        -ms-flex-order: 3;
            order: 3;
  }
  .flex-tabs #tab-three-label {
    -webkit-box-ordinal-group: 6;
        -ms-flex-order: 5;
            order: 5;
  }
  .flex-tabs #tab-four-label {
    -webkit-box-ordinal-group: 8;
        -ms-flex-order: 7;
            order: 7;
  }
  .flex-tabs #tab-one-panel {
    -webkit-box-ordinal-group: 3;
        -ms-flex-order: 2;
            order: 2;
  }
  .flex-tabs #tab-two-panel {
    -webkit-box-ordinal-group: 5;
        -ms-flex-order: 4;
            order: 4;
  }
  .flex-tabs #tab-three-panel {
    -webkit-box-ordinal-group: 7;
        -ms-flex-order: 6;
            order: 6;
  }
  .flex-tabs #tab-four-panel {
    -webkit-box-ordinal-group: 9;
        -ms-flex-order: 8;
            order: 8;
  }

  #tab-one:checked ~ .tabs #tab-one-label,
  #tab-two:checked ~ .tabs #tab-two-label,
  #tab-three:checked ~ .tabs #tab-three-label,
  #tab-four:checked ~ .tabs #tab-four-label {
    border-bottom: none;
  }

  #tab-one:checked ~ .tabs #tab-one-panel,
  #tab-two:checked ~ .tabs #tab-two-panel,
  #tab-three:checked ~ .tabs #tab-three-panel,
  #tab-four:checked ~ .tabs #tab-four-panel {
    border-bottom: 1px solid #ccc;
  }
}

</style>
