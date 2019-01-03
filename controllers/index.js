const { isTokenValido } = require('../utils/seguranca')
const { ERRO_VERIFICAR_TOKEN } = require('../utils/constants')

const isTokenValidoUsuario = async (req, res) => {
  try {
    if (isTokenValido(req.headers['aqui-nutricionista-token'])) {
      res.json(true)
    }
    res.json(false)
  } catch (error) {
    throw ERRO_VERIFICAR_TOKEN
  }
}

module.exports = {
  isTokenValidoUsuario
}