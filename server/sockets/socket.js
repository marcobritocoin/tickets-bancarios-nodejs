const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Enviando los tickets inicial
    client.emit('estadoActual', {
        estadoactual: ticketcontrol.getUltimoTicket(),
        ultimoscuatro: ticketcontrol.getUltimosCuatro()
    });

    // Escuchar un nuevo ticket
    client.on('nuevoticket', (data, callback) => {
        const result = ticketcontrol.siguienteTicket();
        callback(result);
    });

    client.on('atenderticket', (data, callback) => {

        //console.log('--> ' + data.escritorio);

        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar / notificar cambios en los Ultimos 4

        client.broadcast.emit('estadoActual', {
            ultimoscuatro: ticketcontrol.getUltimosCuatro()
        });

    });


});