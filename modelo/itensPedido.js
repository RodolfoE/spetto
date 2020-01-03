const utils = require('./../helpers/utils');
class ItensPedido {
    constructor(knex) {
        this.knex = knex;
    }

    /**
     * Add os itens ao pedido e retornar os itens da cozinha
     * @param {*} id_pedido pk da relação pedido
     * @param {*} itens_pedido:
     * [{ id_produto, id_responsavel, data_inicio_entrega, data_fim_entrega,
        observacao, id_responsavel_cozinha, data_inicio_cozinha, data_termino_cozinha }]
     */
    async addItensPedido(trx, id_pedido, id_responsavel, itens_pedido) {
        let itensCozinha = [];
        //inserir itens de pedido na mesa
        for (let i = 0; i < itens_pedido.length; i++) {
            const item = itens_pedido[i];

            //verificar se produto já exite na lista de pedido. Caso não, ele será o primeiro a ser add
            let ordemItem = utils.firstOrDefault(await trx.max('ordem as maior').from('itens_pedido').where({ id_pedido: id_pedido, id_produto: item.id_produto }));
            if (ordemItem) {
                item.ordem = ++ordemItem.maior;
            } else {
                item.ordem = 0;
            }

            //se item for da cozinha, guarda-lo
            if (item.id_praca) {
                itensCozinha.push({ id_produto: item.id_produto, ordem: item.ordem });
                delete item.id_praca;
            }

            //inserir id_pedido no item
            item.id_pedido = id_pedido;
            await trx('itens_pedido').insert(
                {
                    id_pedido: item.id_pedido,
                    id_produto: item.id_produto,
                    ordem: item.ordem,
                    id_responsavel: id_responsavel
                });
        }
        return itensCozinha;
    }
    /**
     * Obtem os produtos passados por parametros do pedido
     * @param {*} trx 
     * @param {int} id_pedidos 
     * @param {array object} produtos 
     */
    async obterItensDoPedido(trx, id_pedido, produtos) {
        let retorno = [];
        if (typeof produtos == 'object')
            for (let i = 0; i < produtos.length; i++) {
                const prod = produtos[i];
                let consulta = await trx.from('itens_pedido')
                    .join('produto', 'itens_pedido.id_produto', '=', 'produto.id_produto')
                    .where('id_pedido', id_pedido)
                    .where('itens_pedido.id_produto', prod.id_produto)
                    .where('ordem', prod.ordem);
                retorno.push(utils.firstOrDefault(consulta));
            }
        else 
            if (!produtos)
                retorno = await trx.from('itens_pedido')
                    .where('id_pedido', id_pedido)
            else 
                retorno = await trx.from('itens_pedido')
                    .where('id_pedido', id_pedido)
                    .where('itens_pedido.id_produto', produtos)
        return retorno;
    }
}
exports.ItensPedido = ItensPedido;

