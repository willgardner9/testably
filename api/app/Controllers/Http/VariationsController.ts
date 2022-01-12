import Database from '@ioc:Adonis/Lucid/Database'
import Variation from 'App/Models/Variation'
import { newVariationSchema } from 'App/Schema/newVariationSchema.ts'
import { updateVariationSchema } from 'App/Schema/updateVariationSchema'

export default class VariationsController {
  //  variations by test id
  async index({ request, response }) {
    const { test_id } = request.qs()
    const variations = await Variation.query().where('test_id', test_id)
    const variationsWithSessionsAndConversionsData: any[] = []
    await Promise.all(
      variations.map(async (variation: Variation) => {
        const sessions = await Database.from('sessions')
          .count('* as sessionsCount')
          .where('variation_id', variation.id)

        const conversions = await Database.from('conversions')
          .count('* as conversionsCount')
          .where('variation_id', variation.id)

        const { sessionsCount } = sessions[0]
        const { conversionsCount } = conversions[0]

        variationsWithSessionsAndConversionsData.push({
          value: variation.value,
          id: variation.id,
          createdAt: variation.createdAt.toISODate(),
          updatedAt: variation.updatedAt.toISODate(),
          testId: variation.testId,
          userId: variation.userId,
          active: variation.active,
          sessions: sessionsCount as number,
          conversions: conversionsCount as number,
        })
      })
    )

    variationsWithSessionsAndConversionsData.sort((a: Variation, b: Variation) => {
      return a.id > b.id ? 1 : -1
    })

    if (!variations || variations.length === 0) {
      return response.status(404).send({
        error: true,
        message: `Variations not found`,
      })
    }
    return variationsWithSessionsAndConversionsData
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
