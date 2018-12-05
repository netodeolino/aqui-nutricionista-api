const Sequelize = require('sequelize')

const UsuarioModel = require('../../models/usuario')
const CidadeModel = require('../../models/cidade')
const BairroModel = require('../../models/bairro')
const PapelModel = require('../../models/papel')
const UsuarioPapelModel = require('../../models/usuario_papel')

const sequelize = new Sequelize('aqui_nutricionista_api_test', 'netodeolino', 'postgres', {
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
  },
  logging: false
})

const Usuario = UsuarioModel(sequelize, Sequelize)
const Cidade = CidadeModel(sequelize, Sequelize)
const Bairro = BairroModel(sequelize, Sequelize)
const Papel = PapelModel(sequelize, Sequelize)
const UsuarioPapel = UsuarioPapelModel(sequelize, Sequelize)

Usuario.belongsTo(Cidade, { foreignKey: 'fk_cidade_id' })
Cidade.hasOne(Usuario, { foreignKey: 'fk_cidade_id' })

Bairro.belongsTo(Cidade, { foreignKey: 'fk_cidade_id' })
Cidade.hasMany(Bairro, { foreignKey: 'fk_cidade_id' })

Usuario.belongsTo(Bairro, { foreignKey: 'fk_bairro_id' })
Bairro.hasMany(Usuario, { foreignKey: 'fk_bairro_id' })

Papel.belongsToMany(Usuario, { through: UsuarioPapel })
Usuario.belongsToMany(Papel, { through: UsuarioPapel })

beforeEach(async () => {
  await sequelize.sync({ force: true });
})

after(() => {
  sequelize.close();
})

module.exports = {
  Usuario, Cidade, Bairro, Papel, UsuarioPapel
}