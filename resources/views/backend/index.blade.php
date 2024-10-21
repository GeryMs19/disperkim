@extends('backend.layouts.app')

@section('title') @lang("Dashboard") @endsection

@section('breadcrumbs')
<x-backend-breadcrumbs />
@endsection

@section('content')
<section class="content">
    <table id="example1" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Lengkap</th>
                <th>NIK</th>
                <th>NIB</th>
                <th>No Telp Aktif </th>
                <th>Alamat Perizinan</th>
                <th>Keperluan Perizinan</th>
                <th>Kebutuhan Perizinan</th>
                <th>Foto Tempat Perizinan (Jika Ada)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>12374789999637101</td>
                <td>1237478893</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Usaha Cafe</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>12374789999637101</td>
                <td>1237478893</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Usaha Cafe</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>12374789999637101</td>
                <td>1237478893</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Usaha Cafe</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>12374789999637101</td>
                <td>1237478893</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Usaha Cafe</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>12374789999637101</td>
                <td>1237478893</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Usaha Cafe</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>

        </tbody>
    </table>
  </div><!-- /.container-fluid -->
</section>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Modal Content Goes Here
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
        <!-- Additional buttons can be added here -->
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Modal Content Goes Here
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
        <!-- Additional buttons can be added here -->
      </div>
    </div>
  </div>
</div>
@endsection
