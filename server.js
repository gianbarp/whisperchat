/**
 * Whisper Chat Server
 * Main Script
 */

var express = require('express');
var app = express.createServer();

app.listen(process.env['app_port'] || 3000);


app.configure(function(){
  app.set('view options', {
    layout: false
  });
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/static'));
});

require('./routes')(app);
require('./io')(app);
require('./stylus')(app, express);
