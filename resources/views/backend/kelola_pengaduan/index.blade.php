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
                  <th class="btn-primary">No Telp Aktif</th>
                  <th class="btn-primary">Alamat Pengaduan</th>
                  <th class="btn-primary">NIK</th>
                  <th class="btn-primary">Deskripsi Pengaduan</th>
                  <th class="btn-primary">Dokumentasi Pengaduan</th>
                  <th class="btn-primary">
                      <select class="rounded font-weight-bold btn btn-primary" id="filterStatus">
                          <option value="">Status Pengaduan</option>
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
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>11893791031013838</td>
                  <td>lorem ipsum blablablablablaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaa</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-success">Diterima</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>8 Januari 2020</td>
                  <td>Hamida Maulani</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>11893791031013838</td>
                  <td>lorem ipsum blablablablablaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaa</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalBerkas">Lihat</button></td>
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
                  <td>Rahmi Aulia Maulani</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>11893791031013838</td>
                  <td>lorem ipsum blablablablablaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaa</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-warning">Menunggu</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1 Januari 2020</td>
                  <td> Maulani</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>11893791031013838</td>
                  <td>lorem ipsum blablablablablaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaa</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-warning">Menunggu</p></td>
                  <td class="text-center">
                    <a href="edit.html" class="btn btn-warning btn-sm">Edit</a>
                    @include('backend.kelola_pengaduan.delete')
                    <a href="detail.html" class="btn btn-success btn-sm">Detail</a>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>1 Januari 2020</td>
                  <td>Hamida Renjana</td>
                  <td>086363811917</td>
                  <td>Jl Mangga, Harapan Jaya, Bandar Lampung</td>
                  <td>11893791031013838</td>
                  <td>lorem ipsum blablablablablaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaaaaaaaaaaaaa blaaaaaaaaaaaaaaaa</td>
                  <td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalBerkas">Lihat</button></td>
                  <td><p class="small text-center rounded bg-danger">Ditolak</p></td>
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

