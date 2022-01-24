import { schema } from '@ioc:Adonis/Core/Validator'

export const newSessionSchema = schema.create({
  userId: schema.string(),
  testId: schema.string(),
  variationId: schema.string(),
  device: schema.string.optional(),
  country: schema.string.optional(),
})
