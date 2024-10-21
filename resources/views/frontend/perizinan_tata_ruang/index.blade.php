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
                                    <h1 class="display-4 text-uppercase text-white mb-4">Perizinan tata Ruang</h1>
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
            <div class="text-center wow fadeInUp">
                <h3 class=" fs-1 fw-bold uppercase">Perijinan Tata Ruang</h3>
            </div>
            <div class="row g-5 align-items-center">
                <div class="col-xl-12 wow fadeInUp" data-wow-delay="0.2s">
                    <form action="" method="POST" class="row  justify-content-between">
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="name" class="fs-5 fw-semibold text-dark">Nama Lengkap<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="name" id="name" placeholder="Nama Lengkap">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="nik" class="fs-5 fw-semibold text-dark">NIK<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="nik" id="nik" placeholder="Nomor Induk Kependudukan">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="no_tel" class="fs-5 fw-semibold text-dark">No Telpon<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="no_tel" id="no_tel" placeholder="Nomor Telpon aktif">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="nib" class="fs-5 fw-semibold text-dark">NIB<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="nib" id="nib" placeholder="Nomor Induk Berusahan">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="kep" class="fs-5 fw-semibold text-dark">Keperluan<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="kep" id="kep" placeholder="Keperluan Perizinan">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Alamat Perijinan<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" placeholder="Alamat Perizinan">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="alamat-perizinan" class="fs-5 fw-semibold text-dark">Kebutuhan Perijinan/tahun<span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" name="alamat-perizinan" id="alamat-perizinan" placeholder="Alamat Perizinan">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 py-3 px-3">
                            <div class="mb-3 form-group">
                                <label for="foto_perizinan" class="fs-5 fw-semibold text-dark">Dokumentasi Perizinan (Jika Ada)<span class="text-danger">*</span></label>
                                <input type="file" class="form-control form-control-lg" name="foto_perizinan" id="foto_perizinan" placeholder="Dokumentasi Perizinan">
                            </div>
                        </div>

                        <div class="text-center">
                            <button class="btn bg-primary px-5 text-white btn-lg">SUBMIT</button>
                        </div>
                    </form>

                </div>

            </div>
    </section>
@endsection
