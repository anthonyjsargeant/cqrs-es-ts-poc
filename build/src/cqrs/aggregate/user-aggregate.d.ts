import { CreateUserCommand } from '../command/create-user-command';
import { EventStore } from '../events/store/event-store';
import { Event } from '../events/event';
export declare class UserAggregate {
    private readonly eventStore;
    constructor(eventStore: EventStore);
    handleCreateUserCommand(command: CreateUserCommand): Event[];
}
