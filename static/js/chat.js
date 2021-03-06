$(function(){

  var socket    = io.connect('/'),
      $login    = $('#login'),
      $chat     = $('#chat')
      $messages = $('#messages');

  socket.on('connect',  function(){
    console.log('connected with socket...');

    init();
  });

  var init = function()
  {
    $('#nickname').keyup(function(e){
      var code = e.which || e.keyCode;

      if (code == 13) {
       setNickname($(this).val()); 
      }
    });

    $chat.hide();
  };

  var setNickname = function(nickname)
  {
    socket.emit('set_nickname', nickname, function(is_available){
      if(is_available){
        console.log('Nickname ' + nickname + ' is available');

        setupChat(nickname);
      } else {
        console.log('Nickname ' + nickname + ' is not available');
      }
    });
  };

  var setupChat = function(nickname)
  {
    $login.hide();
    $chat.show();
    $('#message').focus();
    
    $('#submit').click(function(){
      sendMessage($('#message').val());
    });
    
    $('#message').keyup(function(e){
      var code = e.which || e.keyCode;

      if (code == 13) {
        sendMessage($('#message').val());
      }
    });
    
    socket.on('message', function(nickname, message){
      addMessage(nickname, message);
    });
  };
  
  var sendMessage = function(msg)
  {
    $('#message').val('');
    socket.emit('message', msg);
  }
  
  var addMessage = function(nickname, message)
  {
    $('#messages').append('<li>@' + nickname + ': ' + message + '</li>');
  }
});
