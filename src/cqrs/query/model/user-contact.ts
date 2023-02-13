import { Contact } from '../../domain/contact';

export class UserContact {
  contactByType: Map<string, Set<Contact>> = new Map();
}
