import { UserAddress } from '../query/model/user-address';
import { UserContact } from '../query/model/user-contact';

export class UserReadRepository {
  readonly userAddress: Map<string, UserAddress> = new Map();
  readonly userContact: Map<string, UserContact> = new Map();

  public addUserAddress(userId: string, userAddress: UserAddress): void {
    this.userAddress.set(userId, userAddress);
  }

  public getUserAddress(userId: string): UserAddress | undefined {
    return this.userAddress.get(userId);
  }

  public addUserContact(userId: string, userContact: UserContact): void {
    this.userContact.set(userId, userContact);
  }

  public getUserContact(userId: string): UserContact | undefined {
    return this.userContact.get(userId);
  }
}
