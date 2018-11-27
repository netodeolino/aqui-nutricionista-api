module.exports = (sequelize, type) => {
  return sequelize.define('papel', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: type.STRING
  })
}