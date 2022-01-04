import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const newUserSchema = schema.create({
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({ trim: true }),
})
