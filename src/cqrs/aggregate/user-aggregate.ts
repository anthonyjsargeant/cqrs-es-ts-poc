import {EventStore} from '../events/store/event-store';

export class UserAggregate {
  constructor(private eventStore: EventStore) {}
}
