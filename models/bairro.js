module.exports = (sequelize, type) => {
  return sequelize.define('bairro', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: type.STRING
  })
}