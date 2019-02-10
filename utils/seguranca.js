require("dotenv-safe").load()
const jwt = require('jsonwebtoken')

const { TOKEN_OBRIGATORIO, TOKEN_INVALIDO, ERRO_VERIFICAR_TOKEN } = require('./constants')

function isTokenValidoMiddleware (req, res, next) {
  try {
    const token = req.headers['aqui-nutricionista-token']
    if (!token) {
      res.status(500).send(TOKEN_OBRIGATORIO)
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(500).send(TOKEN_INVALIDO)
      }
      req.emailUsuarioLogado = decoded.email
      next()
    })
  } catch (error) {
    throw TOKEN_INVALIDO
  }
}

function isTokenValido (token) {
  try {
    if (!token) {
      return false
    }
    return jwt.verify(token, process.env.SECRET)
  } catch (error) {
    throw ERRO_VERIFICAR_TOKEN
  }
}

module.exports = {
  isTokenValidoMiddleware, isTokenValido
}