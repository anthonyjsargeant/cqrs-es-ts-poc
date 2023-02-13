"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressAddedEvent = void 0;
const event_1 = require("./event");
class UserAddressAddedEvent extends event_1.Event {
    constructor(city, county, postcode) {
        super();
        this.city = city;
        this.county = county;
        this.postcode = postcode;
        this.type = 'UserAddressAddedEvent';
    }
}
exports.UserAddressAddedEvent = UserAddressAddedEvent;
//# sourceMappingURL=user-address-added-event.js.map