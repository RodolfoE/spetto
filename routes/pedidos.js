var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const util = require('util');
const io = require('./../app');

router.post('/post_pedido_itens', async function (req, res, next) {
    let aux = 1;
    let { num_mesa, id_pedido, itens_pedido } = req.body;
    try {
        var knex = require('knex')({
            client: 'mysql',
            connection: {
                host: "localhost",
                user: "root",
                password: "556556",
                database: "sys"
            }
        });
        knex.transaction(async function (trx) {
            let em_uso = (await trx.select('em_uso').from('mesa'))[0];
            if (em_uso === undefined || em_uso === null) {
                throw Error('Mesa não existe.');
            }

            //se mesa não estiver ativa, atualizar seu status.
            if (em_uso.em_uso === 0) {
                await trx('mesa').where('num_mesa', num_mesa).update('em_uso', 1);
            }

            //verificar se já existe pedido pra mesa
            if (!id_pedido) {
                id_pedido = (await trx('sys.pedidos').insert({ num_mesa: num_mesa }))[0];
            }

            //inserir itens ;de pedido na mesa
            for (let i = 0; i < itens_pedido.length; i++) {
                const item = itens_pedido[i];
                const { id_produto, observacao, fim, resp_pedido, garcon } = item;

                //verificar existencia de produto no pedido. 
                let qtd = await trx.select('quantidade').from('sys.itens_pedido').where({ id_pedido: id_pedido, id_produto: id_produto });
                if (qtd && qtd.length) {
                    //incrementar quantidade em 1
                    await trx('sys.itens_pedido').update('quantidade', ++qtd[0].quantidade);
                } else {
                    await trx('sys.itens_pedido').insert({ id_pedido: id_pedido, id_produto: id_produto, observacao: observacao, inicio: new Date().toISOString().split('T')[0], resp_pedido: resp_pedido, garcon: garcon });
                }
            }
        })
        io.socket.emit('connection', 'rodolfo', 'voce tá ai cara');
        res.send({ id_pedido: id_pedido });
    } catch (err) {
        res.send(500);
    }
})

module.exports = router;
