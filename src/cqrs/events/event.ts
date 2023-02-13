import { v4 as uuidv4 } from 'uuid';

export abstract class Event {
  id = uuidv4();
  created = new Date();
}
