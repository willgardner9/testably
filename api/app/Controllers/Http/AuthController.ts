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
}
