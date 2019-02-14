module.exports = (sequelize, type) => {
  return sequelize.define('endereco', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    rua: type.STRING,
    numero: type.INTEGER,
    bairro: type.STRING,
    latitude: type.STRING,
    longitude: type.STRING
  })
}