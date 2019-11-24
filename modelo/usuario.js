class Usuario {
    constructor(io, knex) {
        this.io = io;
        this.knex = knex;
    }

    async notificarPracaNovoItem(id_praca, item){
        this.io.sockets.emit(`NovoItemPraca${id_praca}`, item);   
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