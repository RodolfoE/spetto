class Usuario {
    constructor(io, knex) {
        this.io = io;
        this.knex = knex;
    }

    async notificarPracaNovoItem(id_praca, produtos) {
        this.io.sockets.emit(`NovoItemPraca${id_praca}`, produtos);
    }

    async notificarItemPedidoPreparado(id_responsavel, id_pedido, id_produto, ordem) {
        this.io.sockets.emit(`pedidoCozido${id_responsavel}`, { id_pedido, id_produto, ordem });
    }

    async notificarItemPedidoAcatado(id_responsavel, id_pedido, id_produto, ordem) {
        this.io.sockets.emit(`pedidoAcatado${id_responsavel}`, { id_pedido, id_produto, ordem });
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