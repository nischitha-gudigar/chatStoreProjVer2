import { SenderData } from './sender';

export interface ChatData {
  id: number;
  sender: SenderData;
  content: string;
  read: boolean;
  date: string;
}
