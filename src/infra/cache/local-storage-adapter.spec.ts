import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const fakeKey = faker.database.column()
    const fakeValue = faker.lorem.word()
    await sut.set(fakeKey, fakeValue)

    expect(localStorage.setItem).toHaveBeenCalledWith(fakeKey, fakeValue)
  })
})
