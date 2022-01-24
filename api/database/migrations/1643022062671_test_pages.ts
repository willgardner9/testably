import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TestPages extends BaseSchema {
  protected tableName = 'tests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('test_page')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('test_page')
    })
  }
}
