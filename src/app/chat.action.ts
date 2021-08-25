import { createAction, props } from '@ngrx/store';
import { chatActionState } from './app.state';

/* Initial load of messages [{},{},{}]*/
export const addChat = createAction(
  '[Chat Component] LOAD-CHAT',
  props<{ messageData: chatActionState[] }>()
);

/* This action is for adding to the store in the format
 as [{id:1,message:['hello','hi'}]
*/
export const addChatOnSave = createAction(
  '[Chat Component] SAVE-CHAT',
  props<{ messageData: chatActionState[] }>()
);
