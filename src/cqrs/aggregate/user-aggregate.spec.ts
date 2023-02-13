import { UserAggregate } from './user-aggregate';
import { EventStore } from '../events/store/event-store';
import { CreateUserCommand } from '../command/create-user-command';
import { v4 as uuidv4 } from 'uuid';

describe('UserAggregate Test', () => { 
  it('should handle CreateUserCommand', () => {
    const userId = uuidv4();
    const eventStore = new EventStore();
    const userAggregate = new UserAggregate(eventStore);
    const createUserCommand = new CreateUserCommand(userId, 'Anthony', 'Sargeant');
    userAggregate.handleCreateUserCommand(createUserCommand);

    expect(eventStore.eventStore.get(userId)).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            id: userId,
            firstName: 'Anthony',
            lastName: 'Sargeant',
            type: 'UserCreatedEvent',
          })
        ]
      ));
  });
});