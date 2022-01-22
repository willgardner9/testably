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

  async webhook({ request, response }) {
    let { event } = request.body()
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Get the signature sent by Stripe
      const signature = request.header('stripe-signature')
      try {
        event = stripe.webhooks.constructEvent(
          request.raw(),
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        )
      } catch (err) {
        console.log(`⛔ Webhook signature verification failed.`, err.message)
        return response.status(400)
      }
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated': {
        const customer = event.data.object.customer
        const user = await User.findBy('stripe_id', customer)

        //  if cancel at period end is true, set plan to free
        const freeTier = event.data.object.cancel_at_period_end
        if (user && freeTier) {
          user.currentPlan = Plans.TRIAL
        }

        //  otherwise provision appropriate subscription
        if (user && !freeTier) {
          //  find price id of subscription, update plan as appropriate
          const plan = event.data.object.items.data[0].price.product
          switch (plan) {
            case process.env.STRIPE_STARTER_PRODUCT_ID:
              user.currentPlan = Plans.STARTER
              break
            case process.env.STRIPE_GROWTH_PRODUCT_ID:
              user.currentPlan = Plans.GROWTH
              break
            default:
              user.currentPlan = Plans.GROWTH
              break
          }
        }

        //  save to user
        if (user) await user.save()
        break
      }
      case 'customer.subscription.deleted': {
        //  set plan to free
        const customer = event.data.object.customer
        const user = await User.findBy('stripe_id', customer)
        if (user) {
          user.currentPlan = Plans.TRIAL
          await user.save()
        }
        break
      }
      default:
        console.log(`⛔ Unhandled event type ${event.type}.`)
    }

    return response.status(200)
  }
}
