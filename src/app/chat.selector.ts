import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyAppState } from './app.state';
const getMessage = createFeatureSelector<MyAppState>('messages');

export const selectMsg = createSelector(
  getMessage,
  state => state.messages
);
