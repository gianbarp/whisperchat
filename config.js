module.exports = function(app, express)
{

  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'fcsdcljh454(*£$JHDKjcscjsjk//.?!354jh' }));
    app.use(require('stylus').middleware({ src: __dirname + '/stylus', dest: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });
  
}
