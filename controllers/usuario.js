const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv-safe").load()

const { PAPEL_NUTRICIONISTA_NOME, TOKEN_TEMPO_VALIDO } = require('../utils/constants')
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
  const foto = (req.files && req.files.foto) ? req.files.foto : null
  
  if (foto && foto.name) {
    data.foto = foto.name
  }

  Usuario.create(data)
    .then(usuario => {
      if (foto && foto.name) {
        foto.mv(`public/${usuario.id}-${foto.name}`, function(err) {
          if (err) {
            res.status(500).send(err)
          }
        })
      }
      res.json(usuario)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const allNutricionista = async (req, res) => {
  Usuario.findAll({
    include: [{
      model: Papel,
      required: true,
      where: {
        nome: PAPEL_NUTRICIONISTA_NOME
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

const login = async (req, res) => {
  const { email, senha } = req.body
  Usuario.findOne({
    where: {
      email: email
    }
  }).then(usuario => {
    if (bcrypt.compareSync(senha, usuario.senha)) {
      let token = jwt.sign({ email: usuario.email }, process.env.SECRET, { expiresIn: TOKEN_TEMPO_VALIDO })
      res.json({ token, usuarioId: usuario.id, foto: usuario.foto })
    } else {
      throw 'Senha incorreta'
    }
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  all, saveUsuario, allNutricionista, findOne, login
}