class Produto {
    constructor(knex) {
        this.knex = knex;
    }

    async obterProdutos(select, where) {
        //const query = this.knex('produto').select().leftJoin('preco', 'preco.id_produto', 'produto.id_produto');
        where = where ? 'where ' + where : '';
        const query = this.knex.raw(`select ${select ? select : '*'} from 
             produto p join preco r on p.id_produto = r.id_produto
             AND dataCorrente = (select max(dataCorrente) from preco where id_produto = p.id_produto) 
             ${where}
             order by dataCorrente DESC`)
        return await query;
    }
}

exports.Produto = Produto;