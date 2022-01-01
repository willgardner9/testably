import Session from 'App/Models/Session'
import { newSessionSchema } from 'App/Schema/newSessionSchema'

export default class SessionsController {
  //  all sessions and sessions by query string
  async index({ request, response }) {
    const { user_id } = request.qs()
    const sessions = user_id ? await Session.query().where('user_id', user_id) : await Session.all()
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
    const { userId, testId, variationId, conversion, device, country } = payload

    const sessions = new Session()
    return await sessions.fill({ userId, testId, variationId, conversion, device, country }).save()
  }
}
