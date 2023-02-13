import { Address } from './address';
import { Contact } from './contact';
export declare class User {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
    contacts: Set<Contact>;
    addresses: Set<Address>;
    constructor(userId: string, firstName: string, lastName: string);
}
