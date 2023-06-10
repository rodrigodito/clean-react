import { faker } from '@faker-js/faker'

import { type HttpPostParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.internet.email()
})
