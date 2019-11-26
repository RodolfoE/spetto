var express = require('express');
var router = express.Router();

router.post('/post_pedido_itens', async function (req, res, next) {
    let { dono_pedido, tipo_dono, id_pedido, itens_pedido } = req.body;
    let dono = req.app.get('donoPedido');
    let itensPedido = req.app.get('itensPedido');
    let pedido = req.app.get('pedido');
    let usuario = req.app.get('usuario');
    let knex = req.app.get('knex');
    try {
        switch (tipo_dono) {
            case 'mesa':
                await knex.transaction(async function (trx) {
                    //se nao houver pedido
                    if (!id_pedido) {
                        id_pedido = await pedido.addPedido(trx, dono_pedido);
                        await dono.reservarMesa(trx, dono_pedido);
                    }

                    let itensCozinha = await itensPedido.addItensPedido(trx, id_pedido, itens_pedido);

                    //informar cozinha dos itens com praça add
                    itensCozinha.forEach(item => {
                        usuario.notificarPracaNovoItem(item.id_praca, item);
                    })
                    res.send({ id_pedido: id_pedido });
                })

                break;
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

module.exports = router;
