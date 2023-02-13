"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, firstName, lastName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contacts = new Set();
        this.addresses = new Set();
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map