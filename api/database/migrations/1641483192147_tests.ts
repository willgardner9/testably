import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tests extends BaseSchema {
  protected tableName = 'tests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('conversionUrl')
      table.string('conversion_url')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('conversionUrl')
      table.dropColumn('conversion_url')
    })
  }
}
