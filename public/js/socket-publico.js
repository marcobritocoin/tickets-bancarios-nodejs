var socket = io();

var label1 = $('#lblTicket1');
var label2 = $('#lblTicket2');
var label3 = $('#lblTicket3');
var label4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [label1, label2, label3, label4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(resp) {
    //console.log(resp);
    actualizaHTML(resp.ultimoscuatro);
});

function actualizaHTML(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}