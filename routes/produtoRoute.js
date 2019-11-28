var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/get_produtos', async function (req, res, next) {
    const { select, where } = req.query;
    try {
        const produto = req.app.get('produto');
        const listaProdutos = await produto.obterProdutos(select, where);
        res.send(listaProdutos);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.get('/post_produto', async function (req, res, next) {
    const { nome, id_praca, preco } = req.body;
    try {
        let knex = req.app.get('knex');
        const produto = req.app.get('produto');
        await knex.transaction(async function (trx) {
            produto.cadastrarProduto(trx, nome, id_praca, preco);
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

router.post('/post_produto_foto', upload.single('avatar'), async function (req, res, next) {
    try {
        const { id_produto } = req.body;

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;
