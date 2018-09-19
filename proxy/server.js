let express = require('express');
let app = express();
let port = process.env.PORT || 8080;

app.use('/public/:id', express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port, ()=>{
  console.log("Listening on port ", port)
})