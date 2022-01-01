import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Variation from './Variation'
import Test from './Test'
import User from './User'
import { SessionDevices } from 'App/Enums/SessionDevices'

export default class Session extends BaseModel {
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
  variationId: number

  @belongsTo(() => Variation)
  public variation_id: BelongsTo<typeof Variation>

  @column()
  conversion: boolean

  @column()
  device: SessionDevices

  @column()
  country: string
}
