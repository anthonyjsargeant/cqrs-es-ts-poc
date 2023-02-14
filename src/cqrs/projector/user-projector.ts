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
    addresses.add(address);
    userAddress.addressByRegion.set(address.county, addresses);
    this.userReadRepository.addUserAddress(userId, userAddress);
  }
  
  private applyUserAddressRemovedEvent(userId: string, event: UserAddressRemovedEvent): void {
    const address = new Address(event.city, event.county, event.postcode);
    const userAddress = this.userReadRepository.getUserAddress(userId);
    if (userAddress) {
      const addresses = userAddress.addressByRegion.get(address.county);
      if (addresses) {
        addresses.delete(address);
      }
      this.userReadRepository.addUserAddress(userId, userAddress);
    }
  }

  private applyUserContactAddedEvent(userId: string, event: UserContactAddedEvent): void {
    const contact = new Contact(event.type, event.contactDetails);
    const userContact = this.userReadRepository.getUserContact(userId) || new UserContact();
    const contacts = userContact.contactByType.get(contact.type) || new Set();
    contacts.add(contact);
    userContact.contactByType.set(contact.type, contacts);
    this.userReadRepository.addUserContact(userId, userContact);
  }

  private applyUserContactRemovedEvent(userId: string, event: UserContactRemovedEvent): void {
    const contact = new Contact(event.type, event.contactDetails);
    const userContact = this.userReadRepository.getUserContact(userId);
    if (userContact) {
      const contacts = userContact.contactByType.get(contact.type);
      if (contacts) {
        contacts.delete(contact);
      }
      this.userReadRepository.addUserContact(userId, userContact);
    }  
  }
}
