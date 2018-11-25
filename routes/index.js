var express = require('express');
var router = express.Router();

const { Usuario } = require('../sequelize');

router.get('/', function(req, res, next) {
  res.json({ helloworld: 'Aqui Nutricionista' });
});

router.get('/usuarios', function(req, res, next) {
  Usuario.findAll().then(usuarios => {
    res.json(usuarios);
  })
});

router.post('/usuario', function(req, res, next) {
  Usuario.create(req.body).then(usuario => {
    res.json(usuario);
  })
});

module.exports = router;
