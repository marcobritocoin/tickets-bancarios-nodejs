var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('EL escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

//console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderticket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        label.attr('style', 'font-size: 50px !important; font-weight: 600 !important;');


        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket: ' + resp.numero);
    });

});