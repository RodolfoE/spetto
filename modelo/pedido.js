const utils = require('./../helpers/utils');
class Pedido {
    constructor(knex) {
        this.knex = knex;
    }

    async addPedido(trx, id_dono) {
        const idPedido = (await trx('pedido').insert({ id_dono: id_dono, data_pedido: utils.get_date_mysql(new Date().toISOString()) }));
        return idPedido[0];
    }

    async obterVlrTotalProd() {
        /**
         select * from itens_pedido i join produto p on i.id_produto = p.id_produto
				join preco pre on pre.id_produto = p.id_produto
                AND dataCorrente = (select max(dataCorrente) from preco where id_produto = p.id_produto) 
                where p.id_praca = 1
         */
    }
    /*
    async addPedido(trx, id_dono) {
        const idPedido = await trx('pedido').insert({ id_dono: id_dono, data_pedido: new Date().toISOString() });
        return utils.firstOrDefault(idPedido);
    }*/

    async addCliente(knex, nome, telefone, fiel) {
        const idDono = await knex('dono_pedido').insert({});
        await knex('cliente').insert({ id_cliente: utils.firstOrDefault(idDono), id_dono: utils.firstOrDefault(idDono), nome: nome, telefone: telefone, fiel: fiel });
        return utils.firstOrDefault(idDono);
    }


    async addMesa(knex, id_mesa) {
        const idDono = await knex('dono_pedido').insert({});
        await knex('mesa').insert({ id_mesa: id_mesa, id_dono: utils.firstOrDefault(idDono), em_uso: 0 });
        return utils.firstOrDefault(idDono);
    }
}
exports.Pedido = Pedido;


