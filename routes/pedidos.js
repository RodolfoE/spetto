const utils = require('./../helpers/utils');
var express = require('express');
var router = express.Router();

router.post('/post_pedido_itens', async function (req, res, next) {
    let { dono_pedido, tipo_dono, id_responsavel, id_pedido, itens_pedido } = req.body;
    let dono = req.app.get('donoPedido');
    let itensPedido = req.app.get('itensPedido');
    let pedido = req.app.get('pedido');
    let usuario = req.app.get('usuario');
    let knex = req.app.get('knex');
    try {
        itens_pedido = utils.quantificarArray(itens_pedido);

        switch (tipo_dono) {
            case 'mesa':
                await knex.transaction(async function (trx) {
                    //se nao houver pedido
                    if (!id_pedido) {
                        id_pedido = await pedido.addPedido(trx, dono_pedido);
                        await dono.reservarMesa(trx, dono_pedido);
                    }
                    let itensCozinha = await itensPedido.addItensPedido(trx, id_pedido, id_responsavel, itens_pedido);

                    if (itensCozinha.length > 0) {
                        //informar cozinha dos itens com praça add
                        let produtos = await itensPedido.obterItensDoPedido(trx, id_pedido, itensCozinha);

                        //notiifar usuários das praças
                        notificacaoPorPraca = produtos.map(x => x.id_praca);
                        notificacaoPorPraca.forEach(praca => {
                            let itensDaPraca = produtos.filter(prod => prod.id_praca = praca);
                            usuario.notificarPracaNovoItem(praca, itensDaPraca);
                        });
                    }

                    //informar usuário conclusão da inserção dos itens de pediddo.
                    res.send({ id_pedido: id_pedido });
                });
                break;
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

router.get('/obter_itens_pedido', async (req, res) => {
    let { id_pedido } = req.query;
    try {
        let knex = req.app.get('knex');
        let itensPedido = req.app.get('itensPedido');
        let itens = await itensPedido.obterItensDoPedido(knex, id_pedido);
        res.send(itens);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

router.get('/obter_mesas', async (req, res) => {
    let { id_mesa } = req.query;
    try {
        let dono = req.app.get('donoPedido');
        let knex = req.app.get('knex');
        let mesas = await dono.obterMesa(knex, id_mesa);
        res.send(mesas);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})


router.get('/obter_clientes', async (req, res) => {
    let { idCliente } = req.query;
    try {
        let dono = req.app.get('donoPedido');
        let knex = req.app.get('knex');
        let mesas = await dono.obterCliente(knex, idCliente);
        res.send(mesas);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})


router.get('/obter_clientes_delivery', async (req, res) => {
    let { idCliente } = req.query;
    try {
        let dono = req.app.get('donoPedido');
        let knex = req.app.get('knex');
        let cliDelivery = await dono.obterClientesDelivery(knex, idCliente);
        res.send(cliDelivery);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

module.exports = router;
