import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sessions extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('conversion')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('conversion')
    })
  }
}
