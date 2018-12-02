var express = require('express')
var router = express.Router()

const controller = require('../controllers/usuario')

router.get('/', controller.all)
router.get('/all-nutricionista', controller.allNutricionsita)
router.get('/:id', controller.findOne)

router.post('/', controller.saveUsuario)

module.exports = router