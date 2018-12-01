var express = require('express')
var router = express.Router()

const controller = require('../controllers/usuario')

router.get('/', controller.all)
router.get('/all-nutricionista', controller.allNutricionsita)

router.post('/', controller.create)

module.exports = router