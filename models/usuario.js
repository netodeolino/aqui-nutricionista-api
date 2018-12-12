const bcrypt = require('bcrypt')

module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    nome: type.STRING,
    senha: type.STRING,
    foto: type.STRING
  },
  {
    hooks: {
      beforeCreate: (usuario, options) => {
        { usuario.senha = usuario.senha && usuario.senha != '' ? bcrypt.hashSync(usuario.senha, 7) : '' }
      }
    }
  })
}