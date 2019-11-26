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
    async addItensPedido(trx, id_pedido, itens_pedido) {
        let itensCozinha = [];
        //inserir itens de pedido na mesa
        for (let i = 0; i < itens_pedido.length; i++) {
            const item = itens_pedido[i];

            //se item for da cozinha, guarda-lo
            if (item.id_praca) {
                let itemAAdd = JSON.parse(JSON.stringify(item));
                itensCozinha.push(itemAAdd);
                delete item.id_praca;
            }

            //verificar se produto já exite na lista de pedido. Caso não, ele será o primeiro a ser add
            let ordemItem =  utils.firstOrDefault(await trx.max('ordem as maior').from('itens_pedido').where({ id_pedido: id_pedido, id_produto: item.id_produto }));
            if (ordemItem){
                item.ordem = ++ordemItem.maior;
            } else {
                item.ordem = 0;
            }           

            //inserir id_pedido no item
            item.id_pedido = id_pedido;
            await trx('itens_pedido').insert(item);
        }
        return itensCozinha;
    }
}
exports.ItensPedido = ItensPedido;