import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Test from './Test'
import { v4 as uuidv4 } from 'uuid'
import Conversion from './Conversion'
import Session from './Session'

export default class Variation extends BaseModel {
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
  public value: string

  @column()
  public active: boolean

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  @hasMany(() => Conversion)
  public conversions: HasMany<typeof Conversion>

  @column()
  public sessions_count: number

  @column()
  public conversions_count: number
}
