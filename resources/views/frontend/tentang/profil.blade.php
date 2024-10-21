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
                                    <h1 class="display-4 text-uppercase text-white mb-4"> Profil</h1>
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
                <h3 class=" fs-1 fw-bold uppercase">Profil</h3>
            </div>
            <div class="card-body row g-5 align-items-center">
                <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti minima a libero esse neque corporis fuga consectetur accusantium suscipit repellendus saepe quod distinctio minus, doloribus provident ipsam. Consectetur sed iure natus ullam blanditiis vel aliquam deserunt ipsum? Pariatur aut cupiditate, aliquam, dolor doloribus quas nesciunt fuga esse, nulla alias aperiam odio sit ducimus accusantium sequi deserunt ipsum? Exercitationem adipisci a repellendus alias iure amet soluta accusamus autem cupiditate repellat aliquam perferendis magnam fugit aut, minima pariatur! Odio quam, asperiores veritatis, incidunt sequi consequatur error quo quod consectetur architecto commodi ratione fuga dignissimos natus distinctio. Consequuntur beatae obcaecati exercitationem sit in.</p>
            </div>
        </div>
    </section>
@endsection
