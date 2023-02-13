import { Event } from './event';

export class UserAddressRemovedEvent extends Event {
  constructor(
    readonly city: string,
    readonly county: string,
    readonly postcode: string
  ) {
    super();
    this.type = 'UserAddressRemovedEvent';
  }
}
