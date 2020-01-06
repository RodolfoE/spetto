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
        let query = knex.from('mesa');
        if (num_mesa){
            query.where('id_mesa', num_mesa);
        }
        let mesa = await query;
    }

    async cadastrarCliente(){
        
    }

    async cadastrarClienteDelivery(){
        
    }
}
exports.DonoPedido = DonoPedido;