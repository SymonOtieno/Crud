import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Installment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public installment_No: number

  @column()
  public installmentDays: number

  @column()
  public commenceDate: String

  @column()
  public dueDate: String

  @column()
  public amount: number

  @column()
  public status: string

  @column()
  public amountPaid: number

  @column()
  public balance: number
}
