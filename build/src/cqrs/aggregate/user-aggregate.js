"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAggregate = void 0;
const user_created_event_1 = require("../events/user-created-event");
class UserAggregate {
    constructor(eventStore) {
        this.eventStore = eventStore;
    }
    handleCreateUserCommand(command) {
        const userCreatedEvent = new user_created_event_1.UserCreatedEvent(command.userId, command.firstName, command.lastName);
        this.eventStore.addEvent(command.userId, userCreatedEvent);
        return [userCreatedEvent];
    }
}
exports.UserAggregate = UserAggregate;
//# sourceMappingURL=user-aggregate.js.map