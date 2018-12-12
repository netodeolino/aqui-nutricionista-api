module.exports = (sequelize, type) => {
  return sequelize.define('cidade', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    nome: type.STRING
  })
}