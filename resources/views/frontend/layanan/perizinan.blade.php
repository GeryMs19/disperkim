@extends('frontend.layouts.app')

@section('title')
    {{ app_name() }}
@endsection

@section('content')
    <section id="hero" class="container-fluid position-relative p-0">
        @include('frontend.layouts.navbar')

        <!-- Carousel Start -->
        <div class="header-carousel owl-carousel">
            <div class="header-carousel-item">
                <img src="{{ asset('img/balam.jpg') }}" class="img-fluid w-100" alt="Image">
                <div class="carousel-caption">
                    <div class="container">
                        <div class="row gy-0 gx-5">
                            <div class="col-lg-0 col-xl-5"></div>
                            <div class="col-xl-7 animated fadeInLeft">
                                <div class="text-sm-center text-md-end">
                                    <h4 class="text-uppercase fw-bold mb-4" style="color:#FFF">Welcome To DISPERKIM BANDAR
                                        LAMPUNG </h4>
                                    <h1 class="display-4 text-uppercase text-white mb-4"> Riwayat Perizinan tata Ruang</h1>
                                    <p class="mb-5 fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy...
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Carousel End -->
    </section>

    {{-- form --}}
    <section class="container about py-5">
        <div class="card">
            <div class=" text-center wow fadeInUp">
                <h3 class=" fs-1 fw-bold uppercase">Perizinan Tata Ruang</h3>
            </div>
            <div class="card-body row g-5 align-items-center">
                <div class="table-responsive">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">No</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Nomor Perizinan</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Nama</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    NIP</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Keperluan</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    ALamat Perizinan</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Status</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">1</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold">10 000</p>
                                </td>
                                <td>
                                    Geri Melia Suwanda
                                </td>
                                <td>
                                    20xxxxxxxxxx
                                </td>
                                <td>
                                    Usaha
                                </td>
                                <td>
                                    Bandar Lampung
                                </td>
                                <td>
                                    <span class="badge text-bg-warning">Menunggu</span>
                                </td>
                                <td class="align-middle">
                                    <button type="button"
                                        class="btn btn-transparent text-secondary font-weight-bold text-xs"
                                        data-bs-toggle="modal" data-bs-target="#modelEdit0">
                                        Detail
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="modelEdit0" tabindex="-1"
                                        aria-labelledby="modelEditLabel0" aria-hidden="true">
                                        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="modelEditLabel0">Detail Pengaduan</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form action="" method="POST" class="row  justify-content-between">
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="name" class="fs-5 fw-semibold text-dark">Nama Lengkap<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="name" id="name" value="Geri Melia Suwanda" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nik" class="fs-5 fw-semibold text-dark">NIK<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nik" id="nik" value="20xxxxxxxxxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="no_tel" class="fs-5 fw-semibold text-dark">No Telpon<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="no_tel" id="no_tel" value="08223423423" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nib" class="fs-5 fw-semibold text-dark">NIB<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nib" id="nib" value="20234241241xxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="kep" class="fs-5 fw-semibold text-dark">Keperluan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="kep" id="kep" value="Usaha" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Alamat Perijinan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="bandar Lampung" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Kebutuhan Perijinan/tahun<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="1/tahun" disabled>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close</button>
                                                    {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">1</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold">10 000</p>
                                </td>
                                <td>
                                    Geri Melia Suwanda
                                </td>
                                <td>
                                    20xxxxxxxxxx
                                </td>
                                <td>
                                    Usaha
                                </td>
                                <td>
                                    Bandar Lampung
                                </td>
                                <td>
                                    <span class="badge text-bg-danger">Ditolak</span>
                                </td>
                                <td class="align-middle">
                                    <button type="button"
                                        class="btn btn-transparent text-secondary font-weight-bold text-xs"
                                        data-bs-toggle="modal" data-bs-target="#modelEdit1">
                                        Detail
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="modelEdit1" tabindex="-1"
                                        aria-labelledby="modelEditLabel1" aria-hidden="true">
                                        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="modelEditLabel1">Detail Pengaduan</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form action="" method="POST" class="row  justify-content-between">
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="name" class="fs-5 fw-semibold text-dark">Nama Lengkap<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="name" id="name" value="Geri Melia Suwanda" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nik" class="fs-5 fw-semibold text-dark">NIK<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nik" id="nik" value="20xxxxxxxxxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="no_tel" class="fs-5 fw-semibold text-dark">No Telpon<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="no_tel" id="no_tel" value="08223423423" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nib" class="fs-5 fw-semibold text-dark">NIB<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nib" id="nib" value="20234241241xxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="kep" class="fs-5 fw-semibold text-dark">Keperluan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="kep" id="kep" value="Usaha" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Alamat Perijinan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="bandar Lampung" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Kebutuhan Perijinan/tahun<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="1/tahun" disabled>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close</button>
                                                    {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">1</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold">10 000</p>
                                </td>
                                <td>
                                    Geri Melia Suwanda
                                </td>
                                <td>
                                    20xxxxxxxxxx
                                </td>
                                <td>
                                    Usaha
                                </td>
                                <td>
                                    Bandar Lampung
                                </td>
                                <td>
                                    <span class="badge text-bg-success">Disetujui</span>
                                </td>
                                <td class="align-middle">
                                    <button type="button"
                                        class="btn btn-transparent text-secondary font-weight-bold text-xs"
                                        data-bs-toggle="modal" data-bs-target="#modelEdit2">
                                        Detail
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="modelEdit2" tabindex="-1"
                                        aria-labelledby="modelEditLabel2" aria-hidden="true">
                                        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="modelEditLabel2">Detail Pengaduan</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form action="" method="POST" class="row  justify-content-between">
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="name" class="fs-5 fw-semibold text-dark">Nama Lengkap<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="name" id="name" value="Geri Melia Suwanda" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nik" class="fs-5 fw-semibold text-dark">NIK<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nik" id="nik" value="20xxxxxxxxxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="no_tel" class="fs-5 fw-semibold text-dark">No Telpon<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="no_tel" id="no_tel" value="08223423423" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="nib" class="fs-5 fw-semibold text-dark">NIB<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="nib" id="nib" value="20234241241xxx" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="kep" class="fs-5 fw-semibold text-dark">Keperluan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="kep" id="kep" value="Usaha" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Alamat Perijinan<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="bandar Lampung" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                                                            <div class="mb-3 form-group">
                                                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Kebutuhan Perijinan/tahun<span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" value="1/tahun" disabled>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close</button>
                                                    {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </section>
@endsection
