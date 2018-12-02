const { PAPEL_NUTRICIONISTA_ID } = require('../util/constants')
const { Usuario, Papel } = require('../sequelize')

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

  const usuario = await Usuario.create(data)
  if (saveFoto(usuario.id, foto)) {
    res.json(usuario)
  } else {
    res.status(500).send({
      message: 'Erro ao salvar foto.'
    })
  }
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

function saveFoto(usuarioId, foto) {
  foto.mv(`public/${usuarioId}-${foto.name}`, function(err) {
    if (err) {
      return false
    }
  })
  return true
}

module.exports = {
  all, saveUsuario, allNutricionsita, findOne
}