import { faker } from '@faker-js/faker'
import { fireEvent, type RenderResult } from '@testing-library/react'

export function testChildCount (sut: RenderResult, fieldName: string, count: number) {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export function testButtonIsDisabled (sut: RenderResult, fieldName: string, isDisabled: boolean) {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export function testStatusForField (sut: RenderResult, fieldName: string, validationError?: string) {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export function populateField (sut: RenderResult, fieldName: string, value = faker.word.words(1)): void {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
