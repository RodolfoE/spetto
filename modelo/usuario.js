class Usuario {
    constructor(io, knex) {
        this.io = io;
        this.knex = knex;
    }

    async notificarPracaNovoItem(id_praca, produtos){
        this.io.sockets.emit(`NovoItemPraca${id_praca}`, produtos);   
    }
 
    teste() {
        io.socket.emit('connection', 'rodolfo', 'voce tá ai cara');
        this.io.on('connection', function (socket) {
            console.log('cheguei aki');
            socket.on('my other event', function (data) {
            });
        });
        return 'bla';
    }
}

exports.Usuario = Usuario;