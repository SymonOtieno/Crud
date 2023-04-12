import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Axio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public symbol: string

  @column()
  public price_change: string

  @column()
  public open_time: string

  @column()
  public price_change_percent: string

  @column()
  public weighted_avg_price : string
}
