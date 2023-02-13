import { Address } from '../../domain/address';

export class UserAddress {
  addressByRegion: Map<string, Set<Address>> = new Map();
}
