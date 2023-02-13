"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const uuid_1 = require("uuid");
require("jest-extended");
const address_1 = require("./address");
const contact_1 = require("./contact");
describe('User Domain Object', () => {
    it('should create a new User object', () => {
        const id = (0, uuid_1.v4)();
        const user = new user_1.User(id, 'Anthony', 'Sargeant');
        expect(user.userId).toStrictEqual(id);
        expect(user.firstName).toStrictEqual('Anthony');
        expect(user.lastName).toStrictEqual('Sargeant');
        expect(user.addresses).toBeEmpty();
        expect(user.contacts).toBeEmpty();
    });
    it('should add an address to a User object', () => {
        const user = new user_1.User((0, uuid_1.v4)(), 'Anthony', 'Sargeant');
        const address = new address_1.Address('Leeds', 'West Yorkshire', 'LS1 1UR');
        user.addresses.add(address);
        expect(user.addresses).not.toBeEmpty();
        expect(user.addresses).toContainEqual(address);
    });
    it('should add a contact to a User object', () => {
        const user = new user_1.User((0, uuid_1.v4)(), 'Anthony', 'Sargeant');
        const contact = new contact_1.Contact('EMAIL', 'tom.sawyer@test.com');
        user.contacts.add(contact);
        expect(user.contacts).not.toBeEmpty();
        expect(user.contacts).toContainEqual(contact);
    });
});
//# sourceMappingURL=user.spec.js.map