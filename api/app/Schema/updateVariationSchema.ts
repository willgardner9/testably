import { schema } from '@ioc:Adonis/Core/Validator'

export const updateVariationSchema = schema.create({
  value: schema.string.optional(),
  active: schema.boolean(),
})
