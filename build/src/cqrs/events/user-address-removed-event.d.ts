import { Event } from './event';
export declare class UserAddressRemovedEvent extends Event {
    readonly city: string;
    readonly county: string;
    readonly postcode: string;
    constructor(city: string, county: string, postcode: string);
}
