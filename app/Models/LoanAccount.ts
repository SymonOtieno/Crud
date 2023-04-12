import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LoanAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public loanNumber: string

  @column()
  public referenceNo: string

  @column()
  public runningBalance: string

  @column()
  public commencementDate: string

  @column()
  public dueDate: string

  @column()
  public status: string

  @column()
  public instalementsPaid: string

  @column()
  public loanAccountId: string

  @column()
  public nextInstallmentDue: string
}
