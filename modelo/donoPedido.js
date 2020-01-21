const utils = require('./../helpers/utils');
class DonoPedido{
    constructor(knex){
        this.knex = knex;
    }
    
    async reservarMesa(trx, num_mesa){
        let em_uso =  utils.firstOrDefault(await trx.select('em_uso').from('mesa').where('id_dono', num_mesa));
        if (em_uso === undefined || em_uso === null) {
            throw Error('Mesa não existe.');
        }
        //se mesa não estiver ativa, atualizar seu status.
        if (em_uso.em_uso === 0) {
            await trx('mesa').where('id_dono', num_mesa).update('em_uso', 1);
        } else {
            throw Error('Mesa em uso');
        }
    }

    async obterMesa(knex, num_mesa){
        let query = knex.from('mesa').join('dono_pedido', 'mesa.id_dono', 'dono_pedido.id_dono').leftJoin('pedido', 'pedido.id_dono', 'dono_pedido.id_dono');
        if (num_mesa){
            query.where('mesa.num_mesa', num_mesa);
        }
        query.orderBy('em_uso', 'desc')
        let mesa = await query;
        return mesa;
    }
    
    async obterCliente(knex, idCliente){
        let query = knex.from('cliente').join('dono_pedido', 'cliente.id_dono', 'dono_pedido.id_dono').leftJoin('pedido', 'pedido.id_dono', 'dono_pedido.id_dono');
        if (idCliente){
            query.where('cliente_delivery.id_dono', idCliente);
        }
        query.orderBy('em_uso', 'desc')
        let mesa = await query;
        return mesa;
    }

    async obterClientesDelivery(knex, idClienteDel){
        let query = knex.from('cliente_delivery').join('dono_pedido', 'cliente_delivery.id_dono', 'dono_pedido.id_dono').leftJoin('pedido', 'pedido.id_dono', 'dono_pedido.id_dono');
        if (idClienteDel){
            query.where('cliente_delivery.id_dono', idClienteDel);
        }
        query.orderBy('em_uso', 'desc')
        let cliente = await query;
        return cliente;
    }

    async cadastrarCliente(){
        
    }

    async cadastrarClienteDelivery(){
        
    }
}
exports.DonoPedido = DonoPedido;