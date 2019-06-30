"use strict";

import { ADD, REMOVE } from './actionsTypes';

export const addMessage = (text, level = 'info', options = {}) => ({
  type: ADD,
  text,
  level,
  options,
});

export const removeMessage = (id) => ({
  type: REMOVE,
  id,
})
