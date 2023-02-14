import { Address } from '../../domain/address';

export class UserAddress {
  addressByRegion: Map<string, Address[]> = new Map();
}
