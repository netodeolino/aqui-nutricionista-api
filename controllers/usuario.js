const { PAPEL_NUTRICIONISTA_ID } = require('../configs/constants')
const { Usuario, Papel } = require('../sequelize')

const all = async (req, res) => {
  Usuario.findAll().then(usuarios => {
    res.json(usuarios)
  })
}

const create = async (req, res) => {
  Usuario.create(req.body).then(usuario => {
    res.json(usuario)
  })
}

const allNutricionsita = async (req, res) => {
  Usuario.findAll({
    include: [{
      model: Papel,
      required: true,
      where: {
        id: PAPEL_NUTRICIONISTA_ID
      }
    }]
  }).then(usuarios => {
    res.json(usuarios)
  })
}

module.exports = {
  all, create, allNutricionsita
}