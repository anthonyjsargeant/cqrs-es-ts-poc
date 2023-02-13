import { v4 as uuidv4 } from 'uuid';
import { CreateUserCommand } from './cqrs/command/create-user-command';
import { UpdateUserCommand } from './cqrs/command/update-user-command';
import { Address } from './cqrs/domain/address';
import { Contact } from './cqrs/domain/contact';
import { AddressByRegionQuery } from './cqrs/query/address-by-region-query';
import { ContactByTypeQuery } from './cqrs/query/contact-by-type-query';
import { Event } from './cqrs/events/event';
import { UserProjector } from './cqrs/projector/user-projector';
import { EventStore } from './cqrs/events/store/event-store';
import { UserAggregate } from './cqrs/aggregate/user-aggregate';
import { UserProjection } from './cqrs/query/projection/user-projection';
import { UserReadRepository } from './cqrs/repository/user-read-repository';

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

    const newYork = new Address('New York', 'NY', '10001');
    const losAngeles = new Address('Los Angeles', 'CA', '90001');

    const addresses: Set<Address> = new Set([ 
      new Address('New York', 'NY', '10001'),
      new Address('Los Angeles', 'CA', '90001')
    ]);

    const contacts: Set<Contact> = new Set([
      new Contact('EMAIL', 'tom.sawyer@gmail.com'),
      new Contact('EMAIL', 'tom.sawyer@rediff.com')
    ]);

    const updateUserCommand = new UpdateUserCommand(userId, addresses, contacts);
    // events.push(userAggregate.handleUpdateUserCommand(updateUserCommand));
    // projector.project(userId, events);

    // updateUserCommand = new UpdateUserCommand(userId, Stream.of(new Address('New York', 'NY', '10001'), new Address('Housten', 'TX', '77001'))
    //     .collect(Collectors.toSet()),
    //     Stream.of(new Contact('EMAIL', 'tom.sawyer@gmail.com'), new Contact('PHONE', '700-000-0001'))
    //         .collect(Collectors.toSet()));
    // events.addAll(userAggregate.handleUpdateUserCommand(updateUserCommand));
    // projector.project(userId, events);

    // ContactByTypeQuery contactByTypeQuery = new ContactByTypeQuery(userId, 'EMAIL');
    // assertEquals(Stream.of(new Contact('EMAIL', 'tom.sawyer@gmail.com'))
    //     .collect(Collectors.toSet()), userProjection.handle(contactByTypeQuery));
    // AddressByRegionQuery addressByRegionQuery = new AddressByRegionQuery(userId, 'NY');
    // assertEquals(Stream.of(new Address('New York', 'NY', '10001'))
    //     .collect(Collectors.toSet()), userProjection.handle(addressByRegionQuery));
  });
});
