const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv-safe").load()

const { PAPEL_NUTRICIONISTA_NOME, TOKEN_TEMPO_VALIDO } = require('../utils/constants')
const { Usuario, Papel, Endereco } = require('../configs/sequelize/sequelize')

const all = async (req, res) => {
  try {
    Usuario.findAll()
      .then(usuarios => {
        res.json(usuarios)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  } catch (error) {
    res.status(500).send(error)
  }
}

const saveUsuario = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data)
    const foto = (req.files && req.files.foto) ? req.files.foto : null

    if (data.endereco == null) {
      throw 'Usuário não pode ser cadastrado sem um endereço'
    }

    if (foto && foto.name) {
      data.foto = foto.name
    }

    Usuario.create(data, { include: [ Endereco ] })
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
  } catch (error) {
    res.status(500).send(error)
  }
}

const allNutricionista = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send(error)
  }
}

const findOne = async (req, res) => {
  try {
    Usuario.findOne({
      include: [{
        model: Endereco,
        required: true
      }],
      where: {
        id: req.params.id
      }
    }).then(usuario => {
      res.json(usuario)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  const { email, senha } = req.body
  try {
    Usuario.findOne({
      where: {
        email: email
      }
    }).then(usuario => {
      if (usuario == null) {
        throw 'Usuário não encontrado para o email digitado'
      }
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
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  all, saveUsuario, allNutricionista, findOne, login
}