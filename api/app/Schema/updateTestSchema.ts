import { schema } from '@ioc:Adonis/Core/Validator'

export const updateTestSchema = schema.create({
  name: schema.string.optional(),
  active: schema.boolean.optional(),
  conversionUrl: schema.string.optional(),
  selector: schema.string.optional(),
})
