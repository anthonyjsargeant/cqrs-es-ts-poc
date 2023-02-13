"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const uuid_1 = require("uuid");
class Event {
    constructor() {
        this.id = (0, uuid_1.v4)();
        this.created = new Date();
        this.type = 'Event';
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map