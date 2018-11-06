'use strict'

const Model = use('Model')

// informa as recerencias
class Supply extends Model {
  static boot () {
    super.boot()
  }
  cars () {
    return this.belongsTo('App/Models/Car')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Supply
