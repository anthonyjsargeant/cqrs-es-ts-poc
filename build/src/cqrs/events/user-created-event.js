"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedEvent = void 0;
const event_1 = require("./event");
class UserCreatedEvent extends event_1.Event {
    constructor(id, firstName, lastName) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = 'UserCreatedEvent';
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
//# sourceMappingURL=user-created-event.js.map