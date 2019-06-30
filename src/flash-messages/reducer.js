"use strict";

import { ADD, REMOVE } from './actionsTypes';
import uuid from 'uuid/v4';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  const { type, id = uuid(), level, text, options = {} } = action;

  if (ADD === type) {
    return [ ...state, { id, level, text, options }]
  } else if (REMOVE === type) {
    return state.filter((alert) => id !== alert.id);
  }

  return state;
};

export const getMessages = (state) => state;
