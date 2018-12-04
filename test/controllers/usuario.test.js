const assert = require('assert')
const { PAPEL_NUTRICIONISTA_NOME } = require('../../utils/constants')
const { Usuario, Papel } = require('../../configs/sequelize/sequelize.test')

describe('Controller Usuario', () => {
  describe('all()', () => {
    it('Deve retornar todos os usuários do banco', async () => {
      await Usuario.create({ nome: 'Teste' })
      const usuario = await Usuario.findAll()
      assert.equal(usuario.length, 1)
    })
  })

  describe('saveUsuario()', () => {
    it('Deve salvar um novo usuário e retornar o mesmo', async () => {
      const usuario = await Usuario.create({ nome: 'Teste' })
      assert.equal(usuario.get('nome'), 'Teste')
    })
  })

  describe('allNutricionsita()', () => {
    it('Deve retornar todos os usuários nutricionistas do banco', async () => {
      const usuarios = await Usuario.findAll({
        include: [{
          model: Papel,
          required: true,
          where: {
            nome: PAPEL_NUTRICIONISTA_NOME
          }
        }]
      })
      assert.equal(usuarios.length, 0)
    })
  })

  describe('findOne()', () => {
    it('Deve retornar um usuário salvo pelo seu id', async () => {
      const usuarioCreate = await Usuario.create({ nome: 'Teste' })
      const usuario = await Usuario.findOne({
        where: {
          id: usuarioCreate.id
        }
      })
      assert.equal(usuario.get('id'), usuarioCreate.get('id'))
    })
  })
})
