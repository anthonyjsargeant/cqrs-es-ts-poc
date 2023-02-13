import { v4 as uuidv4 } from 'uuid';

export abstract class Event {
  id: string = uuidv4();
  created: Date = new Date();
  type = 'Event';
}
