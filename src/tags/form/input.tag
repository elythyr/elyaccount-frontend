<form-input>
  <div class="form-group">
    <label if={ opts.label || opts.errorMessage }
      for="{ id }"
      class="{ required: opts.required }"
    >
      { opts.label }

      <div if={ opts.errorMessage }
         class="invalid-feedback d-block">
        <span class="form-error-icon badge badge-danger text-uppercase">Error</span>
        <span class="form-error-message">{ opts.errorMessage }</span>
      </div>
    </label>

    <input
      ref="input"
      id="{ id }"
      class="form-control { opts.class } { validationClass() }"
      type="{ opts.type || 'text' }"
      name="{ opts.name }"
      value="{ opts.riotValue }"
      oninput={ opts.onChange ? opts.onChange.bind(this) : false }
      onfocus={ opts.onFocus ? opts.onFocus.bind(this) : false }
      onblur={ opts.onBlur ? opts.onBlur.bind(this) : false }
      required={ opts.required }
      autofocus={ opts.autofocus }
    />
  </div>

  <script>
    import uuid from 'uuid/v4';

    this.id = this.opts.id || uuid();

    this.validationClass = () => {
      if (!this.opts.showValidation) {
        return '';
      }

      return this.opts.errorMessage ? 'is-invalid' : 'is-valid';
    }
  </script>
</form-input>
