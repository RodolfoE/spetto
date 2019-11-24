var express = require('express');
var router = express.Router();

router.post('/post_pedido_itens', async function (req, res, next) {
    let { dono_pedido, tipo_dono, id_pedido, itens_pedido } = req.body;
    let dono = req.app.get('donoPedido');
    let itensPedido = req.app.get('itensPedido');
    let pedido = req.app.get('pedido');
    try {
        switch (tipo_dono) {
            case 'mesa':
                //se nao houver pedido
                if (!id_pedido) {
                    dono.reservarMesa(dono_pedido);
                    id_pedido = await pedido.addPedido(dono_pedido);
                }
                itensPedido.addItensPedido(id_pedido, itens_pedido);
                break;
        }
        res.send({ id_pedido: id_pedido });
    } catch (err) {
        res.send(500);
    }
})

module.exports = router;
