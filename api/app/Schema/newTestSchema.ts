import { schema } from '@ioc:Adonis/Core/Validator'
import { TestType } from 'App/Enums/TestType'

export const newTestSchema = schema.create({
  userId: schema.string(),
  name: schema.string(),
  type: schema.enum(Object.values(TestType)),
  active: schema.boolean(),
  conversionUrl: schema.string(),
})
