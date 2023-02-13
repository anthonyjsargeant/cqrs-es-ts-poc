import { Event } from './event';

export class UserContactRemovedEvent extends Event {
  constructor(
    readonly contactType: string,
    readonly contactDetails: string,
  ) {
    super();
  }
}
