const axios = require('axios')

let api = (app) => {

  app.get('/api/forecast/:position', (req, res) => {
    console.log(req.params);
    const coords =  req.params.position.split(',')
    const lat = coords[0]
    const lng = coords[1]
    const DARK_WEATHER_KEY = 'dd7aee29471de7467a81eb91c6be98d9'
    const url = `https://api.darksky.net/forecast/${DARK_WEATHER_KEY}/${lat},${lng}?units=auto`

    console.log(url);
    axios.get(url)
            .then((forecast)=>{
              console.log('Returning forecast');
              let data = forecast.data
              console.log('Got data');
              res.send({status: 'OK', data: data});
            })
            .catch((e)=>{
              // console.log(e);
              console.log("ERR!!!!!");
              res.status(404).send(e);
            });
  });

  app.get('/api/', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
