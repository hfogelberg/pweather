let api = (app) => {
  app.get('/api/', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
