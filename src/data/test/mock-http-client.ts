import { type HttpPostClient } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post (url: string): Promise<void> {
    this.url = url
    await Promise.resolve()
  }
}
