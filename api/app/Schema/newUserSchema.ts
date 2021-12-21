import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Plans } from 'App/Enums/Plan'

export const newUserSchema = schema.create({
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({ trim: true }),
  currentPlan: schema.enum(Object.values(Plans)),
})
