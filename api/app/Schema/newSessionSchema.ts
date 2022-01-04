import { schema } from '@ioc:Adonis/Core/Validator'
import { SessionDevices } from 'App/Enums/SessionDevices'

export const newSessionSchema = schema.create({
  userId: schema.string(),
  testId: schema.string(),
  variationId: schema.string(),
  conversion: schema.boolean(),
  device: schema.enum(Object.values(SessionDevices)),
  country: schema.string(),
})
