const utils = require('./../helpers/utils');
class Pedido {
    constructor(knex) {
        this.knex = knex;
    }

    /*async addPedido(trx, id_dono) {
        const idPedido = (await trx('pedido').insert({ id_dono: id_dono, data_pedido: utils.get_date_mysql(new Date().toISOString()) }));
        return idPedido[0];
    }*/

    async addPedido(trx, id_dono) {
        const idPedido = await trx('pedido').insert({ id_dono: id_dono, data_pedido: new Date().toISOString() }).returning('id_pedido');
        return utils.firstOrDefault(idPedido);
    }
}
exports.Pedido = Pedido;


