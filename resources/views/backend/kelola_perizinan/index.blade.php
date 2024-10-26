@extends('backend.layouts.app')

@section('title') @lang("Kelola_Pengaduan") @endsection

@section('breadcrumbs')
<x-backend-breadcrumbs />
@endsection

@section('content')
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mb-5">
            <div class="card-body">
            <div class="table-responsive">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th class="btn-primary">No</th>
                    <th class="btn-primary">Tanggal</th>
                    <th class="btn-primary">Nama Lengkap</th>
                    <th class="btn-primary">NIK</th>
                    <th class="btn-primary">NIB</th>
                    <th class="btn-primary">No Telp Aktif </th>
                    <th class="btn-primary">Alamat Perizinan</th>
                    <th class="btn-primary">Keperluan Perizinan</th>
                    <th class="btn-primary">Kebutuhan Perizinan</th>
                    <th class="btn-primary">Foto Tempat Perizinan (Jika Ada)</th>
                  <th class="btn-primary">
                      <select class="rounded font-weight-bold btn btn-primary" id="filterStatus">
                          <option value="">Status Perizinan</option>
                          <option value="Diterima">Diterima</option>
                          <option value="Menunggu">Menunggu</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                    <th class="btn-primary">Aksi</th>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>1 Januari 2020</td>
                  <td>Annike Maulani</td>
                  <td>11893791031013838</td>
                  <td>1189379103</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>Usaha Cafe</td>
                  <td>1 Tahun</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-success">Diterima</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1 Januari 2020</td>
                  <td>Annike Maulani</td>
                  <td>11893791031013838</td>
                  <td>1189379103</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>Usaha Cafe</td>
                  <td>1 Tahun</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-danger">Ditolak</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>1 Januari 2020</td>
                  <td>Annike Saputri</td>
                  <td>11893791031013838</td>
                  <td>1189379103</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>Usaha Cafe</td>
                  <td>1 Tahun</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-warning">Menunggu</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>18 Januari 2020</td>
                  <td>Annike</td>
                  <td>11893791031013838</td>
                  <td>1189379103</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>Usaha Cafe</td>
                  <td>1 Tahun</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-success">Diterima</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>19 Januari 2020</td>
                  <td>Maharini Maulani</td>
                  <td>11893791031013838</td>
                  <td>1189379103</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>Usaha Cafe</td>
                  <td>1 Tahun</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-success">Diterima</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          Modal Content Goes Here
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
          <!-- Additional buttons can be added here -->
        </div>
      </div>
    </div>
  </div>

@endsection

