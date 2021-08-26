import { createAction, props } from '@ngrx/store';
import { ChatData } from '../chat-data';

/* This action is for adding to the store in the format
 as [{id:1,message:['hello','hi'}]
*/
export const addChatOnSave = createAction(
  '[Chat Component] SAVE-CHAT',
  props<{ messageData: ChatData[] }>()
);
