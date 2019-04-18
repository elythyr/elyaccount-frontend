<app>
  <div class="container-fluid sticky-top mb-4">
    <div class="row d-flex flex-column">
      <navbar></navbar>
      <!-- {% include '_flash_messages.html.twig' %} -->
    </div>
  </div>

  <main class="container-fluid">
    <div class="row">
      <div class="col-md-2">
          <aside_menu></aside_menu>
      </div>

      <section class="col-md-10" id="main-section"></section>
    </div>
  </main>

  <script>
    import 'styles/app.scss';

    import './navbar.tag';
    import './aside_menu.tag';

    // TODO implements routing
    import './clients/register-client.tag';
    this.on('mount', () => riot.mount('#main-section', 'register-client'));
  </script>
</app>
