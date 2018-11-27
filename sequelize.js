const Sequelize = require('sequelize')

const UsuarioModel = require('./models/usuario')
const CidadeModel = require('./models/cidade')
const BairroModel = require('./models/bairro')

const sequelize = new Sequelize('aqui-nutricionista-api', 'netodeolino', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    underscored: true
  }
})

const Usuario = UsuarioModel(sequelize, Sequelize)
const Cidade = CidadeModel(sequelize, Sequelize)
const Bairro = BairroModel(sequelize, Sequelize)

Usuario.belongsTo(Cidade, { foreignKey: 'fk_cidade_id' })
Cidade.hasOne(Usuario, { foreignKey: 'fk_cidade_id' })

Bairro.belongsTo(Cidade, { foreignKey: 'fk_cidade_id' })
Cidade.hasMany(Bairro, { foreignKey: 'fk_cidade_id' })

Usuario.belongsTo(Bairro, { foreignKey: 'fk_bairro_id' })
Bairro.hasMany(Usuario, { foreignKey: 'fk_bairro_id' })

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Usuario, Cidade
}