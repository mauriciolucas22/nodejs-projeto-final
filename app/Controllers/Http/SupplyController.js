'use strict'

const Supply = use('App/Models/Supply')
const Car = use('App/Models/Car')

class SupplyController {
  async index ({ auth }) {
    const supplies = await Supply.query()
      .where('user_id', auth.user.id)
      .paginate()

    return supplies
  }

  async store ({ request, auth, response }) {
    const data = request.only([
      'precoLitro',
      'valor',
      'km',
      'car_id'
    ])

    const car = Car.findOrFail(data.car_id)

    if (car.user_id !== auth.user.id) {
      response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    const supply = await Supply.create({ ...data, user_id: auth.user.id })

    return supply
  }

  async show ({ params, auth, response }) {
    const supply = await Supply.findOrFail(params.id)

    if (supply.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    return supply
  }

  async update ({ params, request, auth, response }) {
    const supply = await Supply.findOrFail(params.id)
    const data = request.only([
      'precoLitro',
      'valor',
      'km',
      'car_id'
    ])

    if (supply.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    supply.merge(data)

    await supply.save()

    return supply
  }

  async destroy ({ params, auth, response }) {
    const supply = await Supply.findOrFail(params.id)

    if (supply.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    await supply.delete()
  }
}

module.exports = SupplyController
