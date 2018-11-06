'use strict'

const Schema = use('Schema')

class SupplySchema extends Schema {
  up () {
    this.create('supplies', (table) => {
      table.increments()
      table
        .integer('car_id')
        .unsigned()
        .references('id')
        .inTable('cars')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('precoLitro').notNullable()
      table.string('valor')
      table.decimal('km')
      table.timestamps()
    })
  }

  down () {
    this.drop('supplies')
  }
}

module.exports = SupplySchema
