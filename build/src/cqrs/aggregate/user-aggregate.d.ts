import { EventStore } from '../events/store/event-store';
export declare class UserAggregate {
    private eventStore;
    constructor(eventStore: EventStore);
}
