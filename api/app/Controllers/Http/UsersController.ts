import { Plans } from 'App/Enums/StripePlans'
import User from 'App/Models/User'
import { newUserSchema } from 'App/Schema/newUserSchema'
import { updateUserSchema } from 'App/Schema/updateUserSchema'
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SK)

export default class UsersController {
  //  all users
  // async index({ response }) {
  //   const users = await User.all()
  //   if (!users) {
  //     return response.status(404).send({
  //       error: true,
  //       message: `Users not found`,
  //     })
  //   }
  //   return users
  // }

  //  user by id
  async show({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({
        error: true,
        message: `User ${params.id} not found`,
      })
    }
    return user
  }

  //  create user
  async store({ auth, request }) {
    const payload = await request.validate({ schema: newUserSchema })
    const { email, password } = payload

    const user = new User()

    const { id } = await stripe.customers.create({
      email,
    })

    await stripe.subscriptions.create({
      customer: id,
      items: [
        {
          price: process.env.STRIPE_FREE_TRIAL_PRICE_ID,
        },
      ],
      payment_behavior: 'allow_incomplete',
    })

    await user.fill({ email, password, currentPlan: Plans.TRIAL, stripeId: id }).save()

    const token = await auth.use('api').attempt(email, password)

    return { user, token }
  }

  //  update user
  async update({ request, response, params }) {
    const payload = await request.validate({ schema: updateUserSchema })
    const { email, password, currentPlan } = payload

    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).send({
        error: true,
        message: `User ${params.id} not found`,
      })
    }

    user.password = password ? password : user.password
    user.email = email ? email : user.email
    user.currentPlan = currentPlan ? currentPlan : user.currentPlan

    return await user.save()
  }

  //  delete user
  async destroy({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({
        error: true,
        message: `User ${params.id} not found`,
      })
    }
    return await user.delete()
  }
}
