<register-form>
  <alert type="{ message.type }" if={ message }>
    { parent.message.text }
  </alert>

  <form name="register_client"
    novalidate="novalidate"
    onsubmit={ handleSubmit }>

    <!-- if use "onchange" then the event is fired from the tag itself, so don't use real event names as props names -->
    <form-input ref="email"
      label="Email"
      name="email"
      type="email"
      value="{ form.email }"
      on-change={ onChange }
      show-validation={ false === form.isValid }
      error-message="{ form.getError('email') }"
      required=true
      autofocus=true
    ></form-input>

    <div class="d-flex">
      <form-input ref="firstName"
        class="flex-fill pr-2"
        label="First name"
        name="firstName"
        value="{ form.firstName }"
        show-validation={ false === form.isValid }
        error-message="{ form.getError('firstName') }"
        on-change={ onChange }
        required=true
      ></form-input>

      <form-input ref="lastName"
        class="flex-fill pl-2"
        label="Last Name"
        name="lastName"
        value="{ form.lastName }"
        show-validation={ false === form.isValid }
        error-message="{ form.getError('lastName') }"
        on-change={ onChange }
        required=true
      ></form-input>
    </div>

    <div class="form-group">
      <button
        class="btn btn-primary"
        type="submit"
        disabled={ form.isSubmitting }
      >
        Register
        <spinner show={ form.isSubmitting }></spinner>
      </button>
    </div>
  </form>

  <script>
    import 'tags/form/input.tag';
    import 'tags/alert.tag';
    import 'tags/spinner.tag';
    import RegisterForm from 'src/clients/RegisterForm';
    import { ValidationError } from 'src/utils/form';

    this.form = new RegisterForm(this);

    // TODO use redux app state to handle messages and print them under the header
    this.handleSubmit = (e) => {
      this.form.submit(e)
        .then((response) => {
          this.update({ message: { type: 'success', text: 'Registration completed!' } });

          return response;
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            this.update({ message: { type: 'danger', text: error.message} });
          } else {
            this.update({ message: { type: 'danger', text: 'An error occured.' } });
          }
        });
    };

    this.onChange = (e) => this.form.setFieldValue(e.target.name, e.target.value, false);
  </script>
</register-form>
