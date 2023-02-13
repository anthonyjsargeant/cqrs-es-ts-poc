import { Event } from '../event';

export class EventStore {
  eventStore: Map<string, Event[]> = new Map();
}
