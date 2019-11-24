var express = require('express');
var router = express.Router();
var io = require('socket.io')

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.app.get('usuario').teste();
  const io = req.app.get('socket');
  io.emit('news', 'eu passei aqueeeeee');
  res.send('respond with a resource');
});

module.exports = router;
