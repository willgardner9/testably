import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Variation from './Variation'
import Test from './Test'
import User from './User'
import { SessionDevices } from 'App/Enums/SessionDevices'
import { v4 as uuidv4 } from 'uuid'

export default class Session extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: string

  @belongsTo(() => User)
  public user_id: BelongsTo<typeof User>

  @column()
  public testId: string

  @belongsTo(() => Test)
  public test_id: BelongsTo<typeof Test>

  @column()
  variationId: string

  @belongsTo(() => Variation)
  public variation_id: BelongsTo<typeof Variation>

  @column()
  conversion: boolean

  @column()
  device: SessionDevices

  @column()
  country: string
}
