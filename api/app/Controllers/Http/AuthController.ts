export default class AuthController {
  async login({ auth, request, response }) {
    const { email, password } = request.body()
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
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
