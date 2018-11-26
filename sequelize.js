const Sequelize = require('sequelize')
const UsuarioModel = require('./models/usuario')
const CidadeModel = require('./models/cidade')

const sequelize = new Sequelize('aqui-nutricionista-api', 'netodeolino', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Usuario = UsuarioModel(sequelize, Sequelize)
const Cidade = CidadeModel(sequelize, Sequelize)

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Usuario, Cidade
}