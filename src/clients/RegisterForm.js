"use strict";

import isCallable from 'is-callable';
import isPromise from 'is-promise';
import Form from 'src/utils/form';
import { register } from './api';

export default class RegisterForm extends Form {
  constructor(tagInstance, initialValues = {}) {
    super(
      tagInstance,
      (values) => register(values.email, values.firstName, values.lastName),
      initialValues
   );

    this.addFields([ 'email', 'firstName', 'lastName' ]);

    this.rules = {
      email: 'required|email',
      firstName: 'required|min:3',
      lastName: 'required|min:3',
    };
  }
}
