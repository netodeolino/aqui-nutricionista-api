module.exports = (sequelize, type) => {
  const Usuario = sequelize.define('usuario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: type.STRING
  })

  Usuario.associate = models => {
    Usuario.belongsTo(models.cidade, { foreignKey: 'usuarioId', targetKey: 'cidade' })
  }

  return Usuario
}