const bcrypt = require('bcrypt')

module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    email: {
      type: type.STRING,
      unique: true,
      allowNull: false,
      validade: {
        isEmail: true
      }
    },
    nome: type.STRING,
    senha: type.STRING,
    foto: type.STRING,
    telefone: type.STRING
  },
  {
    hooks: {
      beforeCreate: (usuario, options) => {
        { usuario.senha = usuario.senha && usuario.senha != '' ? bcrypt.hashSync(usuario.senha, 7) : '' }
      }
    }
  })
}