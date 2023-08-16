export interface FieldValidation {
  field: string
  validate: (value: object) => Error
}
