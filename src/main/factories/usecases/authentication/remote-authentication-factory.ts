import { RemoteAuthentication } from '@/data/usecases/authentication'
import { type Authentication } from '@/domain/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export function makeRemoteAuthentication (): Authentication {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
