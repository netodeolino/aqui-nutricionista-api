module.exports = (sequelize, type) => {
  return sequelize.define('estado', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    nome: type.STRING,
    numero: type.INTEGER,
    sigla: type.STRING
  })
}