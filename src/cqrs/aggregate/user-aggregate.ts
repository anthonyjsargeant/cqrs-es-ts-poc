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
import * as _ from 'lodash';

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
      this.addContacts(command, user, events);
      this.addAddresses(command, user, events);
      this.removeContacts(command, user, events);
      this.removeAddresses(command, user, events);
    }

    return events;
  }

  private removeContacts(command: UpdateUserCommand, user: User, events: Event[]): void {
    const contactsToRemove: Contact[] = [];

    command.contacts.forEach((contact) => {
      const found = _.find(user.contacts, (c) => {
        return c.contactType === contact.contactType &&
          c.contactDetail === contact.contactDetail;
      });
      if (!found) {
        contactsToRemove.push(contact);
      }
    });

    contactsToRemove.forEach((contact) => {
      const userContactRemovedEvent = new UserContactRemovedEvent(contact.contactType, contact.contactDetail);
      events.push(userContactRemovedEvent);
      this.eventStore.addEvent(command.userId, userContactRemovedEvent);
    });
  }

  private addContacts(command: UpdateUserCommand, user: User, events: Event[]): void {
    const contactsToAdd: Contact[] = [];

    command.contacts.forEach((contact) => {
      const found = _.find(user.contacts, (c) => {
        return c.contactType === contact.contactType &&
          c.contactDetail === contact.contactDetail;
      });
      if (!found) {
        contactsToAdd.push(contact);
      }
    });

    contactsToAdd.forEach((contact) => {
      const userContactAddedEvent = new UserContactAddedEvent(contact.contactType, contact.contactDetail);
      events.push(userContactAddedEvent);
      this.eventStore.addEvent(command.userId, userContactAddedEvent);
    });
  }

  private removeAddresses(command: UpdateUserCommand, user: User, events: Event[]): void {
    const addressesToRemove: Address[] = [];

    command.addresses.forEach((address) => {
      const found = _.find(user.addresses, (a) => {
        return a.city === address.city &&
          a.county === address.county &&
          a.postcode === address.postcode;
      });
      if (!found) {
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
    const addressesToAdd: Address[] = [];

    command.addresses.forEach((address) => {
      const found = _.find(user.addresses, (a) => {
        return a.city === address.city &&
          a.county === address.county &&
          a.postcode === address.postcode;
      });
      if (!found) {
        addressesToAdd.push(address);
      }
    });

    addressesToAdd.forEach((address) => {
      const userAddressAddedEvent = new UserAddressAddedEvent(address.city, address.county, address.postcode);
      events.push(userAddressAddedEvent);
      this.eventStore.addEvent(command.userId, userAddressAddedEvent);
    });
  }
}
