'use strict'

const Antl = use('Antl')

class Car {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      marca: 'required',
      modelo: 'required',
      placa: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Car
