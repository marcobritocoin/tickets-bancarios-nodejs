var socket = io();
var labelTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Servidor ON');
});

socket.on('disconnect', function() {
    console.log('Servidor OFF');
});

socket.on('estadoActual', function(resp) {
    labelTicket.attr('style', 'font-size: 250px !important');
    labelTicket.text(resp.estadoactual);
});

$('button').on('click', function() {
    socket.emit('nuevoticket', 1, function(resp) {
        labelTicket.text(resp);
    });
});