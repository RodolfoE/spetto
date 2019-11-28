class Produto {
    constructor(knex) {
        this.knex = knex;
    }

    async cadastrarProduto(trx, nome, id_praca, preco) {
        //se não houver nome, não permitir o cadastro.
        if (!nome) {
            throw Error('Não é possível cadastrar produto sem um nome');
        }

        //se não houver preco, não permitir o cadastro
        if (!preco) {
            throw Error('Não é possível cadastrar produto sem um preço');
        }

        //inserir itens no banco de dados;
        let id_produto = await trx('produto').insert({ nome: nome, id_praca: id_praca }).returning('id_produto');
        let id_preco = await trx('preco').insert({ id_produto: id_produto, valor: preco, dataCorrente: new Date().toISOString() }).returning('id_preco');
        return { id_produto, id_preco };
    }

    /**
     * @param {string} select 
     * @param {JSON} where 
     */
    async obterProdutos(select, where) {
        //const query = this.knex('produto').select().leftJoin('preco', 'preco.id_produto', 'produto.id_produto');
        let whereClause = 'where ';
        let condicoes = Object.keys(where);
        for (let i = 0; i < condicoes.length; i++) {
            const element = condicoes[i];
            whereClause += element + "=" + "'" + where[element] + "'";
            if (i != condicoes.length - 1) {
                whereClause += ' AND ';
            }
        }
        const query = this.knex.raw(`select ${select ? select : '*'} from 
             produto p join preco r on p.id_produto = r.id_produto
             AND dataCorrente = (select max(dataCorrente) from preco where id_produto = p.id_produto) 
             ${whereClause}
             order by dataCorrente DESC`)
        return await query;
    }
}

exports.Produto = Produto;