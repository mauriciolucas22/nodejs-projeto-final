'use strict'

const Car = use('App/Models/Car')

class ProjectController {
  async index ({ request, auth }) {
    const { page } = request.get()

    const cars = await Car.query()
      .where('user_id', auth.user.id)
      .with('supplies')
      .paginate(page)

    return cars
  }

  async store ({ request, response, auth }) {
    const data = request.only(['marca', 'modelo', 'placa'])

    const car = await Car.create({
      ...data,
      user_id: auth.user.id
    })

    return car
  }

  async show ({ params, auth, response }) {
    const car = await Car.findOrFail(params.id)

    if (car.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    // await car.load('user')
    await car.load('supplies')

    return car
  }

  async update ({ params, request, auth, response }) {
    const car = await Car.findOrFail(params.id)
    const data = request.only(['marca', 'placa', 'modelo'])

    if (car.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    car.merge(data) // colocas as info recebidas dentro desso project

    await car.save()

    return car
  }

  async destroy ({ params, auth, response }) {
    const car = await Car.findOrFail(params.id)

    if (car.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Não autorizado!'
        }
      })
    }

    await car.delete()
  }
}

module.exports = ProjectController
