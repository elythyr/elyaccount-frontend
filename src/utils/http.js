"use strict";

export class HttpResponseError extends Error {
  constructor(response) {
    super(response.status +' - '+ response.statusText);

    this._response = response;
  }

  get headers() {
    return this._response.headers;
  }

  get ok() {
    return this._response.ok;
  }

  get redirected() {
    return this._response.redirected;
  }

  get status() {
    return this._response.status;
  }

  get statusText() {
    return this._response.statusText;
  }

  get type() {
    return this._response.type;
  }

  get url() {
    return this._response.url;
  }

  get body() {
    return this._response.body;
  }

  get bodyUsed() {
    return this._response.bodyUsed;
  }

  clone() {
    return this._response.clone();
  }

  error() {
    return this._response.error();
  }

  redirect() {
    return this._response.redirect();
  }

  arrayBuffer() {
    return this._response.arrayBuffer();
  }

  blob() {
    return this._response.blob();
  }

  formData() {
    return this._response.formData();
  }

  json() {
    return this._response.json();
  }

  text() {
    return this._response.text();
  }
}

export const jsonFetch = (url, options) => {
  return fetch(url, {
    method: options.method || 'GET',
    mode: options.mode || 'cors',
    ...options,
    // Trick to simplify the "deep merge", this "headers" key will replace
    // the one that might be in options
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then((response) => {
    if (!response.ok) {
      // API errors with the same interface as the Response object
      throw new HttpResponseError(response);
    }

    return response.json();
  }, (error) => {
    // Errors rejected by fetch()
    throw new Error(error);
  });
}

export const getJson = (url, options) => {
  return jsonFetch(url, {method: 'GET', ...options});
}

export const postJson = (url, options) => {
  return jsonFetch(url, {method: 'POST', ...options});
}
