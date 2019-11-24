class ItensPedido {
    constructor(knex) {
        this.knex = knex;
    }   

    /**
     * @param {*} id_pedido pk da relação pedido
     * @param {*} itens_pedido:
     * [{ id_produto, id_responsavel, data_inicio_entrega, data_fim_entrega,
        observacao, id_responsavel_cozinha, data_inicio_cozinha, data_termino_cozinha }]
     */
    async addItensPedido(id_pedido, itens_pedido) {
        knex.transaction(async function (trx) {
            //inserir itens ;de pedido na mesa
            for (let i = 0; i < itens_pedido.length; i++) {
                const item = itens_pedido[i];

                //verificar existencia de produto no pedido. 
                let qtd = await trx.select('quantidade').from('itens_pedido').where({ id_pedido: id_pedido, id_produto: id_produto });
                if (qtd && qtd.length) {
                    //incrementar quantidade em 1
                    await trx('itens_pedido').update('quantidade', ++qtd[0].quantidade);
                } else {
                    await trx('itens_pedido').insert(item);
                }
            }
        })
    }
}
exports.ItensPedido = ItensPedido;