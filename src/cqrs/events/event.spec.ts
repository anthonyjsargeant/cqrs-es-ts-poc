import { UserAddressAddedEvent } from './user-address-added-event';
import { UserAddressRemovedEvent } from './user-address-removed-event';
import { UserContactAddedEvent } from './user-contact-added-event';
import { UserContactRemovedEvent } from './user-contact-removed-event copy';

describe('Events are created correctly', () => {
  it('should create UserAddressAddedEvent', () => {
    const userAddressAddedEvent = new UserAddressAddedEvent(
      'Leeds',
      'West Yorkshire',
      'LS1 1UR'
    );

    expect(userAddressAddedEvent.city).toStrictEqual('Leeds');
    expect(userAddressAddedEvent.county).toStrictEqual('West Yorkshire');
    expect(userAddressAddedEvent.postcode).toStrictEqual('LS1 1UR');
    expect(userAddressAddedEvent.id).toBeTruthy();
    expect(userAddressAddedEvent.created).toBeTruthy();
  });

  it('should create UserAddressRemovedEvent', () => {
    const userAddressRemovedEvent = new UserAddressRemovedEvent(
      'Leeds',
      'West Yorkshire',
      'LS1 1UR'
    );

    expect(userAddressRemovedEvent.city).toStrictEqual('Leeds');
    expect(userAddressRemovedEvent.county).toStrictEqual('West Yorkshire');
    expect(userAddressRemovedEvent.postcode).toStrictEqual('LS1 1UR');
    expect(userAddressRemovedEvent.id).toBeTruthy();
    expect(userAddressRemovedEvent.created).toBeTruthy();
  });

  it('should create UserContactAddedEvent', () => {
    const userContactAddedEvent = new UserContactAddedEvent(
      'EMAIL',
      'tom.sawyer@test.com',
    );

    expect(userContactAddedEvent.contactType).toStrictEqual('EMAIL');
    expect(userContactAddedEvent.contactDetails).toStrictEqual('tom.sawyer@test.com');
    expect(userContactAddedEvent.id).toBeTruthy();
    expect(userContactAddedEvent.created).toBeTruthy();
  });

  it('should create UserContactRemovedEvent', () => {
    const userContactRemovedEvent = new UserContactRemovedEvent(
      'EMAIL',
      'tom.sawyer@test.com',
    );

    expect(userContactRemovedEvent.contactType).toStrictEqual('EMAIL');
    expect(userContactRemovedEvent.contactDetails).toStrictEqual('tom.sawyer@test.com');
    expect(userContactRemovedEvent.id).toBeTruthy();
    expect(userContactRemovedEvent.created).toBeTruthy();
  });
});
