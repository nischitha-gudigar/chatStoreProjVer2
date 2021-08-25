import { createReducer, on } from '@ngrx/store';
import { chatActionState } from './app.state';
import { addChat, addChatOnSave } from './chat.action';

const initialStateOnload: chatActionState[] = [];
export const chatLoadReducer = createReducer(
  initialStateOnload,
  on(addChat, (state: chatActionState[], message) => {
    return {
      ...state,
      ...message.messageData
    };
  })
);

const initialStateOnSave: chatActionState[] = [];
export const chatSaveReducer = createReducer(
  initialStateOnSave,
  on(addChatOnSave, (state: chatActionState[], message) => {
    return {
      ...state,
      ...message.messageData
    };
  })
);
