import { schema } from '@ioc:Adonis/Core/Validator'

export const newVariationSchema = schema.create({
  userId: schema.number(),
  testId: schema.number(),
  value: schema.string(),
  active: schema.boolean(),
})
