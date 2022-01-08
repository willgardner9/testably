const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend')

const mailersend = new MailerSend({
  api_key: process.env.MAILERSEND_API_KEY,
})

export default async function sendForgottenPasswordEmail(email: string, url: string) {
  const reset_password_url = `${
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/auth/reset-password' : ''
  }${url}`

  const recipients = [new Recipient(email, email)]

  const personalization = [
    {
      email,
      data: {
        reset_password_url,
      },
    },
  ]

  const emailParams = new EmailParams()
    .setFrom('noreply@testably.co')
    .setFromName('TESTA/BLY')
    .setRecipients(recipients)
    .setSubject('Reset password')
    .setTemplateId('pr9084zqpv4w63dn')
    .setPersonalization(personalization)

  const response = await mailersend.send(emailParams)
  return response
}
