require("dotenv-safe").load()
const jwt = require('jsonwebtoken')

const { TOKEN_OBRIGATORIO, TOKEN_INVALIDO } = require('./constants')

function isTokenValidoMiddleware (req, res, next) {
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
}

function isTokenValido (token) {
  console.log('TOKEEEEEN', token)
  if (!token) {
    return false
  }
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      return false
    }
    return true
  })
}

module.exports = {
  isTokenValidoMiddleware, isTokenValido
}