const { PAPEL_NUTRICIONISTA_ID } = require('../utils/constants')
const { Usuario, Papel } = require('../configs/sequelize/sequelize')

const all = async (req, res) => {
  Usuario.findAll()
    .then(usuarios => {
      res.json(usuarios)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const saveUsuario = async (req, res) => {
  const data = JSON.parse(req.body.data)
  const foto = req.files.foto
  
  data.foto = foto.name

  Usuario.create(data)
    .then(usuario => {
      foto.mv(`public/${usuario.id}-${foto.name}`, function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
      res.json(usuario)
    })
    .catch(err => {
      res.status(500).send(err)
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
  .catch(err => {
    res.status(500).send(err)
  })
}

const findOne = async (req, res) => {
  Usuario.findOne({
    where: {
      id: req.params.id
    }
  }).then(usuario => {
    res.json(usuario)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  all, saveUsuario, allNutricionsita, findOne
}