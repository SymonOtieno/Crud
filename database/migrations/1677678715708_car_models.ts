import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CarModels extends BaseSchema {
  protected tableName = 'car_models'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('make_id')
      table.string('name')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
