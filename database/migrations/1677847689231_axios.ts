import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Axios extends BaseSchema {
  protected tableName = 'axios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('symbol')
      table.string('price_change')
      table.string('open_time')
      table.string('price_change_percent')
      table.string('weighted_avg_price')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
