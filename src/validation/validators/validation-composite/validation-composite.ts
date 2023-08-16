import { type Validation } from '@/presentation/protocols/validation'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) {}

  static build (FieldValidations: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(FieldValidations)
  }

  validate (fieldName: string, input: object): string {
    const validators = this.validators.filter(validator => validator.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) return error.message
    }
  }
}
