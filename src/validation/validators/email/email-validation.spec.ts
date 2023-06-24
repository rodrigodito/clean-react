import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFiledError } from '@/validation/errors'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFiledError())
  })
})
