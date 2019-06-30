"use strict";

import flashMessages, * as fromFlashMessages from './flash-messages';
import { combineReducers } from 'redux';

export default combineReducers({
  flashMessages,
});

export const getFlashMessages = (state) => fromFlashMessages.getMessages(state.flashMessages);
