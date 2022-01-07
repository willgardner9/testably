const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend')

const mailersend = new MailerSend({
  api_key: process.env.MAILERSEND_API_KEY,
})

export default async function sendForgottenPasswordEmail(email: string, url: string) {
  console.log(email, url)
  const recipients = [new Recipient(email, email)]

  const personalization = [
    {
      email,
      data: {
        reset_password_url: url,
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
  console.log(response)
  return response
}
