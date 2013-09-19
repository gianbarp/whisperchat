module.exports = function(app, express)
{

  var stylus = require('stylus');
  
  app.configure(function(){
    app.use(stylus.middleware({
      src: __dirname + '/stylus',
      dest: __dirname + '/static',
      force: true,
      compile: function(str, path) {
        return stylus(str)
          .set('filename', path)
          .set('compress', true)
          .set('warn', true);
      }
    }));
  });
  app.use(express.static(__dirname + '/static'));
}
