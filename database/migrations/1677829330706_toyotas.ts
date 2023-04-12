import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Toyotas extends BaseSchema {
  protected tableName = 'toyotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name')
      table.integer('make_id')
      table.string('comment')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
