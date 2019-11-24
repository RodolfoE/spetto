class DonoPedido{
    constructor(knex){
        this.knex = knex;
    }
    
    async reservarMesa(trx, num_mesa){
        let em_uso = (await trx.select('em_uso').from('mesa').where('id_dono', num_mesa))[0];
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

    async cadastrarCliente(){
        
    }

    async cadastrarClienteDelivery(){
        
    }
}
exports.DonoPedido = DonoPedido;