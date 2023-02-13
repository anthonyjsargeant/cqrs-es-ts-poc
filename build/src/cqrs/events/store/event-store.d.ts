import { Event } from '../event';
export declare class EventStore {
    eventStore: Map<string, Event[]>;
    addEvent(id: string, event: Event): void;
}
