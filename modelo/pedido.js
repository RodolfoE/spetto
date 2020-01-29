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

    async addOuAtualizarVenda(trx, id_pedido, total, data, qt_pago, fechado, id_forma, nota, sugestao) {
        let temVendaCadastrada = await trx('venda').where({ id_pedido });
        if (temVendaCadastrada.length) {
            await trx('venda').update({ total: total, qt_pago: temVendaCadastrada[0].qt_pago + qt_pago, fechado, nota, sugestao }).where({ id_pedido });
            await trx('formas_pagamento').insert({ id_pedido, id_forma, valor: qt_pago })
        }
        else {
            await trx('venda').insert({ id_Pedido: id_pedido, total, data, qt_pago, fechado, nota, sugestao });
            await trx('formas_pagamento').insert({ id_pedido, id_forma, valor: qt_pago })
        }
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
        return item ? item[0] : null;
    }

    async alterarEmUsoMesa(knex, id_dono, emUso) {
        await knex('mesa').update({ em_uso: emUso ? 1 : 0 }).where({ id_dono });
        return true;
    }

    async obterFormasPagamento(knex, where) {
        let query = knex('pagamento');
        if (where)
            query.where(where);
        let item = await query;
        return item;
    }

    async obterParciaisPedido() {
        let query = knex('venda').join('formas_pagamento', 'venda.id_forma', '=', 'formas_pagamento.id_forma');
        if (itensSelect)
            query.select(itensSelect);
        if (where)
            query.where(where);
        let result = await query;
        return result;
    }
}
exports.Pedido = Pedido;


