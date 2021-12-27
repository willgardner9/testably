import Test from 'App/Models/Test'
import { newTestSchema } from 'App/Schema/newTestSchema'
import { updateTestSchema } from 'App/Schema/updateTestSchema'

export default class TestsController {
  //  all tests
  async index({ response }) {
    const tests = await Test.all()
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

    test.name = name ? name : test.name
    test.active = active ? active : test.active

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
