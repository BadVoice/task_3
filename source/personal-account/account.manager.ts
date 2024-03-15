import { OpenAccountCommand } from "./open-account.command";
import { CloseAccountCommand } from "./close-account.command";
import { GetAccountsQuery } from "./get-accounts.query";
import { AccountError } from "./account.error";
import { Account } from "./account";
import { NotificationService } from "./notification.service";

export interface AccountManagerInterface {
  openAccount(command: OpenAccountCommand): Promise<Account>;
  closeAccount(command: CloseAccountCommand): Promise<Account>;
  getAccounts(query: GetAccountsQuery): Promise<Account[]>;
}

export class AccountManager implements AccountManagerInterface {
  private readonly notificationService: NotificationService | undefined

  constructor( notificationService: NotificationService | undefined ) {
    this.notificationService = notificationService
  }

  async openAccount(command: OpenAccountCommand): Promise<Account> {
    const { email, name } = command;

    if(!email || !name) {
       throw new AccountError('email and name must be provide');
    }

    const accountData: Account = {
      id: "uuid",
      email,
      name,
      number: "id",
      status: "Open",
    }

    const openAccount: Account = new Account(accountData)

    try {
      this.notificationService.sendWelcomeMessage(openAccount);
    } catch (error) {
      throw new AccountError('error when sending welcome message');
    }

    return openAccount;
  }

  async closeAccount(command: CloseAccountCommand): Promise<Account> {
    const { id } = command;

    if(!id) {
      throw new AccountError('Account not found')
    }

    const closedAccountData: Account = {  // по сути это данные найденого аккаунта по id
      id,
      email: "customer0919@domain.ru",
      name: "Пугачева Ольга Сергеевна",
      number: "id",
      status: "Close"
    };

    const closedAccount: Account = new Account(closedAccountData);

    return closedAccount;
  }

  async getAccounts(query: GetAccountsQuery): Promise<Account[]> {
    const accounts: Account[] = [
      {
        id: "uuid1",
        email: "example1@example.com",
        name: "Alice Smith",
        number: "id1",
        status: "Open",
      },
      {
        id: "uuid2",
        email: "example2@example.com",
        name: "Bob Johnson",
        number: "id2",
        status: "Open",
      }
    ];

    return accounts;
  }
}
