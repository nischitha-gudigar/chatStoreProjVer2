import { createReducer, on } from '@ngrx/store';
import { chatActionState } from '../app.state';
import { addChatOnSave } from './chat.action';

const initialStateOnSave: chatActionState[] = [];
export const chatSaveReducer = createReducer(
  initialStateOnSave,
  on(addChatOnSave, (state: chatActionState[], messageOnSave) => {
    return {
      ...state,
      ...messageOnSave.messageData
    };
  })
);
