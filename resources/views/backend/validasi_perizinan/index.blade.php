@extends('backend.layouts.app')

@section('title') @lang("Dashboard") @endsection

@section('breadcrumbs')
<x-backend-breadcrumbs />
@endsection

@section('content')
{{-- <div class="card mb-4 ">
    <div class="card-body">

        <x-backend.section-header>
            @lang("Welcome to", ['name'=>config('app.name')])

            <x-slot name="subtitle">
                {{ date_today() }}
            </x-slot>
            <x-slot name="toolbar">
                <button class="btn btn-outline-primary mb-1" type="button" data-toggle="tooltip" data-coreui-placement="top" title="Tooltip">
                    <i class="fa-solid fa-bullhorn"></i>
                </button>
            </x-slot>
        </x-backend.section-header>

        <!-- Dashboard Content Area -->

        <!-- / Dashboard Content Area -->

    </div>
</div> --}}
<section class="content">
    <table id="example1" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Lengkap</th>
                <th>No Telp Aktif </th>
                <th>NIB </th>
                <th>NIK</th>
                <th>Alamat Pengaduan</th>
                <th>Deskripsi Pengaduan</th>
                <th>Dokumentasi Pengaduan</th>
                <th>Status Pengaduan</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
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
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
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
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
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
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
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
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button class="btn btn-sm primary-btn justify-content-center align-items-center">Lihat</button></td>
                <td>
                  <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalTerima">Terima</button>
                  <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak">Tolak</button>
                </td>
            </tr>
            <tr>
                <td>7</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>0822652710173</td>
                <td>12374789999637101</td>
                <td>123747899</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
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
<!-- Modal Terima -->
<div class="modal fade" id="modalTerima">
<div class="modal-dialog">
<form class="modal-content">

  <!-- Header modal -->
  <div class="modal-header">
    <h4 class="modal-title">Terima Pengajuan</h4>
    <button type="button" class="close" data-dismiss="modal">&times;</button>
  </div>

  <!-- Isi modal -->
  <div class="modal-body">
    <p>Apakah Anda yakin ingin menerima pengajuan ini?</p>
  </div>

  <!-- Footer modal -->
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
    <button type="button" class="btn btn-success">Terima</button>
  </div>

</form>
</div>
</div>
<div class="modal fade" id="modalTolak">
<div class="modal-dialog">
<form action="" class="modal-content">

  <!-- Header modal -->
  <div class="modal-header">
    <h4 class="modal-title">Tolak Pengajuan</h4>
    <button type="button" class="close" data-dismiss="modal">&times;</button>
  </div>

  <!-- Isi modal -->
  <div class="modal-body">
        <label for="keterangan">Alasan Penolakan</label>
        <textarea class="form-control" id="keterangan" name="keterangan" rows="3"></textarea>
  </div>

  <!-- Footer modal -->
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
    <button type="button" class="btn btn-danger">Tolak</button>
  </div>

</form>
</div>
</div>

<script>
    $(document).ready(function() {
  var table = $('#example1').DataTable({
    "responsive": false,
    "lengthChange": false,
    "buttons": [{
                            extend: 'copy',
                            text: '<i class="fas fa-copy"></i> Copy',
                            className: 'btn btn-dark mb-3',
                            exportOptions: {
                                columns: [':not(:last-child)']
                            },
                        },
                        {
                            extend: 'csv',
                            text: '<i class="fas fa-file-csv"></i> CSV',
                            className: 'btn btn-dark mb-3',
                            exportOptions: {
                                columns: [':not(:last-child)']
                            },
                        },
                        {
                            extend: 'excel',
                            text: '<i class="fas fa-file-excel"></i> Excel',
                            className: 'btn btn-dark mb-3',
                            exportOptions: {
                                columns: [':not(:last-child)']
                            },
                        },
                        {
                            extend: 'pdf',
                            text: '<i class="fas fa-file-pdf"></i> PDF',
                            className: 'btn btn-dark mb-3',
                            exportOptions: {
                                columns: [':not(:last-child)']
                            },
                        },
                        {
                            extend: 'print',
                            text: '<i class="fas fa-print"></i> Print',
                            className: 'btn btn-dark mb-3',
                            exportOptions: {
                                columns: [':not(:last-child)']
                            },
                        },
                    ],
    "order": [[4, 'asc']],
    "columnDefs": [
      { "targets": [4], "orderable": false }
    ]
  });

  $('#filterStatus').on('change', function() {
    var val = $(this).val();
    table.column(10).search(val ? '^' + val + '$' : '', true, false).draw();
  });
  table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
});
</script>

@endsection