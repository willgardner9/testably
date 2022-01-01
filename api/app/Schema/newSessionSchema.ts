import { schema } from '@ioc:Adonis/Core/Validator'
import { SessionDevices } from 'App/Enums/SessionDevices'

export const newSessionSchema = schema.create({
  userId: schema.number(),
  testId: schema.number(),
  variationId: schema.number(),
  conversion: schema.boolean(),
  device: schema.enum(Object.values(SessionDevices)),
  country: schema.string(),
})
