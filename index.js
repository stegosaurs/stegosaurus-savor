var app = require('./server/server.js');
var port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log('Listening at port: ' + port);
});
