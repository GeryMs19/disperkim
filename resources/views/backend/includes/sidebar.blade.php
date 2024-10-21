<div class="sidebar sidebar-dark sidebar-fixed" style="background-color: #0A517D;" id="sidebar">
    <div class="sidebar-brand d-none d-md-flex">
        <a href="{{route('backend.dashboard')}}">
            <div class=" d-flex gap-1 align-items-center">
                <img class="sidebar-brand-full" src="{{asset('img/logo-perkim.png')}}" height="46" alt="{{ app_name() }}">
                <p class="text-white text-uppercase fw-bold m-0">Disperkim</p>
            </div>
            <img class="sidebar-brand-narrow" src="{{asset('img/logo-perkim.png')}}" height="46" alt="{{ app_name() }}">
        </a>
    </div>

        <!-- Sidebar Menu -->
        <ul class="sidebar-nav">
            <li class="nav-item">
              <a href="{{ route('ini-dashboard') }}" class="nav-link py-0 aktif text-white">
                <i class="nav-icon fas fa-home"></i>
                <p class="pt-3">
                  Dashboard
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('ini-dashboard') }}" class="nav-link py-0 aktif text-white">
                <i class="nav-icon fa-solid fa-bell-concierge"></i>
                <p class="pt-3">
                  Validasi Pengaduan
                </p>
              </a>
            </li>
            <li class="nav-item">
                <a href="../validasi_pendaftaran/index.html" class="nav-link py-0 text-white">
                    <i class="nav-icon fa-solid fa-folder-tree"></i>
                    <p class="pt-3">
                        Kelola Pengaduan
                    </p>
                </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('ini-dashboard') }}" class="nav-link py-0 aktif text-white">
                <i class="nav-icon fa-solid fa-check"></i>
                <p class="pt-3">
                  Validasi Perizinan
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="../data_yudisium/index.html" class="nav-link py-0 text-white">
                <i class=" nav-icon fa-solid fa-building"></i>
                <p class="pt-3">
                 Kelola Perizinan
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="../periode/index.html" class="nav-link py-0 text-white">
                <i class="nav-icon fa-solid fa-location-dot"></i>
                <p class="pt-3">
                  Pola Ruang
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="/" class="nav-link py-0 text-white">
                <i class="nav-icon fas fa-sign-out-alt"></i>
                <p class="pt-3">
                  Logout
                </p>
              </a>
            </li>
          </ul>
        <!-- /.sidebar-menu -->

    <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
</div>
