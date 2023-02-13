import { CreateUserCommand } from '../command/create-user-command';
import { UserCreatedEvent } from '../events/user-created-event';
import { EventStore } from '../events/store/event-store';
import { Event } from '../events/event';

export class UserAggregate {
  constructor(
    private readonly eventStore: EventStore
  ) {}

  public handleCreateUserCommand(command: CreateUserCommand): Event[] {
    const userCreatedEvent = new UserCreatedEvent(command.userId, command.firstName, command.lastName);
    this.eventStore.addEvent(command.userId, userCreatedEvent);
    return [ userCreatedEvent ];
  }
}
