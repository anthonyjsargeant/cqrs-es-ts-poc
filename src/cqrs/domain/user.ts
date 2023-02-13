import { Address } from './address';
import { Contact } from './contact';

export class User {
  contacts: Set<Contact> = new Set();
  addresses: Set<Address> = new Set();
  
  constructor(
    readonly userId: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {}
}