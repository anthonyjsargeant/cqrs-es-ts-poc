import { UserReadRepository } from '../repository/user-read-repository';
import { Event } from '../events/event';
import { UserAddressAddedEvent } from '../events/user-address-added-event';
import { UserContactAddedEvent } from '../events/user-contact-added-event';
import { UserContactRemovedEvent } from '../events/user-contact-removed-event';
import { Address } from '../domain/address';
import { UserAddress } from '../query/model/user-address';
import { Contact } from '../domain/contact';
import { UserContact } from '../query/model/user-contact';
import { UserAddressRemovedEvent } from '../events/user-address-removed-event';
import * as _ from 'lodash';

export class UserProjector {
  constructor(
    readonly userReadRepository: UserReadRepository
  ) {}

  public project(userId: string, events: Event[]): void {
    events.forEach((event) => {
      if (event.type === 'UserAddressAddedEvent') {
        this.applyUserAddressAddedEvent(userId, event as UserAddressAddedEvent);
      }
      if (event.type === 'UserAddressRemovedEvent') {
        this.applyUserAddressRemovedEvent(userId, event as UserAddressRemovedEvent);
      }
      if (event.type === 'UserContactAddedEvent') {
        this.applyUserContactAddedEvent(userId, event as UserContactAddedEvent);
      }
      if (event.type === 'UserContactRemovedEvent') {
        this.applyUserContactRemovedEvent(userId, event as UserContactRemovedEvent);
      }
    });
  }

  private applyUserAddressAddedEvent(userId: string, event: UserAddressAddedEvent): void {
    const address = new Address(event.city, event.county, event.postcode);
    const userAddress = this.userReadRepository.getUserAddress(userId) || new UserAddress();
    const addresses = userAddress.addressByRegion.get(address.county) || new Set();
    const updatedAddresses = _.unionWith(Array.from(addresses), [address], (a, b) => {
      return a.city === b.city &&
        a.county === b.county &&
        a.postcode === b.postcode;
    });
    userAddress.addressByRegion.set(address.county, new Set(updatedAddresses));
    this.userReadRepository.addUserAddress(userId, userAddress);
  }

  private applyUserAddressRemovedEvent(userId: string, event: UserAddressRemovedEvent): void {
    const address = new Address(event.city, event.county, event.postcode);
    const userAddress = this.userReadRepository.getUserAddress(userId);
    if (userAddress) {
      const addresses = userAddress.addressByRegion.get(address.county);
      if (addresses) {
        const updatedAddresses = _.remove(Array.from(addresses), (a) => {
          return a.city === address.city &&
            a.county === address.county &&
            a.postcode === address.postcode;
        });
        userAddress.addressByRegion.set(event.county, new Set(updatedAddresses));
      }
      this.userReadRepository.addUserAddress(userId, userAddress);
    }
  }

  private applyUserContactAddedEvent(userId: string, event: UserContactAddedEvent): void {
    const contact = new Contact(event.contactType, event.contactDetails);
    const userContact = this.userReadRepository.getUserContact(userId) || new UserContact();
    const contacts = userContact.contactByType.get(contact.contactType) || new Set();
    const updatedContacts = _.unionWith(Array.from(contacts), [contact], (a, b) => {
      return a.contactType === b.contactType &&
        a.contactDetail === b.contactDetail;
    });
    userContact.contactByType.set(contact.contactType, new Set(updatedContacts));
    this.userReadRepository.addUserContact(userId, userContact);
  }

  private applyUserContactRemovedEvent(userId: string, event: UserContactRemovedEvent): void {
    const contact = new Contact(event.contactType, event.contactDetails);
    const userContact = this.userReadRepository.getUserContact(userId);
    if (userContact) {
      const contacts = userContact.contactByType.get(contact.contactType);
      if (contacts) {
        const updatedContacts = _.remove(Array.from(contacts), (c) => {
          return c.contactType === contact.contactType &&
            c.contactDetail === contact.contactDetail;
        });
        userContact.contactByType.set(contact.contactType, new Set(updatedContacts));
      }
      this.userReadRepository.addUserContact(userId, userContact);
    }
  }
}
