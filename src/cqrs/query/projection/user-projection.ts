import { Address } from '../../domain/address';
import { Contact } from '../../domain/contact';
import { UserReadRepository } from '../../repository/user-read-repository';
import { AddressByRegionQuery } from '../address-by-region-query';
import { ContactByTypeQuery } from '../contact-by-type-query';

export class UserProjection {
  constructor(
    readonly userReadRepository: UserReadRepository
  ) {}

  public handleContactByTypeQuery(query: ContactByTypeQuery): Set<Contact> | undefined {
    const userContact = this.userReadRepository.getUserContact(query.userId);
    return userContact?.contactByType.get(query.contactType);
  }

  public handleAddressByRegionQuery(query: AddressByRegionQuery): Set<Address> | undefined {
    const userAddress = this.userReadRepository.getUserAddress(query.userId);
    return userAddress?.addressByRegion.get(query.county);
  }
}
