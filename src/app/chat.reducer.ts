import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { chatActionState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState[] = [];

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state: chatActionState[], message) => {
    return {
      ...state,
      ...message.messageData
    };
  })
);

export function chatReducer(state: chatActionState[], action: Action) {
  return _chatReducer(state, action);
}
