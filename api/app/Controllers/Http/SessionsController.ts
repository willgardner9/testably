import Session from 'App/Models/Session'
import { newSessionSchema } from 'App/Schema/newSessionSchema'

export default class SessionsController {
  //  sessions by test id or variation id
  async index({ request, response }) {
    const { test_id, variation_id, user_id } = request.qs()
    let sessions

    if (test_id) {
      sessions = await Session.query().where('test_id', test_id)
    }
    if (variation_id) {
      sessions = await Session.query().where('variation_id', variation_id)
    }
    if (user_id) {
      sessions = await Session.query().where('user_id', user_id)
    }

    if (!sessions || sessions.length === 0) {
      return response.status(404).send({
        error: true,
        message: `Sessions not found`,
      })
    }
    return sessions
  }

  //  sessions by id
  async show({ params, response }) {
    const sessions = await Session.find(params.id)
    if (!sessions) {
      return response.status(404).send({
        error: true,
        message: `Session ${params.id} not found`,
      })
    }
    return sessions
  }

  //  create sessions
  async store({ request }) {
    const payload = await request.validate({ schema: newSessionSchema })
    const { userId, testId, variationId } = payload

    const sessions = new Session()
    return await sessions.fill({ userId, testId, variationId }).save()
  }
}
