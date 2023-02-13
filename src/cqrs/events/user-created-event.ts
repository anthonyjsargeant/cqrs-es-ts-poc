import { Event } from './event';

export class UserCreatedEvent extends Event {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {
    super();
    this.type = 'UserCreatedEvent';
  }
}
