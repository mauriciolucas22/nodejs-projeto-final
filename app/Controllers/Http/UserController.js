'use strict'

const Database = use('Database') // para transactions
const User = use('App/Models/User')

// ctx = contexto da request => { request, response }
class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await trx.commit() // se nao houver erros efetua um commit => salvar alterações no banco

    return user
  }
}

module.exports = UserController
