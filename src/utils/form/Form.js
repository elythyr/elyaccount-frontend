"use strict";

import isCallable from 'is-callable';
import isPromise from 'is-promise';
import ValidationError from './ValidationError';
import Validator from 'validatorjs';

const DEFAULT_STATE = {
  fields: [],
  values: {},
  rules: {},
  errors: {},
  isValid: null,
  isSubmitting: false,
  wasSuccessful: null,
  errorMessage: null,
};

export default class Form  {
  constructor(tagInstance, onSubmit, initialValues = {}) {
    this._state = DEFAULT_STATE;
    this._tag = tagInstance;
    this.rules = {};
    this.onSubmit = onSubmit;

    for (const fieldName in initialValues) {
      this
        .addField(fieldName)
        .setFieldValue(fieldName, initialValues[fieldName], false);

      this._defineFieldProperties(fieldName);
    }
  }

  addField(name) {
    if (this.fields.includes(name)) {
      return this;
    }

    return this._setState({
      fields: [ ...this.fields, name ],
    }, false);
  }

  addFields(names) {
    for (const name of names) {
      this.addField(name);
    }

    return this;
  }

  get fields() {
    return this._state.fields;
  }

  get values() {
    return this._state.values;
  }

  getFieldValue(fieldName) {
    return this.values[fieldName];
  }

  setFieldValue(fieldName, value, shouldUpdate = true) {
    if (!this.fields.includes(fieldName)) {
      throw new Error(`The field named "${fieldName}" does not exist.`);
    }

    return this._setState({
      values: { ...this.values, [fieldName]: value }
    }, shouldUpdate);
  }

  _defineFieldProperties(fieldName) {
    Object.defineProperty(this, fieldName, {
      get: () => this.getFieldValue(fieldName),
      set: (value) => this.setFieldValue(fieldName, value),
    });
  }

  set rules(rules) {
    this._rules = rules;
  }

  getError(fieldName) {
    if (!this._state.errors[fieldName]) {
      return null;
    }

    return this._state.errors[fieldName][0];
  }

  get isValid() {
    return this._state.isValid;
  }

  get isSubmitting() {
    return this._state.isSubmitting;
  }

  set onSubmit(onSubmit) {
    if (!isCallable(onSubmit)) {
      throw new Error('The "onSubmit" property must be callable.');
    }

    this._onSubmit = onSubmit;
  }

  get onSubmit() {
    return this._onSubmit;
  }

  _setState(newState, shouldUpdate = true) {
    this._state = { ...this._state, ...newState };

    shouldUpdate && this._tag.update();

    return this;
  }

  startSubmit() {
    return this._setState({ isSubmitting: true });
  }

  setSuccess() {
    return this._setState({ isSubmitting: false, wasSuccessful: true });
  }

  setFailure(message = 'Something went wrong!') {
    return this._setState({
      isSubmitting: false,
      wasSuccessful: true,
      errorMessage: message
    });
  }

  setValid() {
    return this._setState({ isValid: true });
  }

  setInvalid(errors) {
    return this._setState({ isValid: false, errors });
  }

  resetValidation() {
    return this._setState({ isValid: null, errors: {} });
  }

  validate() {
    const validator = new Validator(this.values, this._rules);

    this.resetValidation();

    return new Promise((resolve, reject) => {
      if (validator.passes()) {
        return resolve();
      }

      return reject(validator.errors.errors);
    });
  }

  _handleSubmition() {
    let result = null;

    try {
      // TODO handle validation
      result = this.onSubmit.call(null, this.values);
    } catch (error) {
      this.setFailure(error.message);
    }

    if (!isPromise(result)) {
      this.setSuccess();

      return result;
    }

    this.startSubmit();

    return result.then((response) => {
      this.setSuccess();

      return response;
    }).catch((error) => {
      this.setFailure(error.message);

      return Promise.reject(error);
    })
    .then(() => console.log(this._state))
    ;
  }

  submit(event, shouldPreventUpdate = true) {
    shouldPreventUpdate && event.preventDefault();

    return this.validate().then(
      () => this.setValid(),
      (errors) => {
        this.setInvalid(errors);

        throw new ValidationError('The form is invalid.');
      }
    ).then(() => this._handleSubmition());
  }
}
