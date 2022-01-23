import Test from 'App/Models/Test'
import Variation from 'App/Models/Variation'
import { newTestSchema } from 'App/Schema/newTestSchema'
import { updateTestSchema } from 'App/Schema/updateTestSchema'

export default class TestsController {
  //  all tests by user id
  async index({ request }) {
    const { user_id } = request.qs()
    const tests = await Test.query().where('user_id', user_id).orderBy('created_at')
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
    await test.fill({ userId, name, type, active, conversionUrl }).save()

    //  if type of test is 'visibility', create hidden / not hidden variations
    //  otherwise return
    if (type === 'visibility') {
      await Variation.createMany([
        {
          userId,
          testId: test.id,
          value: 'Element visible',
          active: true,
        },
        {
          userId,
          testId: test.id,
          value: 'Element hidden',
          active: true,
        },
      ])
      return test
    }
    return test
  }

  //  update test
  async update({ request, response, params }) {
    const payload = await request.validate({ schema: updateTestSchema })
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
    test.selector = payload.selector ? payload.selector : test.selector

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
