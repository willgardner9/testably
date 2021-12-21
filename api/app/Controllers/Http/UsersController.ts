// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { newUserSchema } from 'App/Schema/newUserSchema'
import { updateUserSchema } from 'App/Schema/updateUserSchema'

export default class UsersController {
  //  all users
  async index() {
    return await User.all()
  }

  //  user by id
  async show({ params }) {
    return await User.find(params.id)
  }

  //  create user
  async store({ request }) {
    const payload = await request.validate({ schema: newUserSchema })
    const { email, password, currentPlan } = payload

    const user = new User()
    return await user.fill({ email, password, currentPlan }).save()
  }

  //  update user
  async update({ request, params }) {
    const payload = await request.validate({ schema: updateUserSchema })
    const { email, password, currentPlan } = payload

    const user = await User.findOrFail(params.id)

    user.password = password ? password : user.password
    user.email = email ? email : user.email
    user.currentPlan = currentPlan ? currentPlan : user.currentPlan

    return await user.save()
  }

  //  delete user
  async destroy({ params }) {
    const user = await User.findOrFail(params.id)
    return await user.delete()
  }
}
