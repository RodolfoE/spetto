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

    async addOuAtualizarVenda(trx, idPedido, total, data, qt_pago, fechado, nota, sugestao) {
        let temVendaCadastrada = await trx('venda').where({ id_pedido: idPedido });
        if (temVendaCadastrada.length)
            await trx('venda').update({ total: total, qt_pago: temVendaCadastrada.qt_pago + qt_pago, fechado: fechado, nota, sugestao }).where({ id_pedido: idPedido });
        else
            await trx('venda').insert({ id_Pedido: idPedido, total, data, qt_pago, fechado, nota, sugestao });
    }

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

    async obterMesaPorIdPedido(knex, idPedido) {
        let item = await knex('pedido').join('mesa', 'pedido.id_dono', '=', 'mesa.id_dono').where({ id_pedido: idPedido });
        return item;
    }

    async alterarEmUsoMesa(knex, id_dono, emUso) {
        await knex('mesa').update({ em_uso: emUso ? 1 : 0 }).where(id_dono);
    }
}
exports.Pedido = Pedido;


