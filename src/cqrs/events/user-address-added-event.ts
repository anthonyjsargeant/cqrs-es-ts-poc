import { Event } from './event';

export class UserAddressAddedEvent extends Event {
  constructor(
    readonly city: string,
    readonly county: string,
    readonly postcode: string
  ) {
    super();
  }
}
