import User from 'App/Models/User'

export default class AuthController {
  async login({ auth, request, response }) {
    const { email, password } = request.body()
    try {
      const token = await auth.use('api').attempt(email, password)
      const user = await User.find(token.user.$attributes.id)
      return { token, user }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  async forgotten({ auth, request }) {
    const { email } = request.body()
    const user = await User.findByOrFail('email', email)
    const token = await auth.use('api').generate(user, { expiresIn: '30mins' })
    return { token: token.token, id: user.id }
  }

  async reset({ auth, request, response }) {
    const { id, password } = request.body()
    try {
      const user = await User.findOrFail(id)
      user.password = password
      await auth.use('api').revoke()
      return await user.save()
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
