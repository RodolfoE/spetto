var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bla', function (req, res, next) {
  const io = req.app.get('socket');
  io.emit('news', 'asdffadf');
  res.render('index', { title: 'Express' });
  res.send(200);
});

router.get('/bla2', function (req, res, next) {
  const io = req.app.get('socket');
  io.emit('news', 'asdffadf');
})

module.exports = router;
