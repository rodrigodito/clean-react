import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { type AddAccount } from '@/domain/usecases'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
