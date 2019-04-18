<navbar>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">ElyAccount</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav mr-auto">

                <li class="nav-item dropdown dropdown-dark">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="navbarAccountsDropdown"
                       role="button"
                       data-toggle="dropdown"
                       aria-haspopup="true"
                       aria-expanded="false">
                        Accounts
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarAccountsDropdown">
                        <a class="dropdown-item" href="#">New</a>
                        <a class="dropdown-item" href="#">List all</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">An account</a>
                        <a class="dropdown-item" href="#">Another account</a>
                    </div>
                </li>

                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>


                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>

            </ul>

            <ul class="navbar-nav">
                <!-- {% if not is_granted('ROLE_USER') %} -->
                    <li class="nav-item">
                        <a class="nav-link" href="#">Register</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Log In</a>
                    </li>
                <!-- {% else %} -->
                <!--     <li class="nav-item dropdown dropdown-dark"> -->
                <!--         <a class="nav-link dropdown-toggle" -->
                <!--            href="#" -->
                <!--            id="navbarUsesrDropdown" -->
                <!--            role="button" -->
                <!--            data-toggle="dropdown" -->
                <!--            aria-haspopup="true" -->
                <!--            aria-expanded="false"> -->
                <!--             { userName } -->
                <!--         </a> -->

                <!--         <div class="dropdown-menu" aria-labelledby="navbarUsesrDropdown"> -->
                <!--             <a class="dropdown-item disabled" href="#">Profile</a> -->
                <!--             <div class="dropdown-divider"></div> -->
                <!--             <a class="dropdown-item" href="#">Log out</a> -->
                <!--         </div> -->
                <!--     </li> -->
                <!-- {% endif %} -->
            </ul>

        </div>
    </nav>
</navbar>
