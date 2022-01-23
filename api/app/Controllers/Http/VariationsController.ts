import Variation from 'App/Models/Variation'
import { newVariationSchema } from 'App/Schema/newVariationSchema.ts'
import { updateVariationSchema } from 'App/Schema/updateVariationSchema'

export default class VariationsController {
  //  variations by test id
  async index({ request }) {
    const { test_id } = request.qs()
    const variations = await Variation.query()
      .withCount('sessions')
      .withCount('conversions')
      .where('test_id', test_id)
      .orderBy('created_at', 'asc')

    return variations
  }

  //  variation by id
  async show({ params, response }) {
    const variation = await Variation.find(params.id)
    if (!variation) {
      return response.status(404).send({
        error: true,
        message: `Variation ${params.id} not found`,
      })
    }
    return variation
  }

  //  create variation
  async store({ request }) {
    const payload = await request.validate({ schema: newVariationSchema })
    const { userId, testId, value, active } = payload

    const variation = new Variation()
    return await variation.fill({ userId, testId, value, active }).save()
  }

  //  update variation
  async update({ request, response, params }) {
    const payload = await request.validate({ schema: updateVariationSchema })
    const { value, active } = payload

    const variation = await Variation.find(params.id)

    if (!variation) {
      return response.status(404).send({
        error: true,
        message: `Variation ${params.id} not found`,
      })
    }
    value ? (variation.value = value) : ''
    variation.active = active

    return await variation.save()
  }

  //  delete variation
  async destroy({ params, response }) {
    const variation = await Variation.find(params.id)
    if (!variation) {
      return response.status(404).send({
        error: true,
        message: `Variation ${params.id} not found`,
      })
    }
    return await variation.delete()
  }
}
