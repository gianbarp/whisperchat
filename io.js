module.exports = function(app)
{
  var io = require('socket.io').listen(app);
  
  io.configure(function(){
    io.disable('log');
  });
  
  io.sockets.on('connection', function(socket){
    console.log('client connected...');

    socket.on('set_nickname', function(nickname, callback){
      console.log('trying to set nickname ' + nickname);
      
      var isAvailable = isNicknameAvailable(nickname);
      if(isAvailable)
        socket.nickname = nickname;
        
      callback(isAvailable);
      
      sendMessage('SERVER', '@' + nickname + ' is now connected');
    });
    
    socket.on('message', function(message){
      sendMessage(socket.nickname, message);
    });
    
    socket.on('disconnect', function(){
      sendMessage('SERVER', '@' + socket.nickname + ' has left the chat');
    });
  });
  
  var sendMessage = function(nickname, message)
  {
    io.sockets.emit('message', nickname, message);
  }

  var isNicknameAvailable = function(nickname)
  {
    var clients = io.sockets.clients();
    
    for(var client in clients){
      if(clients.hasOwnProperty(client)){
        client = clients[client];
        
        if(client.nickname == nickname)
          return false;
      }
    }

    return true;
  }
}
