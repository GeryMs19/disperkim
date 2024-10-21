@extends('backend.layouts.app')

@section('title') @lang("Dashboard") @endsection

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
                <th class="btn-primary ">No</th>
                <th class="btn-primary ">Tanggal</th>
                <th class="btn-primary ">Nama Lengkap</th>
                <th class="btn-primary ">No Telp Aktif </th>
                <th class="btn-primary ">Alamat Pengaduan</th>
                <th class="btn-primary ">NIK</th>
                <th class="btn-primary ">Deskripsi Pengaduan</th>
                <th class="btn-primary ">Dokumentasi Pengaduan</th>
                <th class="btn-primary ">Status Pengaduan</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>12 Januari 2024</td>
                <td>Ahmad Mustofa</td>
                <td>0822652710173</td>
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>12374789999637101</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button type="button" class="btn btn-sm btn-primary">Lihat</button></td>
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
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>12374789999637101</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button type="button" class="btn btn-sm btn-primary">Lihat</button></td>
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
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>12374789999637101</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button type="button" class="btn btn-sm btn-primary">Lihat</button></td>
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
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>12374789999637101</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button type="button" class="btn btn-sm btn-primary">Lihat</button></td>
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
                <td>Jl. Mangunkusuma 9, Bandar Lampung</td>
                <td>12374789999637101</td>
                <td>Rumah yang dibangun melewati batas tanah saya bla bla bla bla</td>
                <td><button type="button" class="btn btn-sm btn-primary">Lihat</button></td>
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
    table.column(8).search(val ? '^' + val + '$' : '', true, false).draw();
  });
  table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
});
</script>

@endsection
