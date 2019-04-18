"use strict";

import { postJson } from 'utils/http.js';
import { apiUrls } from './routes.js';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const register = (email, firstName, lastName) => {
  return sleep(500).then(() =>
    postJson(apiUrls.clients, {
      body: JSON.stringify({ email, firstName, lastName }),
    })
  );
};
