"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
class EventStore {
    constructor() {
        this.eventStore = new Map();
    }
    addEvent(id, event) {
        let events = this.eventStore.get(id);
        if (!events) {
            events = [];
            events.push(event);
            this.eventStore.set(id, events);
        }
        else {
            events.push(event);
        }
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=event-store.js.map