import { CreateUserCommand } from '../command/create-user-command';
import { UserCreatedEvent } from '../events/user-created-event';
import { EventStore } from '../events/store/event-store';
import { Event } from '../events/event';
import { recreateUserState } from '../service/user-utility';
import { UpdateUserCommand } from '../command/update-user-command';
import { UserContactRemovedEvent } from '../events/user-contact-removed-event';
import { Contact } from '../domain/contact';
import { User } from '../domain/user';
import { Address } from '../domain/address';
import { UserAddressRemovedEvent } from '../events/user-address-removed-event';
import { UserContactAddedEvent } from '../events/user-contact-added-event';
import { UserAddressAddedEvent } from '../events/user-address-added-event';

export class UserAggregate {
  constructor(
    private readonly eventStore: EventStore
  ) {}

  public handleCreateUserCommand(command: CreateUserCommand): Event[] {
    const userCreatedEvent = new UserCreatedEvent(command.userId, command.firstName, command.lastName);
    this.eventStore.addEvent(command.userId, userCreatedEvent);
    return [ userCreatedEvent ];
  }


  public handleUpdateUserCommand(command: UpdateUserCommand): Event[] {
    const user = recreateUserState(this.eventStore, command.userId);
    const events: Event[] = [];

    if (user) {
      this.removeContacts(command, user, events);
      this.addContacts(command, user, events);
      this.removeAddresses(command, user, events);
      this.addAddresses(command, user, events);
    }

    return events;
  }

  private removeContacts(command: UpdateUserCommand, user: User, events: Event[]): void {
    const contactsToRemove: Contact[] = [];
    
    user.contacts.forEach((contact) => {
      if (!command.contacts.has(contact)) {
        contactsToRemove.push(contact);
      }
    });

    contactsToRemove.forEach((contact) => {
      const userContactRemovedEvent = new UserContactRemovedEvent(contact.type, contact.detail);
      events.push(userContactRemovedEvent);
      this.eventStore.addEvent(command.userId, userContactRemovedEvent);
    });
  }

  private addContacts(command: UpdateUserCommand, user: User, events: Event[]): void {
    const contactsToAdd: Contact[] = [];
    
    user.contacts.forEach((contact) => {
      if (!command.contacts.has(contact)) {
        contactsToAdd.push(contact);
      }
    });

    contactsToAdd.forEach((contact) => {
      const userContactAddedEvent = new UserContactAddedEvent(contact.type, contact.detail);
      events.push(userContactAddedEvent);
      this.eventStore.addEvent(command.userId, userContactAddedEvent);
    });
  }

  private removeAddresses(command: UpdateUserCommand, user: User, events: Event[]): void {
    const addressesToRemove: Address[] = [];  
    
    user.addresses.forEach((address) => {
      if (!command.addresses.has(address)) {
        addressesToRemove.push(address);
      }
    });

    addressesToRemove.forEach((address) => {
      const userAddressRemovedEvent = new UserAddressRemovedEvent(address.city, address.county, address.postcode);
      events.push(userAddressRemovedEvent);
      this.eventStore.addEvent(command.userId, userAddressRemovedEvent);
    });
  }

  private addAddresses(command: UpdateUserCommand, user: User, events: Event[]): void {
    const addessesToAdd: Address[] = [];  
    
    user.addresses.forEach((address) => {
      if (!command.addresses.has(address)) {
        addessesToAdd.push(address);
      }
    });

    addessesToAdd.forEach((address) => {
      const userAddressAddedEvent = new UserAddressAddedEvent(address.city, address.county, address.postcode);
      events.push(userAddressAddedEvent);
      this.eventStore.addEvent(command.userId, userAddressAddedEvent);
    });
  }
}
