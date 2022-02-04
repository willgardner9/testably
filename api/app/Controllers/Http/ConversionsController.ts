import Conversion from 'App/Models/Conversion'
import { newConversionSchema } from 'App/Schema/newConversionSchema'

export default class ConversionsController {
  //  conversions by test id or variation id or user id
  async index({ request, response, bouncer }) {
    const { test_id, variation_id, user_id } = request.qs()
    let conversions

    if (test_id) {
      conversions = await Conversion.query().where('test_id', test_id)
    }
    if (variation_id) {
      conversions = await Conversion.query().where('variation_id', variation_id)
    }
    if (user_id) {
      conversions = await Conversion.query().where('user_id', user_id)
    }
    await bouncer.authorize('bounceConversion', conversions)

    if (!conversions || conversions.length === 0) {
      return response.status(404).send({
        error: true,
        message: `Conversions not found`,
      })
    }
    return conversions
  }

  //  conversions by id
  async show({ params, response }) {
    const conversions = await Conversion.find(params.id)
    if (!conversions) {
      return response.status(404).send({
        error: true,
        message: `Conversion ${params.id} not found`,
      })
    }
    return conversions
  }

  //  create conversions
  async store({ request }) {
    const payload = await request.validate({ schema: newConversionSchema })
    const { userId, testId, variationId } = payload

    const conversions = new Conversion()
    return await conversions.fill({ userId, testId, variationId }).save()
  }
}
