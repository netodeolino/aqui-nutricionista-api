const { isTokenValido } = require('../utils/seguranca')

const isTokenValidoUsuario = async (req, res) => {
  if (isTokenValido(req.headers['aqui-nutricionista-token'])) {
    res.json(true)
  }
  res.json(false)
}

module.exports = {
  isTokenValidoUsuario
}