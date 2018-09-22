let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
const proxy = require('http-proxy-middleware');
let axios = require('axios');
const {routes} = require('./config.json');

app.use('/:id', express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/house/:id", (req, res)=>{
  axios.get(`http://booking-server.us-west-1.elasticbeanstalk.com/house/${req.params.id}`)
    .then(({data})=>{
      res.send(data);
    });
});

app.get("/homes/:homeId/images", (req, res)=>{
  axios.get(`http://betterbnb.us-east-2.elasticbeanstalk.com/homes/${req.params.homeId}/images`)
    .then(({data})=>{
      res.send(data);
    });
});


app.get('/homes/:homeId/reviews/:id', (req, res)=>{
  axios.get(`http://betterbnb.us-east-2.elasticbeanstalk.com/homes/${req.params.homeId}/reviews/${req.params.id}`)
    .then(({data})=>{
      res.send(data);
    });
});

app.get('/reviews/queried/:query', (req, res)=>{
  axios.get(`http://betterbnb.us-east-2.elasticbeanstalk.com/reviews/queried/${req.params.query}`)
    .then(({data})=>{
      res.send(data);
    });
});

app.get('/reviews/queried/:query/:id', (req, res)=>{
  axios.get(`http://betterbnb.us-east-2.elasticbeanstalk.com/reviews/queried/${req.params.query}/${req.params.id}`)
    .then(({data})=>{
      res.send(data);
    });
});


app.listen(port, ()=>{
  console.log("Listening on port ", port)
});