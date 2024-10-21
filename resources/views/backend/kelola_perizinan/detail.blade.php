@extends('backend.layouts.app')

@section('title') @lang("Kelola_Pengaduan") @endsection

@section('breadcrumbs')
<x-backend-breadcrumbs />
@endsection

@section('content')
<div class="content-wrapper pt-3">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Detail Pengaduan</h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mb-5">
            <div class="card-body">
              <div class="">
                <div class="mb-3">
                  <div class="form-group mb-3">
                      <label for="nama_lengkap" class="form-label">Nama Lengkap</label>
                      <input type="text" class="form-control" name="nama_lengkap" id="nama_lengkap" value="" readonly>
                  </div>
                  <div class="form-group mb-3">
                      <label for="nik" class="form-label">NIK</label>
                      <input type="text" class="form-control" name="nik" id="nik" value="" readonly>
                  </div>
                  <div class="form-group mb-3">
                      <label for="alamat" class="form-label">Alamat Pengaduan</label>
                      <input type="text" class="form-control" name="alamat" id="alamat" value="" readonly>
                    </div>
                    <div class="form-group mb-3">
                        <label for="tanggal_penerimaan" class="form-label">Deskripsi Pengaduan</label>
                        <input type="text" class="form-control" name="tanggal_penerimaan" id="tanggal_penerimaan" value="" readonly>
                    </div>
                  <div class="form-group mb-3">
                      <label for="status" class="form-label">Status</label>
                      <input type="text" class="form-control" name="status" id="status" value="" readonly>
                  </div>
                  <div class="form-group mb-3">
                      <label for="peninjau" class="form-label">Peninjau</label>
                      <input type="text" class="form-control" name="peninjau" id="peninjau" value="" readonly>
                  </div>
      <!-- /.container-fluid -->
    </section>
@endsection
