import { type AddAccount, type AddAccountParams } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callCount = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callCount++
    return this.account
  }
}
