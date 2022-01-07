import Test from 'App/Models/Test'
import { newTestSchema } from 'App/Schema/newTestSchema'
import { updateTestSchema } from 'App/Schema/updateTestSchema'

export default class TestsController {
  //  all tests by user id
  async index({ request, response }) {
    const { user_id } = request.qs()
    const tests = await Test.query().where('user_id', user_id)
    if (!tests || tests.length === 0) {
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
    const { userId, name, type, active, conversionUrl } = payload

    const test = new Test()
    return await test.fill({ userId, name, type, active, conversionUrl }).save()
  }

  //  update test
  async update({ request, response, params }) {
    const payload = await request.validate({ schema: updateTestSchema })
    console.log('payload', payload)
    const test = await Test.find(params.id)

    if (!test) {
      return response.status(404).send({
        error: true,
        message: `Test ${params.id} not found`,
      })
    }

    test.name = payload.name ? payload.name : test.name
    test.active = payload.hasOwnProperty('active') ? payload.active : test.active
    test.conversionUrl = payload.conversionUrl ? payload.conversionUrl : test.conversionUrl

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
