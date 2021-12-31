import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Test from './Test'

export default class Variation extends BaseModel {
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
  public testId: number

  @belongsTo(() => Test)
  public test_id: BelongsTo<typeof Test>

  @column()
  public value: string

  @column()
  public active: boolean
}
