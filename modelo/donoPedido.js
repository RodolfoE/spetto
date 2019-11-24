class DonoPedido{
    constructor(knex){
        this.knex = knex;
    }
    
    async reservarMesa(num_mesa){
        let em_uso = (await this.knex.select('em_uso').from('mesa').where('id_mesa', num_mesa))[0];
        if (em_uso === undefined || em_uso === null) {
            throw Error('Mesa não existe.');
        }
        //se mesa não estiver ativa, atualizar seu status.
        if (em_uso.em_uso === 0) {
            await this.knex('mesa').where('id_mesa', num_mesa).update('em_uso', 1);
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