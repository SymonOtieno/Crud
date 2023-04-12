import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Installments extends BaseSchema {
  protected tableName = 'installments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('installment_no')
      table.integer('installment_days')
      table.dateTime('commence_date')
      table.dateTime('due_date')
      table.integer('amount')
      table.string('status')
      table.integer('amount_paid')
      table.integer('balance')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
