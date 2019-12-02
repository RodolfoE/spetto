const utils = require('./../helpers/utils');
class Praca {
    constructor(knex) {
        this.knex = knex;
    }

    async obterItensPendentes(id_praca) {
        let query = this.knex.from('itens_pedido').innerJoin('produto').where({ id_praca: id_praca }).whereNull('data_termino_cozinha').orderBy('ordem', 'desc');
        return await query;
    }
}
exports.Praca = Praca;