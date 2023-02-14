import { User } from '../domain/user';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '../events/event';
import { UserCreatedEvent } from '../events/user-created-event';
import { UserAddressAddedEvent } from '../events/user-address-added-event';
import { Address } from '../domain/address';
import { UserAddressRemovedEvent } from '../events/user-address-removed-event';
import { UserContactAddedEvent } from '../events/user-contact-added-event';
import { Contact } from '../domain/contact';
import { UserContactRemovedEvent } from '../events/user-contact-removed-event';
import { EventStore } from '../events/store/event-store';
import * as _ from 'lodash';

export const recreateUserState = (store: EventStore, userId: string): User | undefined => {
  let user: User | undefined = undefined;

  const events = store.eventStore.get(userId) || [];

  events.forEach((event: Event) => {
    if (event.type === 'UserCreatedEvent') {
      const userCreatedEvent = event as UserCreatedEvent;
      user = new User(uuidv4(), userCreatedEvent.firstName, userCreatedEvent.lastName);
    }

    if (event.type === 'UserAddressAddedEvent') {
      const userAddressAddedEvent = event as UserAddressAddedEvent;
      const address = new Address(
        userAddressAddedEvent.city,
        userAddressAddedEvent.county,
        userAddressAddedEvent.postcode
      );
      if (user) {
        const updatedAddresses = _.union(Array.from(user.addresses), [address]);
        user.addresses = new Set(updatedAddresses);
      }
    }

    if (event.type === 'UserAddressRemovedEvent') {
      const userAddressRemovedEvent = event as UserAddressRemovedEvent;
      const address = new Address(
        userAddressRemovedEvent.city,
        userAddressRemovedEvent.county,
        userAddressRemovedEvent.postcode);
      if (user) {
        const updatedAddresses = _.remove(Array.from(user.addresses), (a) => {
          return a.city === address.city &&
            a.county === address.county &&
            a.postcode === address.postcode;
        });
        user.addresses = new Set(updatedAddresses);
      }
    }

    if (event.type === 'UserContactAddedEvent') {
      const userContactAddedEvent = event as UserContactAddedEvent;
      const contact = new Contact(
        userContactAddedEvent.contactType,
        userContactAddedEvent.contactDetails);
      if (user) {
        const updatedContacts = _.union(Array.from(user.contacts), [contact]);
        user.contacts = new Set(updatedContacts);
      }
    }

    if (event.type === 'UserContactRemovedEvent') {
      const userContactRemovedEvent = event as UserContactRemovedEvent;
      const contact = new Contact(
        userContactRemovedEvent.contactType,
        userContactRemovedEvent.contactDetails);
      if (user) {
        const updatedContacts = _.remove(Array.from(user.contacts), (c) => {
          return (c.contactType === contact.contactType) && (c.contactDetail === contact.contactDetail);
        });
        user.contacts = new Set(updatedContacts);
      }
    }
  });

  return user;
};
