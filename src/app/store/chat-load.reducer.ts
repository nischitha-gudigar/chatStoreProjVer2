import { createReducer, on } from '@ngrx/store';
import { ChatData } from '../chat-data';
import { addChatOnLoad } from './chatLoad.action';

const initialStateOnload: ChatData[] = [];
export const chatLoadReducer = createReducer(
  initialStateOnload,
  on(addChatOnLoad, (state: ChatData[], messageOnLoad) => {
    return {
      ...state,
      ...messageOnLoad.messageData
    };
  })
);
