'use strict'

const Antl = use('Antl')

class Supply {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      precoLitro: 'required',
      valor: 'required',
      km: 'required',
      car_id: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Supply
