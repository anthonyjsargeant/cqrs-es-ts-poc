"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContactRemovedEvent = void 0;
const event_1 = require("./event");
class UserContactRemovedEvent extends event_1.Event {
    constructor(contactType, contactDetails) {
        super();
        this.contactType = contactType;
        this.contactDetails = contactDetails;
    }
}
exports.UserContactRemovedEvent = UserContactRemovedEvent;
//# sourceMappingURL=user-contact-removed-event%20copy.js.map