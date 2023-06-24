import { InvalidFiledError } from '@/validation/errors/email-field-error'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFiledError()
  }
}
