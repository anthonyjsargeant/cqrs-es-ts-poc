import { Address } from '../domain/address';
import { Contact } from '../domain/contact';
import { User } from '../domain/user';
import { EventStore } from '../events/store/event-store';
import { UserAddressAddedEvent } from '../events/user-address-added-event';
import { UserAddressRemovedEvent } from '../events/user-address-removed-event';
import { UserContactAddedEvent } from '../events/user-contact-added-event';
import { UserContactRemovedEvent } from '../events/user-contact-removed-event';
import { UserCreatedEvent } from '../events/user-created-event';
import { recreateUserState } from './user-utility';

export class UserService {
  constructor(
    private readonly eventStore: EventStore
  ) {}

  public createUser(userId: string, firstName: string, lastName: string): void {
    this.eventStore.addEvent(userId, new UserCreatedEvent(userId, firstName, lastName));
  }

  public updateUser(userId: string, contacts: Set<Contact>, addresses: Set<Address>): void {
    const user = recreateUserState(this.eventStore, userId);
    if (user) {
      this.updateContacts(userId, contacts, user);
      this.updateAddresses(userId, addresses, user);
    }
  }

  private updateAddresses(userId: string, addresses: Set<Address>, user: User): void {
    this.removeAddresses(userId, addresses, user);
    this.addAddresses(userId, addresses, user);
  }

  private removeAddresses(userId: string, addresses: Set<Address>, user: User): void {
    user.addresses.forEach((address) => {
      if (!addresses.has(address)) {
        this.eventStore.addEvent(userId, new UserAddressRemovedEvent(address.city, address.county, address.postcode));
      }
    });
  }

  private addAddresses(userId: string, addresses: Set<Address>, user: User): void {
    user.addresses.forEach((address) => {
      if (!addresses.has(address)) {
        this.eventStore.addEvent(userId, new UserAddressAddedEvent(address.city, address.county, address.postcode));
      }
    });
  }

  private updateContacts(userId: string, contacts: Set<Contact>, user: User): void {
    this.removeContacts(userId, contacts, user);
    this.addContacts(userId, contacts, user);
  }

  private removeContacts(userId: string, contacts: Set<Contact>, user: User): void {
    user.contacts.forEach((contact) => {
      if (!contacts.has(contact)) {
        this.eventStore.addEvent(userId, new UserContactRemovedEvent(contact.type, contact.detail));
      }
    });
  }

  private addContacts(userId: string, contacts: Set<Contact>, user: User): void {
    user.contacts.forEach((contact) => {
      if (!contacts.has(contact)) {
        this.eventStore.addEvent(userId, new UserContactAddedEvent(contact.type, contact.detail));
      }
    });
  }
}
