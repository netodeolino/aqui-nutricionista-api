const { TOKEN_OBRIGATORIO, TOKEN_INVALIDO } = require('./constants')
const jwt = require('jsonwebtoken')

function isTokenValido (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    res.status(500).send(TOKEN_OBRIGATORIO)
  }
  jwt.verify(token, 'colocar.no.env', function(err, decoded) {
    if (err) {
      return res.status(500).send(TOKEN_INVALIDO)
    }
    req.emailUsuarioLogado = decoded.email
    next()
  })
}

module.exports = {
  isTokenValido
}