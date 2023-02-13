import { Event } from './event';
export declare class UserCreatedEvent extends Event {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    constructor(id: string, firstName: string, lastName: string);
}
