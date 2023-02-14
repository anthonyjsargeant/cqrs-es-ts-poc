import { Address } from '../domain/address';
import { Contact } from '../domain/contact';

export class UpdateUserCommand {
  constructor(
    readonly userId: string,
    readonly addresses: Address[],
    readonly contacts: Contact[]
  ) {}
}
