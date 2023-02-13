"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_address_added_event_1 = require("./user-address-added-event");
const user_address_removed_event_1 = require("./user-address-removed-event");
const user_contact_added_event_1 = require("./user-contact-added-event");
const user_contact_removed_event_copy_1 = require("./user-contact-removed-event copy");
describe('Events are created correctly', () => {
    it('should create UserAddressAddedEvent', () => {
        const userAddressAddedEvent = new user_address_added_event_1.UserAddressAddedEvent('Leeds', 'West Yorkshire', 'LS1 1UR');
        expect(userAddressAddedEvent.city).toStrictEqual('Leeds');
        expect(userAddressAddedEvent.county).toStrictEqual('West Yorkshire');
        expect(userAddressAddedEvent.postcode).toStrictEqual('LS1 1UR');
        expect(userAddressAddedEvent.id).toBeTruthy();
        expect(userAddressAddedEvent.created).toBeTruthy();
    });
    it('should create UserAddressRemovedEvent', () => {
        const userAddressRemovedEvent = new user_address_removed_event_1.UserAddressRemovedEvent('Leeds', 'West Yorkshire', 'LS1 1UR');
        expect(userAddressRemovedEvent.city).toStrictEqual('Leeds');
        expect(userAddressRemovedEvent.county).toStrictEqual('West Yorkshire');
        expect(userAddressRemovedEvent.postcode).toStrictEqual('LS1 1UR');
        expect(userAddressRemovedEvent.id).toBeTruthy();
        expect(userAddressRemovedEvent.created).toBeTruthy();
    });
    it('should create UserContactAddedEvent', () => {
        const userContactAddedEvent = new user_contact_added_event_1.UserContactAddedEvent('EMAIL', 'tom.sawyer@test.com');
        expect(userContactAddedEvent.contactType).toStrictEqual('EMAIL');
        expect(userContactAddedEvent.contactDetails).toStrictEqual('tom.sawyer@test.com');
        expect(userContactAddedEvent.id).toBeTruthy();
        expect(userContactAddedEvent.created).toBeTruthy();
    });
    it('should create UserContactRemovedEvent', () => {
        const userContactRemovedEvent = new user_contact_removed_event_copy_1.UserContactRemovedEvent('EMAIL', 'tom.sawyer@test.com');
        expect(userContactRemovedEvent.contactType).toStrictEqual('EMAIL');
        expect(userContactRemovedEvent.contactDetails).toStrictEqual('tom.sawyer@test.com');
        expect(userContactRemovedEvent.id).toBeTruthy();
        expect(userContactRemovedEvent.created).toBeTruthy();
    });
});
//# sourceMappingURL=event.spec.js.map