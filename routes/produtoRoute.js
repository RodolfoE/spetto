var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/get_produtos', async function (req, res, next) {
    const { select, where } = req.query;
    try {
        const produto = req.app.get('produto');
        const listaProdutos = await produto.obterProdutos(select, where);
        res.send(listaProdutos[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.post('/post_produto', async function (req, res, next) {
    const { nome, id_praca, valor, valor_de_custo, id_categoria, estoque } = req.body;
    let trx;
    try {
        let knex = req.app.get('knex');
        const produto = req.app.get('produto');
        trx = await knex.transaction();
        await produto.cadastrarProduto(trx, nome, id_praca, valor, valor_de_custo, id_categoria, estoque);
        await trx.commit();
        res.sendStatus(200);
    } catch (err) {
        trx.rollback()
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

router.post('/post_categoria', upload.single('avatar'), async function (req, res, next) {
    try {
        const { nome } = req.body;
        const produto = req.app.get('produto');
        let id_categoria = await produto.cadastrarCategoria(nome);
        res.send(id_categoria);        
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.get('/get_categoria',  async function (req, res, next) {
    try {
        const produto = req.app.get('produto');
        let categorias = await produto.obterCategoria();
        res.send(categorias);      
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});



module.exports = router;
