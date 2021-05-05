const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo; // Ticket Actual atendido
            this.tickets = data.tickets; // Por atender
            this.ultimosCuatro = data.ultimosCuatro; // Atendidos
            //console.log(this.ultimo);
        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return this.ultimo;
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; // Evitar valor pasado por referencia
        this.tickets.shift(); // Elimino el primer elemento
        // console.log(numeroTicket);
        // console.log(escritorio);

        let atenderTicket = new Ticket(numeroTicket, escritorio); // crear un ticket asignado

        this.ultimosCuatro.unshift(atenderTicket); // Agregar ticket al inicio del arreglo

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); // Eliminar el ultimo elemento
        }

        console.log('Ultimos cuatro: ', this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Reinicializado el contador');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }


}


module.exports = {
    TicketControl
}