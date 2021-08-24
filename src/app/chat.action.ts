import { createAction, props } from '@ngrx/store';
import { chatActionState } from './app.state';

/* This action is for adding to the store in the format
 as [{id:1,message:['hello','hi']},{id:2,message:['hello','hi']}]
*/
export const addChat = createAction(
  '[Chat Component] AddChat',
  props<{ messageData: chatActionState[] }>()
);
