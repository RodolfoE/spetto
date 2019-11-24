class PedidoControlador {
    constructor(knex, pedido){
        this.knex = knex;
        this.pedido = pedido;
    }

    async adicionarPedido(dono_pedido){
        await this.knex.transaction(async function (trx) {
            id_pedido = await this.pedido.addPedido(trx, dono_pedido);
            id_pedido = 1;
        })
    }
}
exports.PedidoControlador = PedidoControlador;