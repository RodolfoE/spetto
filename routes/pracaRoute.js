var express = require('express');
var router = express.Router();

router.get('/obter_itens_pendentes', async function (req, res, next) {
    const { id_praca } = req.query;
    try{
        let praca = req.app.get('praca');
        let itensPendentes = await praca.obterItensPendentes(id_praca);
        res.send(itensPendentes);
    } catch (err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

module.exports = router;
