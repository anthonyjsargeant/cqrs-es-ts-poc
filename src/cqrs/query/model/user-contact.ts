import { Contact } from '../../domain/contact';

export class UserContact {
  contactByType: Map<string, Contact[]> = new Map();
}
