module.exports = (sequelize, type) => {
  const Cidade = sequelize.define('cidade', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: type.STRING
  })

  Cidade.associate = models => {
    Cidade.hasMany(models.usuario, { foreignKey: 'usuarioId', targetKey: 'cidade' })
  }

  return Cidade
}