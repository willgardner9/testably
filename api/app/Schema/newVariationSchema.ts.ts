import { schema } from '@ioc:Adonis/Core/Validator'

export const newVariationSchema = schema.create({
  userId: schema.string(),
  testId: schema.string(),
  value: schema.string(),
  active: schema.boolean(),
})
