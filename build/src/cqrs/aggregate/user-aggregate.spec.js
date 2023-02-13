"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_aggregate_1 = require("./user-aggregate");
const event_store_1 = require("../events/store/event-store");
const create_user_command_1 = require("../command/create-user-command");
const uuid_1 = require("uuid");
describe('UserAggregate Test', () => {
    it('should handle CreateUserCommand', () => {
        const userId = (0, uuid_1.v4)();
        const eventStore = new event_store_1.EventStore();
        const userAggregate = new user_aggregate_1.UserAggregate(eventStore);
        const createUserCommand = new create_user_command_1.CreateUserCommand(userId, 'Anthony', 'Sargeant');
        userAggregate.handleCreateUserCommand(createUserCommand);
        eventStore.eventStore.forEach((event) => {
            console.log(JSON.stringify(event, null, 2));
        });
    });
});
//# sourceMappingURL=user-aggregate.spec.js.map