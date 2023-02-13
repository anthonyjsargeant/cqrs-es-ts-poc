"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContactAddedEvent = void 0;
const event_1 = require("./event");
class UserContactAddedEvent extends event_1.Event {
    constructor(contactType, contactDetails) {
        super();
        this.contactType = contactType;
        this.contactDetails = contactDetails;
        this.type = 'UserContactAddedEvent';
    }
}
exports.UserContactAddedEvent = UserContactAddedEvent;
//# sourceMappingURL=user-contact-added-event.js.map