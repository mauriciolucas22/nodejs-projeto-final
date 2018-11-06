'use strict'

const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('marca').notNullable()
      table.string('modelo').notNullable()
      table.string('placa').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cars')
  }
}

module.exports = CarSchema
