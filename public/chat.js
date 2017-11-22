var socket = io.connect('http://localhost:4000/');

message = $('#message');
handle  = $('#handle');
btn     = $('#send');
output  = $('#output');
feedback = $('#feedback');

btn.click(function() {
    socket.emit('chat', {
        message: message.val(),
        handle : handle.val()
    });
})

message.keypress(function() {
    socket.emit('typing', handle.val());
});

message.focusout(function() {
    socket.emit('notyping', handle.val());
})

socket.on('chat', function(data) {
    feedback.html('');
    output.append('<p><strong>'+data.handle+': </strong> '+data.message+'</p>');
});

socket.on('typing', function(data) {
    feedback.html('<p><em>'+data+' is typing a message... </em></p>');
})

socket.on('notyping', function(data) {
    feedback.html('');
})
