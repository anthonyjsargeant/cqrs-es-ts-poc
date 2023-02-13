import { Event } from '../event';

export class EventStore {
  eventStore: Map<string, Event[]> = new Map();

  public addEvent(id: string, event: Event): void {
    let events = this.eventStore.get(id);
    if (!events) {
      events = [];
      events.push(event);
      this.eventStore.set(id, events);
    } else {
      events.push(event);
    }
  }
}
