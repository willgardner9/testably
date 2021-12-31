import Test from 'App/Models/Test'
import { newTestSchema } from 'App/Schema/newTestSchema'
import { updateTestSchema } from 'App/Schema/updateTestSchema'

export default class TestsController {
  //  all tests and test by query string
  async index({ request, response }) {
    const { user_id } = request.qs()
    const tests = user_id ? await Test.query().where('user_id', user_id) : await Test.all()
    if (!tests) {
      return response.status(404).send({
        error: true,
        message: `Tests not found`,
      })
    }
    return tests
  }

  //  test by id
  async show({ params, response }) {
    const test = await Test.find(params.id)
    if (!test) {
      return response.status(404).send({
        error: true,
        message: `Test ${params.id} not found`,
      })
    }
    return test
  }

  //  create test
  async store({ request }) {
    const payload = await request.validate({ schema: newTestSchema })
    const { userId, name, type, active } = payload

    const test = new Test()
    return await test.fill({ userId, name, type, active }).save()
  }

  //  update test
  async update({ request, response, params }) {
    const payload = await request.validate({ schema: updateTestSchema })
    const { name, active } = payload

    const test = await Test.find(params.id)

    if (!test) {
      return response.status(404).send({
        error: true,
        message: `Test ${params.id} not found`,
      })
    }

    test.name = name
    test.active = active

    return await test.save()
  }

  //  delete test
  async destroy({ params, response }) {
    const test = await Test.find(params.id)
    if (!test) {
      return response.status(404).send({
        error: true,
        message: `Test ${params.id} not found`,
      })
    }
    return await test.delete()
  }
}
