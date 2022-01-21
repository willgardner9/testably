import { Plans } from 'App/Enums/StripePlans'
import User from 'App/Models/User'
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SK)

export default class StripeController {
  async checkout({ request }) {
    const { stripeId } = request.body()
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: 'http://localhost:3000/dashboard',
    })
    return session.url
  }
}
