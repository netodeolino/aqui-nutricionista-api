var express = require('express')
var router = express.Router()

const controller = require('../controllers/index')

router.get('/', function(req, res) {
  res.json({ helloworld: 'Aqui Nutricionista' })
})

router.get('/token-valido', controller.isTokenValidoUsuario)

module.exports = router
