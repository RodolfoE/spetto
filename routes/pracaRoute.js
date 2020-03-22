var express = require('express');
var router = express.Router();

router.get('/obter_itens_pendentes', async function (req, res, next) {
    const { id_praca } = req.query;
    try {
        let praca = req.app.get('praca');
        let itensPendentes = await praca.obterItensPendentes(id_praca);
        res.send(itensPendentes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.get('/pedido_acatado_cozinha', async function (req, res, next) {
    const { id_pedido, id_produto, ordem, id_responsavel_cozinha, id_responsavel } = req.query;
    try {
        let praca = req.app.get('praca');
        let usuario = req.app.get('usuario');
        await praca.itemPedidoAcatado(id_pedido, id_produto, ordem, id_responsavel_cozinha);
        usuario.notificarItemPedidoAcatado(id_responsavel, id_pedido, id_produto, ordem);
        res.send(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

router.get('/pedido_concluido', async function (req, res, next) {
    const { id_pedido, id_produto, ordem, id_responsavel } = req.query;
    try {
        let praca = req.app.get('praca');
        let usuario = req.app.get('usuario');
        await praca.itemPedidoConcluido(id_pedido, id_produto, ordem);
        usuario.notificarItemPedidoPreparado(id_responsavel, id_pedido, id_produto, ordem);
        res.send(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.get('/get_pracas', async (req, res, next) => {
    try{
        let praca = req.app.get('praca');
        let pracas = await praca.obterPracas();
        res.send(pracas);
    } catch (err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
    
});

module.exports = router;
