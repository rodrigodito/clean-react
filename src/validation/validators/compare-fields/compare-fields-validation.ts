import { InvalidFiledError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFiledError() : null
  }
}
