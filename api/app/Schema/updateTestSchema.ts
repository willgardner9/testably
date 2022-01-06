import { schema } from '@ioc:Adonis/Core/Validator'

export const updateTestSchema = schema.create({
  name: schema.string(),
  active: schema.boolean(),
  conversionUrl: schema.string(),
})
