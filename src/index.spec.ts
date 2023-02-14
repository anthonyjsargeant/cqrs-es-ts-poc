import {v4 as uuidv4} from 'uuid';
import {CreateUserCommand} from './cqrs/command/create-user-command';
import {UpdateUserCommand} from './cqrs/command/update-user-command';
import {Address} from './cqrs/domain/address';
import {Contact} from './cqrs/domain/contact';
import {AddressByRegionQuery} from './cqrs/query/address-by-region-query';
import {ContactByTypeQuery} from './cqrs/query/contact-by-type-query';
import {UserProjector} from './cqrs/projector/user-projector';
import {EventStore} from './cqrs/events/store/event-store';
import {UserAggregate} from './cqrs/aggregate/user-aggregate';
import {UserProjection} from './cqrs/query/projection/user-projection';
import {UserReadRepository} from './cqrs/repository/user-read-repository';
import 'jest-extended';

describe('CQRS Application', () => {

  let writeRepository: EventStore;
  let projector: UserProjector;
  let userAggregate: UserAggregate;
  let userProjection: UserProjection;
  let readRepository: UserReadRepository;

  beforeEach(() => {
    writeRepository = new EventStore();
    readRepository = new UserReadRepository();
    projector = new UserProjector(readRepository);
    userAggregate = new UserAggregate(writeRepository);
    userProjection = new UserProjection(readRepository);
  });

  it('should return result when run with commands', () => {
    const userId = uuidv4();
    const createUserCommand = new CreateUserCommand(userId, 'Anthony', 'Sargeant');
    const events = userAggregate.handleCreateUserCommand(createUserCommand);

    projector.project(userId, events);

    const firstUpdateUserCommand = new UpdateUserCommand(
      userId,
      new Set([
        new Address('New York', 'NY', '10001'),
        new Address('Los Angeles', 'CA', '90001')
      ]),
      new Set([
        new Contact('EMAIL', 'tom.sawyer@gmail.com'),
        new Contact('EMAIL', 'tom.sawyer@rediff.com')
      ]));
    events.push(...userAggregate.handleUpdateUserCommand(firstUpdateUserCommand));
    projector.project(userId, events);

    const secondUpdateUserCommand = new UpdateUserCommand(
      userId,
      new Set([
        new Address('New York', 'NY', '10001'),
        new Address('Houston', 'TX', '77001')
      ]),
      new Set([
        new Contact('EMAIL', 'tom.sawyer@gmail.com'),
        new Contact('PHONE', '555-555-1010')
      ]));
    events.push(...userAggregate.handleUpdateUserCommand(secondUpdateUserCommand));
    projector.project(userId, events);

    const contactByTypeQuery = new ContactByTypeQuery(userId, 'EMAIL');
    expect(Array.from(userProjection.handleContactByTypeQuery(contactByTypeQuery) || new Set()))
      .toIncludeSameMembers(Array.from(new Set([
        new Contact('EMAIL', 'tom.sawyer@gmail.com')
      ])));

    const addressByRegionQuery = new AddressByRegionQuery(userId, 'NY');
    expect(Array.from(userProjection.handleAddressByRegionQuery(addressByRegionQuery) || new Set()))
      .toIncludeSameMembers(Array.from(new Set([
        new Address('New York', 'NY', '10001')
      ])));
  });
});
