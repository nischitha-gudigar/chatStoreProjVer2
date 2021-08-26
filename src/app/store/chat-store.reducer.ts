import { createReducer, on } from '@ngrx/store';
import { chatActionState } from '../app.state';
import { addChatOnSave } from './chat-store.action';

const initialStateOnSave: chatActionState[] = [];
export const chatSaveReducer = createReducer(
  initialStateOnSave,
  on(addChatOnSave, (state: chatActionState[], messageOnSave) => {
    state = [...state];
    state.concat(messageOnSave.messageData);
    console.log(state);
    return {
      ...state
    };
  })
);
