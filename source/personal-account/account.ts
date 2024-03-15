export class Account {
  public id: string;
  public email: string;
  public name: string;
  public number: string;
  public status: AccountStatus;

  constructor(data:{id: string, email: string, name: string, number: string, status: AccountStatus}) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.number = data.number;
    this.status = data.status;
  }
}

export type AccountStatus = "Open" | "Close";
