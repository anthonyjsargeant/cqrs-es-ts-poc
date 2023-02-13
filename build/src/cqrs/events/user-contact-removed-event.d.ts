import { Event } from './event';
export declare class UserContactRemovedEvent extends Event {
    readonly contactType: string;
    readonly contactDetails: string;
    constructor(contactType: string, contactDetails: string);
}
