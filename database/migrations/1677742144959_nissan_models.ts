import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NissanModels extends BaseSchema {
  protected tableName = 'nissan_models'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('make_id')
      table.string('name')
      table.boolean('not_liked')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
