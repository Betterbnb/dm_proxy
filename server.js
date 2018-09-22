let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
const proxy = require('http-proxy-middleware');

const {routes} = require('./config.json');

app.use('/:id', express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

for (route of routes) {
  app.use(route.route,
      proxy({
          target: route.address,
      }),
  );
}

app.listen(port, ()=>{
  console.log("Listening on port ", port)
})