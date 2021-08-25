import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { chatActionState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState[] = [];

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state: chatActionState[], message) => {
    console.log(Object.keys(state).length);
    console.log(typeof Object.keys(state).length);
    if (Object.keys(state).length === 0) {
      console.log('in if block');
      return {
        ...state,
        ...message.messageData
      };
    } else {
      Object.keys(state).map(key => {
        console.log(state[key].chatId);
        console.log(message.messageData['chatId']);
        if (state[key].chatId == message.messageData['chatId']) {
          console.log(key);
        }
      });
    }
  })
);

export function chatReducer(
  state: chatActionState[],
  action: Action
): chatActionState[] {
  return _chatReducer(state, action);
}
