<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Card - CoreUI</title>
    <link href="https://cdn.jsdelivr.net/npm/@coreui/coreui@4.0.0/dist/css/coreui.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            position: relative;
            min-height: 100vh;
            overflow-y: auto; /* Enable vertical scroll */
        }

        /* Background Image */
        .background-blur {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('{{ asset('img/map4.png') }}');
            background-size: cover;
            background-repeat: no-repeat;
            filter: blur(8px); /* Add blur effect */
            z-index: -1; /* Make sure it's behind the card */
        }

        /* Container for Login Card */
        .login-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px; /* To add some space for small screens */
            position: relative;
            z-index: 1; /* Ensure login form is on top of background */
        }

        /* Login Card Style */
        .login-card {
            width: 100%;
            max-width: 400px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
            background-color: rgba(255, 255, 255, 1); /* Slight transparency */
        }

        .login-card .card-body {
            padding: 2rem;
        }

        .login-card .form-control {
            border-radius: 10px;
        }

        .login-card .btn-primary {
            border-radius: 10px;
        }

        /* Button Style */
        .btn-primary {
            background-color: #0A517D !important;
        }

        /* Scrollable on small screens */ {
            .login-container {
                align-items: flex-start;
            }
            .login-card {
                max-height: 90vh;
                overflow-y: auto;
            }
        }

        /* Additional responsiveness for smaller devices */
        @media (max-width: 576px) {
            .login-container {
                padding: 0 10px;
            }
        }
    </style>
</head>
<body>

    <!-- Background Image with Blur Effect -->
    <div class="background-blur"></div>

    <!-- Login Container -->
    <div class="container login-container">
        <div class="card login-card">
            <div class="row d-flex justify-content-center align-items-center pt-4 px-4 pb-2">
                <div class="col-md-3 text-center">
                    <img class="p-2" src="{{ asset('img/logo-perkim.png') }}" alt="Logo" style="width: 60px;">
                </div>
                <div class="col-md-6 text-center">
                    <b><p class="m-0 p-0 fs-5">REGISTER PAGE</p></b>
                </div>
                <div class="col-md-3 text-center">
                    <img class="p-2" src="{{ asset('img/logo-klikpr.png') }}" alt="Logo" style="width: 60px;">
                </div>
                <p class="text-center pt-3">Selamat Datang di website DISPERKIM<br>Silahkan daftar untuk masuk pada sistem</p>
            </div>
            <div class="card-body pt-2">
                <form>
                    <div class="mb-3">
                        <label for="nama_lengkap" class="form-label">Nama Lengkap </label>
                        <input type="text" class="form-control" id="nama_lengkap" placeholder="Enter your Name">
                    </div>
                    <div class="mb-3">
                        <label for="nik" class="form-label"> NIK </label>
                        <input type="text" class="form-control" id="nik" placeholder="Enter your NIK">
                    </div>
                    <div class="mb-3">
                        <label for="no_telp" class="form-label"> No HP/Telp Aktif </label>
                        <input type="text" class="form-control" id="no_telp" placeholder="Enter your Phone Number">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter your email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter your password">
                    </div>
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label"> Confirm Password</label>
                        <input type="password" class="form-control" id="confirm_password" placeholder="Enter Again your password">
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="acceptapble">
                        <label class="form-check-label" for="acceptapble">Saya telah mengisi data di atas dengan benar</label>
                    </div>
                    <div class="d-grid gap-2 mb-3">
                        <button type="submit" class="btn btn-primary text-white">DAFTAR <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                    </div>
                    <div class="text-center">
                        <p>Sudah Punya Akun? <a href="#" class="text-active">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@coreui/coreui@4.0.0/dist/js/coreui.bundle.min.js"></script>
</body>
</html>
