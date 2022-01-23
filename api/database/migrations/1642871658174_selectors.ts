import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Selectors extends BaseSchema {
  protected tableName = 'tests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('selector')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('selector')
    })
  }
}
