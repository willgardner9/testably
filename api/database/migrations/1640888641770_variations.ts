import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Variations extends BaseSchema {
  protected tableName = 'variations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.integer('user_id').references('users.id').onDelete('CASCADE')
      table.integer('test_id').references('tests.id').onDelete('CASCADE')

      table.string('value')
      table.boolean('active')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
