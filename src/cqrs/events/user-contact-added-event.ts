import { Event } from './event';

export class UserContactAddedEvent extends Event {
  constructor(
    readonly contactType: string,
    readonly contactDetails: string,
  ) {
    super();
  }
}
