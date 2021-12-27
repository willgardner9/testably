import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Plans } from 'App/Enums/StripePlans'

export const updateUserSchema = schema.create({
  email: schema.string.optional({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string.optional({ trim: true }),
  currentPlan: schema.enum.optional(Object.values(Plans)),
})
