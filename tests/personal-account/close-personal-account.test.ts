import {
  AccountManager,
  CloseAccountCommand,
  AccountError,
  Account
} from "../../source/personal-account";

describe('Personal-Account: CloseAccount', () => {
  const manager: AccountManager = new AccountManager();

  test('Should successfully close a personal account', async() => {
    const command = new CloseAccountCommand();
    command.id = "123-456-789";

    const account = await manager.closeAccount(command);

    expect(account).toBeInstanceOf(Account);
    expect(account).toEqual(
      expect.objectContaining({
        id: "123-456-789",
        email: "customer0919@domain.ru",
        name: "Пугачева Ольга Сергеевна",
        number: expect.any(String),
        status: "Close"
      })
    );
  });

  test('Should throw an error for an already closed account', async () => {
    try {
      const command = new CloseAccountCommand();
      command.id = "231-545-16-01";

      const account = await manager.closeAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });

  test('Should throw an error for non-existing account', async () => {
    try {
      const command = new CloseAccountCommand();
      command.id = "101-101-11-01";

      const account = await manager.closeAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });
});
