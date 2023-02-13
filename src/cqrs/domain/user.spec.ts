import { User } from './user';
import { v4 as uuidv4 } from 'uuid';
import 'jest-extended';
import { Address } from './address';
import { Contact } from './contact';

describe('User Domain Object', () => { 
  it('should create a new User object', () => {
    const id: string = uuidv4();
    const user = new User(id, 'Anthony', 'Sargeant');

    expect(user.userId).toStrictEqual(id);
    expect(user.firstName).toStrictEqual('Anthony');
    expect(user.lastName).toStrictEqual('Sargeant');
    expect(user.addresses).toBeEmpty();
    expect(user.contacts).toBeEmpty();
  });

  it('should add an address to a User object', () => {
    const user = new User(uuidv4(), 'Anthony', 'Sargeant');
    const address = new Address('Leeds', 'West Yorkshire', 'LS1 1UR');

    user.addresses.add(address);

    expect(user.addresses).not.toBeEmpty();
    expect(user.addresses).toContainEqual(address);
  });

  it('should add a contact to a User object', () => {
    const user = new User(uuidv4(), 'Anthony', 'Sargeant');
    const contact = new Contact('EMAIL', 'tom.sawyer@test.com');

    user.contacts.add(contact);

    expect(user.contacts).not.toBeEmpty();
    expect(user.contacts).toContainEqual(contact);
  });
});