@extends('frontend.layouts.map.app')

@section('content')
@include('frontend.layouts.map.header')

<div id="map">
    <div class ="ol-loc ol-unselectable ol-control">
    <button id="btnCrosshair" title="Live Location">
        <i class="fa fa-location-arrow fa-sm"></i>
    </button>
    </div>
</div>

<div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <a href="#" id="popup0-closer"></a>
    <div id="popup0-content"></div></div>

</div>
<div id="layersDiv" class="layersDiv">
    <div class="headerDiv" id="headerDiv">
        <label for="">Layers</label>
    </div>
    <div id="layerSwitcherContent" class="layer-switcher"></div>
</div>
<!-- <div class="toggleAttQueryDiv" id="toggleAttQueryDiv"></div> -->
<div class="attQueryDiv" id="attQueryDiv">
    <div class="headerDiv" id="headerDiv">
        <label for="">Attribute Query</label>
    </div>
    <!-- <br> -->
    <label for="">Select Layer</label>
    <select name="selectLayer" id="selectLayer">
    </select>
    <!-- <br><br> -->

    <label for="">Select Attribute</label>
    <select name="selectAttribute" id="selectAttribute">
    </select>
    <!-- <br><br> -->

    <label for="">Select Operator</label>
    <select name="selectOperator" id="selectOperator">
    </select>
    <!-- <br><br> -->

    <label for="">Enter Value</label>
    <input type="text" name="enterValue" id="enterValue">
    </select>
    <!-- <br><br> -->

    <button type="button" id="attQryRun" class="attQryRun">Run</button>
    <button type="button" id="attQryClear" class="attQryClear">Clear</button>

</div>
<!-- <div class="toggleAttributeListDiv" id="toggleAttributeListDiv"></div> -->
<div class="attListDiv" id="attListDiv">
</div>
<div class="attListDiv2" id="attListDiv2">
</div>

<div class="spQueryDiv" id="spQueryDiv">
    <div class="headerDiv" id="headerDiv">
        <label for="">Spatial Query</label>
    </div>
    <label for="">Select featues of </label>
    <select name="buffSelectLayer" id="buffSelectLayer">
    </select>
    <!-- <br><br> -->

    <label for="">that are </label>
    <select name="qryType" id="qryType">
        <option value="withinDistance">Within Distance of</option>
        <option value="intersecting">Intersecting</option>
        <option value="completelyWithin">Completely Within</option>
    </select>
    <!-- <br><br> -->

    <div class="bufferDiv" id="bufferDiv">
        <!-- <label for="">Distnace in meter</label> -->
        <input type="number" name="bufferDistance" id="bufferDistance" placeholder="1000">
        <select name="distanceUnits" id="distanceUnits">
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
            <option value="feet">Feet</option>
            <option value="nautical miles">Nautical Miles</option>
        </select>
        <!-- <br><br> -->

        <label for="">from</label>
    </div>


    <select name="srcCriteria" id="srcCriteria">
        <option value="pointMarker">Point Marker</option>
        <option value="lineMarker">Line Marker</option>
        <option value="polygonMarker">Polygon Marker</option>
    </select>
    <!-- <br><br> -->

    <button type="button" id="spUserInput" class="spUserInput"><img src="{{ asset('map/resources/images/selection.png') }}" alt=""
            style="width:17px;height:17px;vertical-align:middle"></button>

    <button type="button" id="spQryRun" class="spQryRun">Run</button>

    <button type="button" id="spQryClear" class="spQryClear">Clear</button>
</div>

<div class="editingControlsDiv" id="editingControlsDiv">

</div>

<div class="settingsDiv" id="settingsDiv">
    <div class="headerDiv" id="headerDiv">
        <label for="">Configurations</label>
    </div>
    <label for="">FeatureInfo Layer</label><br>
    <select name="featureInfoLayer" id="featureInfoLayer">
        <option value="All layers">All layers</option>
        <option value="Visible layers">Visible layers</option>
    </select>
    <label for="">Editing Layer</label><br>
    <select name="editingLayer" id="editingLayer">
    </select>
</div>

<div class="wrap-search" >
<div id="search" class="search"style="display: none">
  <input id="inpt_search" type="text" class="searchTerm" placeholder="Pencarian Data ...">
  <button type="submit" class="searchButton">
    <i class="fa fa-search"></i>
 </button>
</div>
<div class="liveDataDiv" id="liveDataDiv"></div>
</div>

<div class="wrap-search" >
<div id="marker" class="search"style="display: none" >
<form class="w-50 ">
<div class="row">
<div class="col p-0">
  <input type="text" class="form-control" placeholder="-5.000" id="latitude" value="-5.000">
</div>
<div class="col">
  <input type="text" class="form-control me-1" placeholder="105.000" id="longitude" value="105.000">
</div>
</div>
</form>
<button type="submit" class="btn btn-primary me-1 ms-2 btn-sm" id="btn_addmarker"><i class="fa fa-plus"></i> Tambah</button>
<button type="submit" class="btn btn-danger btn-sm" id="btn_clearmarker"><i class="fa fa-trash"></i> Hapus</button>
 </button>
</div>
</div>

<div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
  <div id="feature_modal_size" class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="feature-title"></h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="feature-info" class="modal-body"></div>
      <div class="modal-footer justify-content-center">
    <button type="button" class="btn btn-success" onClick="saveEdits2()">Update</button>
    <!-- <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Tutup</button> -->
  </div>
    </div>
  </div>
</div>
<input type="hidden" name="role_name" id="role_name" value="">
 </button>

    </div>


<div id="sidebar2" class="sidebar2 collapsed">
    <!-- Nav tabs -->
    <div class="sidebar2-tabs">
        <ul role="tablist">
            <li id="li1"><a href="#info1" role="tab" title="Informasi Pola Ruang"><i class="fa fa-map-pin"></i></a></li>
            <li id="li2"><a href="#info2" role="tab" title="Informasi Ketentuan Umum Zonasi"><i class="fa fa-landmark"></i></a></li>
            <li id="li3"><a href="#info3" role="tab" title="Informasi Ketentuan Khusus"><i class="fa fa-file-alt"></i></a></li>
            <!-- <li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>
            <li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i class="fa fa-github"></i></a></li> -->
        </ul>
    </div>

    <!-- Tab panes -->
    <div class="sidebar2-content">
        <div class="sidebar2-pane" id="info1">
            <h1 class="sidebar2-header">
                Informasi Pola Ruang
                <span class="sidebar2-close"><i class="fa fa-caret-left"></i></span>
            </h1>

            <br/>
            <div id="popup" class="ol-popup"></div>
            <!-- <a href="#" id="popup-closer" class="ol-popup-closer"></a> -->
            <a href="#" id="popup-closer"></a>
            <div id="popup1-content"></div>

        </div>

        <div class="sidebar2-pane" id="info2">
            <h1 class="sidebar2-header">Ketentuan Umum Zonasi<span class="sidebar2-close"><i class="fa fa-caret-left"></i></span></h1>
            <div id="popup" class="ol-popup"></div>
            <!-- <a href="#" id="popup-closer" class="ol-popup-closer"></a> -->
            <br/>
                <div class="col-6 btn-group gap-1 mr-1 mb-1">
                <button type="button" class="btn btn-success segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">Diperbolehkan</button>
                <button type="button" class="btn btn-warning segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">Diperbolehkan Bersyarat</button>
                <button type="button" class="btn btn-danger segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">Tidak Diperbolehkan</button>
                </div>
                <div class="col-12 btn-group gap-1 mb-2">
                <button type="button" class="btn btn-primary segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">Intensitas Pemanfaatan Ruang</button>
                <button type="button" class="btn btn-primary segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">Sarana dan Prasarana Minimum</button>
                </div>
            <div class="collapse" id="collapse1">
            <div class="card card-body">
                <br/>
                <h4><u>Kegiatan yang diperbolehkan</u></h4>
                <p><div id="popup2a-content"></div></p>
            </div>
            </div>

            <div class="collapse" id="collapse2">
            <div class="card card-body">
                <br/>
                <h4><u>Kegiatan yang diperbolehkan bersyarat</u></h4>
                <p><div id="popup2b-content"></div></p>
            </div>
            </div>

            <div class="collapse" id="collapse3">
            <div class="card card-body">
                <br/>
                <h4><u>Kegiatan yang tidak diperbolehkan</u></h4>
                <p><div id="popup2c-content"></div></p>
            </div>
            </div>

            <div class="collapse" id="collapse4">
            <div class="card card-body">
                <br/>
                <h4><u>Intentsitas Pemanfaatan Ruang</u></h4>
                <p><div id="popup2d-content"></div></p>
            </div>
            </div>

            <div class="collapse" id="collapse5">
            <div class="card card-body">
                <br/>
                <h4><u>Sarana dan Prasarana Minimum</u></h4>
                <p><div id="popup2e-content"></div></p>
            </div>
            </div>





        </div>

        <div class="sidebar2-pane" id="info3">
            <h1 class="sidebar2-header">Ketentuan Khusus<span class="sidebar2-close"><i class="fa fa-caret-left"></i></span></h1>
            <div id="popup" class="ol-popup"></div>
            <!-- <a href="#" id="popup-closer" class="ol-popup-closer"></a> -->
            <br/>
            <div class="btn-group gap-1 d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-primary segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">KP2B</button>
                <button type="button" class="btn btn-primary segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">KRB</button>
                <button type="button" class="btn btn-primary segmentedButton" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">Resapan Air</button>
            </div>


            <div class="collapse multi-collapse" id="collapse1">
            <div class="card card-body">
                <h4><u>Kawasan Pertanian Pangan Berkelanjutan</u></h4>
                <p><div id="popup3a-content"></div></p>
            </div>
            </div>

            <div class="collapse multi-collapse" id="collapse2">
            <div class="card card-body">
                <h4><u>Kawasan Rawan Bencana</u></h4>
                <p><div id="popup3b-content"></div></p>
            </div>
            </div>

            <div class="collapse multi-collapse" id="collapse3">
            <div class="card card-body">
                <h4><u>Resapan Air</u></h4>
                <p><div id="popup3c-content"></div></p>
            </div>
            </div>





        </div>

        <div class="sidebar2-pane" id="messages">
            <h1 class="sidebar-header">Messages<span class="sidebar2-close"><i class="fa fa-caret-left"></i></span></h1>
        </div>

        <div class="sidebar2-pane" id="settings">
            <h1 class="sidebar2-header">Settings<span class="sidebar2-close"><i class="fa fa-caret-left"></i></span></h1>
        </div>
    </div>
</div>


    <div id="map"></div>
    @include('frontend.layouts.map.footer')
@endsection
