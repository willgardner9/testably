import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversions extends BaseSchema {
  protected tableName = 'conversions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable().unique()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.uuid('test_id').references('tests.id').onDelete('CASCADE')
      table.uuid('variation_id').references('variations.id').onDelete('CASCADE')

      table.string('device').notNullable()
      table.string('country').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
