var express = require('express');
var router = express.Router();

router.get('/get_produtos', async function (req, res, next) {
    const { select, orderby, where } = req.query;
    try {
        const produto = req.app.get('produto');
        const listaProdutos = await produto.obterProdutos(select, orderby, where);
        res.send(listaProdutos);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.post('/post_produto', async function (req, res, next) {
    try {
        const { produto, preco } = req.body;

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;
