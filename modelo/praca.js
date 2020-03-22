const utils = require('./../helpers/utils');
class Praca {
    constructor(knex) {
        this.knex = knex;
    }

    async obterItensPendentes(id_praca) {
        let query = this.knex.from('itens_pedido').innerJoin('produto').where({ id_praca: id_praca }).whereNull('data_termino_cozinha').orderBy('ordem', 'desc');
        return await query;
    }

    async itemPedidoConcluido(id_pedido, id_produto, ordem) {
        await this.knex.from('itens_pedido')
            .where({ id_pedido: id_pedido, id_produto: id_produto, ordem: ordem })
            .update({ data_termino_cozinha: utils.get_date_mysql(new Date().toISOString()) })
    }

    async itemPedidoAcatado(id_pedido, id_produto, ordem, id_responsavel_cozinha){
        await this.knex.from('itens_pedido')
            .where({ id_pedido: id_pedido, id_produto: id_produto, ordem: ordem })
            .update({ id_responsavel_cozinha: id_responsavel_cozinha, data_inicio_cozinha: utils.get_date_mysql(new Date().toISOString()) })
    }

    async obterPracas(){
        let query = this.knex.from('praca').orderBy('nome');
        let retorno = [];
        let valores = await query;
        retorno.push({nome: "Selecione", id_praca: null})
        valores.forEach(x => retorno.push(x));
        return retorno;
    }
}
exports.Praca = Praca;