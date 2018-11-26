module.exports = (sequelize, type) => {
  return sequelize.define('cidade', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: type.STRING
  })
}