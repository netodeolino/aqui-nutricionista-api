const { Usuario } = require('../sequelize')

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

module.exports = {
  all, create
}