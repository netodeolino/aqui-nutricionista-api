const express = require('express')
const router = express.Router()

const controller = require('../controllers/usuario')

const { isTokenValidoMiddleware } = require('../utils/seguranca')

router.get('/', controller.all)
router.get('/all-nutricionista', controller.allNutricionista)
router.get('/:id', isTokenValidoMiddleware, controller.findOne)

router.post('/', controller.saveUsuario)
router.post('/login', controller.login)

module.exports = router