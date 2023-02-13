"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContactRemovedEvent = void 0;
const event_1 = require("./event");
class UserContactRemovedEvent extends event_1.Event {
    constructor(contactType, contactDetails) {
        super();
        this.contactType = contactType;
        this.contactDetails = contactDetails;
        this.type = 'UserContactRemovedEvent';
    }
}
exports.UserContactRemovedEvent = UserContactRemovedEvent;
//# sourceMappingURL=user-contact-removed-event.js.map