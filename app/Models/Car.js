'use strict'

const Model = use('Model')

// informa as recerencias
class Car extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  supplies () {
    return this.hasMany('App/Models/Supply')
  }
}

module.exports = Car
