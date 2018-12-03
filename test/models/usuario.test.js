const assert = require('assert')
const { Usuario } = require('../../configs/sequelize/sequelize.test')

describe('Model Usuario', () => {
  describe('saveUsuario()', () => {
    it('Deve salvar um novo usuário e retornar o mesmo', async () => {
      const usuario = await Usuario.create({ nome: 'Teste' })
      assert.equal(usuario.get('nome'), 'Teste')
    })
  })
})