import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'loan_accounts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('loan_number')
      table.string('reference_no')
      table.string('running_balance')
      table.string('commencement_date')
      table.string('due_date')
      table.string('status')
      table.string('instalements_paid')
      table.string('loan_account_id')
      table.string('next_installment_due')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
