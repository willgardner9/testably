import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { TestType } from 'App/Enums/TestType'

export default class Test extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number

  @belongsTo(() => User)
  public user_id: BelongsTo<typeof User>

  @column()
  public name: string

  @column()
  public type: TestType

  @column()
  public active: boolean
}
