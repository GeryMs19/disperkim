<nav id="navbar" class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
    <a href="" class="navbar-brand p-0">
        <div class="d-flex gap-2" style="color:ghostwhite"><img src="{{ asset('img/logo-perkim.png') }}">
            <div class="d-inline-block">
                <h4 class="m-0" id="company_name" style="color:ghostwhite">Portal DISPERKIM </h4>
                <p class="m-0 fs-5" id="company_name_long" style="color:ghostwhite">Dinas Perumahan dan Permukiman Kota Bandar Lampung </p>
            </div>
            {{-- <img id="logo_white" class="d-inline-block" src="{{ asset('img/logo-klikprputih.png') }}">
            <img id="logo_black" class="d-none" src="{{ asset('img/logo-klikpritem.PNG') }}" alt=""> --}}
        </div>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="fa fa-bars"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto py-0">
            <a href="index.html" class="nav-item nav-link active">Beranda</a>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link" data-bs-toggle="dropdown">
                    <span class="dropdown-toggle">Tentang</span>
                </a>
                <div class="dropdown-menu m-0">
                    <a href="feature.html" class="dropdown-item">Profil</a>
                    <a href="team.html" class="dropdown-item">Sejarah</a>
                    <a href="testimonial.html" class="dropdown-item">Visi Misi</a>
                    <a href="offer.html" class="dropdown-item">Dasar Hukum</a>
                    <a href="FAQ.html" class="dropdown-item">FAQs</a>
                    <a href="404.html" class="dropdown-item">404 Page</a>
                </div>
            </div>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link" data-bs-toggle="dropdown">
                    <span class="dropdown-toggle">Layanan</span>
                </a>
                <div class="dropdown-menu m-0">
                    <a href="feature.html" class="dropdown-item">Pengaduan Tata Ruang</a>
                    <a href="team.html" class="dropdown-item">Pelayanan Perizinan Tata Ruang</a>
                    <a href="team.html" class="dropdown-item">Riwayat</a>
                </div>
            </div>
            <a href="{{ route('pola-ruang') }}" class="nav-item nav-link">
                <img id="logo_white" class="d-inline-block" style="height: 20px;" src="{{ asset('img/logo-klikprputih.png') }}">
                <img id="logo_black" class="d-none" style="height: 20px;" src="{{ asset('img/logo-klikpritem.PNG') }}">
            </a>
            <a href="#berita" class="nav-item nav-link">Berita</a>

            <a href="#footer" class="nav-item nav-link">Contact</a>
        </div>
        <a href="#" class="btn btn-primary rounded-pill py-2 px-4 my-3 my-lg-0 flex-shrink-0">Login</a>
    </div>
</nav>


<script>
    var logoWhite = document.querySelector('#logo_white')
    var logoBlack = document.querySelector('#logo_black')
    var navbar = document.querySelector('#navbar');

    var company_name_long = document.querySelector('#company_name_long')
    var company_name = document.querySelector('#company_name')

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            logoBlack.classList.add('d-inline-block')
            logoBlack.classList.remove('d-none')

            logoWhite.classList.remove('d-inline-block')
            logoWhite.classList.add('d-none')

            company_name.style.color= 'black'
            company_name_long.style.color= 'black'
        } else {
            console.log('navbar open');
            logoWhite.classList.add('d-inline-block')
            logoWhite.classList.remove('d-none')


            logoBlack.classList.remove('d-inline-block')
            logoBlack.classList.add('d-none')

             company_name.style.color= 'ghostwhite'
            company_name_long.style.color= 'ghostwhite'
        }
    });
</script>
