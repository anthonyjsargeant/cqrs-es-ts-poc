import { Address } from './address';
import { Contact } from './contact';

export class User {
  contacts: Contact[] = [];
  addresses: Address[] = [];

  constructor(
    readonly userId: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {}
}
