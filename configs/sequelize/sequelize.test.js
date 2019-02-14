const Sequelize = require('sequelize')

const PapelModel = require('../../models/papel')
const CidadeModel = require('../../models/cidade')
const EstadoModel = require('../../models/estado')
const UsuarioModel = require('../../models/usuario')
const EnderecoModel = require('../../models/endereco')
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

const Papel = PapelModel(sequelize, Sequelize)
const Cidade = CidadeModel(sequelize, Sequelize)
const Estado = EstadoModel(sequelize, Sequelize)
const Usuario = UsuarioModel(sequelize, Sequelize)
const Endereco = EnderecoModel(sequelize, Sequelize)
const UsuarioPapel = UsuarioPapelModel(sequelize, Sequelize)

Papel.belongsToMany(Usuario, { through: UsuarioPapel })
Usuario.belongsToMany(Papel, { through: UsuarioPapel })

Usuario.belongsTo(Endereco, { foreignKey: 'fk_endereco_id' })
Endereco.hasOne(Usuario, { foreignKey: 'fk_endereco_id' })

Endereco.belongsTo(Cidade, { foreignKey: 'fk_cidade_id' })
Cidade.hasOne(Endereco, { foreignKey: 'fk_cidade_id' })

Cidade.belongsTo(Estado, { foreignKey: 'fk_estado_id' })
Estado.hasMany(Cidade, { foreignKey: 'fk_estado_id' })

beforeEach(async () => {
  await sequelize.sync({ force: true });
})

after(() => {
  sequelize.close();
})

module.exports = {
  Usuario, Cidade, Papel, UsuarioPapel, Estado, Endereco
}