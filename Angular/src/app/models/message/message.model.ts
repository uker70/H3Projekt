import { Staff } from '../staff/staff.model';

export class Message {
  id: number; // Auto increment primary key.
  sender: Staff; // Who sent the message.
  recipient: Staff; // Who the receiver of the message.
  message: string; // The actual message.
  markedAsRead: boolean; // Has the receiver read the message?
}