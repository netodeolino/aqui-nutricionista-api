var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json({ helloworld: 'Aqui Nutricionista' })
})

module.exports = router
