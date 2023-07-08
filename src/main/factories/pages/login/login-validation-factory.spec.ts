import { ValidationComposite } from '@/validation/validators'
import { makeValidationLogin } from './login-validation-factory'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('LoginValidationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeValidationLogin()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').email().required().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
