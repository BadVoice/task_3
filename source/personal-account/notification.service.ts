import { Account } from "./account";
import { AccountError } from "./account.error";

export interface NotificationServiceInterface<TIn = string> {
  sendWelcomeMessage(account: TIn)
}

export class NotificationService implements NotificationServiceInterface<Account> {
   sendWelcomeMessage(account: Account) {
     if(!account) {
      throw new AccountError('Error for empty name')
     }

     const message = `Hello ${account.name}`

     return message
  }
}
