import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tests extends BaseSchema {
  protected tableName = 'tests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable().unique()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.uuid('user_id').references('users.id').onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('type').notNullable()
      table.boolean('active').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
