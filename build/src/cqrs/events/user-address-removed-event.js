"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressRemovedEvent = void 0;
const event_1 = require("./event");
class UserAddressRemovedEvent extends event_1.Event {
    constructor(city, county, postcode) {
        super();
        this.city = city;
        this.county = county;
        this.postcode = postcode;
    }
}
exports.UserAddressRemovedEvent = UserAddressRemovedEvent;
//# sourceMappingURL=user-address-removed-event.js.map