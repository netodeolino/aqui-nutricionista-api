const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario')

const { isTokenValido } = require('../utils/seguranca')

router.get('/', controller.all)
router.get('/all-nutricionista', controller.allNutricionista)
router.get('/:id', isTokenValido, controller.findOne)

router.post('/', controller.saveUsuario)
router.post('/login', controller.login)

module.exports = router