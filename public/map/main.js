var serverPort = 'akiasmoro.webgis1.com';
var geoserverWorkspace = 'klikpr';
var jaringanjalanLayer = 'jaringan_jalan';
var polaruangLayer = 'pola_ruang';
var admkecLayer = 'administrasi_kecamatan';
var asetLayer = 'aset';
var identifyLayers = [];
var projectionName = 'EPSG:32748';
var layerList = [];
var layersArray = [];
var session = document.getElementById("role_name").value;

proj4.defs('EPSG:32748','+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs +type=crs');
ol.proj.proj4.register(proj4);

var geojson;
var queryGeoJSON;
var dataAttribute;

var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(64,244,208,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#40E0D0',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#40E0D0'
        })
    })
});
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle
});

var querySelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(64,244,208,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#40E0D0',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#40E0D0'
        })
    })
});
var querySelectedFeatureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: querySelectedFeatureStyle
});

var clickSelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,0,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#FFFF00',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#FFFF00'
        })
    })
});
var clickSelectedFeatureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: clickSelectedFeatureStyle
});
var interactionStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(200, 200, 200, 0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
    }),
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
    })
});

// var asetLayerSource = new ol.layer.Image({
//     title: "Titik Aset",
//     visible: false,
//     source: new ol.source.ImageWMS({
//         url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
//         params: { 'LAYERS': geoserverWorkspace + ':' + asetLayer, 'TILED': true },
//         serverType: 'geoserver',
//         crossOrigin: 'anonymous'
//     })
// });

var admkecamatanLayerSource = new ol.layer.Image({
    title: "Adm. Kecamatan",
    visible: false,
    source: new ol.source.ImageWMS({
        url: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + admkecLayer, 'TILED': true },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    })
});

var jaringanjalanLayerSource = new ol.layer.Image({
        title: "Jaringan Jalan",
        visible: false,
        source: new ol.source.ImageWMS({
            url: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
            params: { 'LAYERS': geoserverWorkspace + ':' + jaringanjalanLayer, 'TILED': true },
            serverType: 'geoserver',
            crossOrigin: 'anonymous'
        })
});

var polaruangLayerSource = new ol.layer.Image({
    title: "Pola Ruang",
    visible: true,
    source: new ol.source.ImageWMS({
        url: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + polaruangLayer, 'TILED': true },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    })
});

var osmBaseSource = new ol.layer.Tile({
    title: 'Open Street Map',
    type: 'base',
    visible: false,
    attributions: '',
    source: new ol.source.OSM()
});

var googleroadmapBaseSource = new ol.layer.Tile({
    title:'Google Road Map',
    type:'base',
    visible: true,
    source: new ol.source.Stamen({ layer: 'm' })
});

var googlesatelliteBaseSource = new ol.layer.Tile({
    title:'Google Satellite',
    type:'base',
    visible: true,
    source: new ol.source.Stamen({ layer: 's' })
});

var googlehybridBaseSource = new ol.layer.Tile({
    title:'Google Hybrid',
    type:'base',
    visible: true,
    source: new ol.source.Stamen({ layer: 'y' })
});

var noneBaseSource = new ol.layer.Tile({
    title: 'None',
    type: 'base',
    visible: false
});

var mapView = new ol.View({
    projection: 'EPSG:32748',
    center: [529039.272, 9402186.127],
    zoom: 12,
    // center: [8077789.225432343, 2635790.8814079487],
    // zoom: 17
});



var map = new ol.Map({
    target: 'map',
    view: mapView,
    controls: [],
});



var baseGroup = new ol.layer.Group({
    title: 'Base Maps',
    fold: true,
    layers: [noneBaseSource, osmBaseSource, googleroadmapBaseSource, googlesatelliteBaseSource, googlehybridBaseSource,]
});

var layerGroup = new ol.layer.Group({
    title: 'Data',
    fold: true,
    layers: [polaruangLayerSource, jaringanjalanLayerSource, admkecamatanLayerSource]
    // layers: [admkecamatanLayerSource, polaruangLayerSource, jaringanjalanLayerSource, asetLayerSource]
})

map.addLayer(baseGroup);
map.addLayer(layerGroup);


for (y = 0; y < map.getLayers().getLength(); y++) {
    var lyr1 = map.getLayers().item(y)
    if (lyr1.get('title') == 'Base Maps') { } else {
        if (lyr1.getLayers().getLength() > 0) {
            for (z = 0; z < lyr1.getLayers().getLength(); z++) {
                var lyr2 = lyr1.getLayers().item(z);
                layerList.push(lyr2.getSource().getParams().LAYERS);
            }
        } else {
            layerList.push(lyr1.getSource().getParams().LAYERS);
        }
    }

}
 //sidebar
         var sidebar = new ol.control.Sidebar({ element: 'sidebar2', position: 'left' });
        map.addControl(sidebar);

  // Define a new legend
  var legend = new ol.legend.Legend({
    title: 'Legenda',
    margin: 5,
    maxWidth: 300,
  });
  var legendCtrl = new ol.control.Legend({
    legend: legend,
    collapsed: false,
  });


  var layerLegend1 = new ol.legend.Legend({ layer: admkecamatanLayerSource })
  var layerLegend2 = new ol.legend.Legend({ layer: jaringanjalanLayerSource })
  var layerLegend3 = new ol.legend.Legend({ layer: polaruangLayerSource })
//   var layerLegend4 = new ol.legend.Legend({ layer: asetLayerSource })
  layerLegend1.addItem(new ol.legend.Image({
    title: 'Kecamatan',
    src: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&transparent=true&WIDTH=20&HEIGHT=20&LAYER='+geoserverWorkspace+':'+admkecLayer+'',
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }))
  layerLegend2.addItem(new ol.legend.Image({
    title: 'Jaringan Jalan',
    src: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&transparent=true&WIDTH=20&HEIGHT=20&LAYER='+geoserverWorkspace+':'+jaringanjalanLayer+'',
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }))
  layerLegend3.addItem(new ol.legend.Image({
    title: 'Pola Ruang',
    src: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&transparent=true&WIDTH=20&HEIGHT=20&LAYER='+geoserverWorkspace+':'+polaruangLayer+'',
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }))

//   layerLegend4.addItem(new ol.legend.Image({
//     title: 'Titik Aset',
//     src: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&transparent=true&WIDTH=20&HEIGHT=20&LAYER='+geoserverWorkspace+':'+asetLayer+'',
//     serverType: 'geoserver',
//     crossOrigin: 'anonymous'
//   }))




  legend.addItem(layerLegend1)
  legend.addItem(layerLegend2)
  legend.addItem(layerLegend3)
//   legend.addItem(layerLegend4)
  // Add a legend
  map.addControl(legendCtrl);


  // Print control
  map.addControl(new ol.control.CanvasTitle({
    title: 'my title',
    visible: false,
    style: new ol.style.Style({ text: new ol.style.Text({ font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'}) }),
  }));


var printControl = new ol.control.PrintDialog();
printControl.setSize('A4');
map.addControl(printControl);

/* On print > save image file */
printControl.on(['print', 'error'], function(e) {

  // Print success
  if (e.image) {
    if (e.pdf) {
      // Export pdf using the print info
      var pdf = new jsPDF({
        orientation: e.print.orientation,
        unit: e.print.unit,
        format: e.print.size
      });
      pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
      pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
    } else  {
      // Save image as file
      e.canvas.toBlob(function(blob) {
        var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
        saveAs(blob, name);
      }, e.imageType, e.quality);
    }
  } else {
    console.warn('No canvas to export');
  }
});





// start : mouse position
var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function (coordinate) { return ol.coordinate.format(coordinate, '{y} , {x}', 6); }
});
map.addControl(mousePosition);
// end : mouse position

// start : scale control
// var scaleControl = new ol.control.ScaleLine({
//     bar: true,
//     text: true,
// });
// map.addControl(scaleControl);
// end : scale control

var toolbarDivElement = document.createElement('div');
toolbarDivElement.className = 'toolbarDiv';





// start : home Control
// var homeButton = document.createElement('button');
// homeButton.innerHTML = '<img src="map/resources/images/home.svg" alt="" class="myImg"></img>';
// homeButton.className = 'myButton';
// homeButton.title = 'Home';


// var homeElement = document.createElement('div');
// homeElement.className = 'homeButtonDiv';
// homeElement.appendChild(homeButton);
// toolbarDivElement.appendChild(homeElement);

// homeButton.addEventListener("click", () => {
//     location.href = "index.html";
// })

// map.addControl(homeControl);
// end : home Control

// start : full screen Control
var fsButton = document.createElement('button');
fsButton.innerHTML = '<img src="map/resources/images/fullscreen.svg" alt="" class="myImg"></img>';
fsButton.className = 'myButton';
fsButton.title = 'Full Screen';

var fsElement = document.createElement('div');
fsElement.className = 'myButtonDiv';
fsElement.appendChild(fsButton);
toolbarDivElement.appendChild(fsElement);

fsButton.addEventListener("click", () => {
    var mapEle = document.getElementById("map");
    if (mapEle.requestFullscreen) {
        mapEle.requestFullscreen();
    } else if (mapEle.msRequestFullscreen) {
        mapEle.msRequestFullscreen();
    } else if (mapEle.mozRequestFullscreen) {
        mapEle.mozRequestFullscreen();
    } else if (mapEle.webkitRequestFullscreen) {
        mapEle.webkitRequestFullscreen();
    }
})

// map.addControl(fsControl);
// end : full screen Control

// start : Layers Control
var lyrsButton = document.createElement('button');
lyrsButton.innerHTML = '<img src="map/resources/images/layers.svg" alt="" class="myImg"></img>';
lyrsButton.className = 'myButton';
lyrsButton.title = 'Layers';

var lyrElement = document.createElement('div');
lyrElement.className = 'myButtonDiv';
lyrElement.appendChild(lyrsButton);
toolbarDivElement.appendChild(lyrElement);

var layersFlag = false;
lyrsButton.addEventListener("click", () => {
    lyrsButton.classList.toggle('clicked');
    document.getElementById("map").style.cursor = "default";
    layersFlag = !layersFlag;

    if (layersFlag) {
        document.getElementById("layersDiv").style.display = "block";
    } else {
        document.getElementById("layersDiv").style.display = "none";
    }
})
// end : Layers Control

// start : pan Control
var panButton = document.createElement('button');
panButton.innerHTML = '<img src="map/resources/images/pan.svg" alt="" class="myImg"></img>';
panButton.className = 'myButton';
panButton.id = 'panButton';
panButton.title = 'Pan';

var panElement = document.createElement('div');
panElement.className = 'myButtonDiv';
panElement.appendChild(panButton);
toolbarDivElement.appendChild(panElement);

var panFlag = false;
var drgPanInteraction = new ol.interaction.DragPan();
panButton.addEventListener("click", () => {
    panButton.classList.toggle('clicked');
    panFlag = !panFlag;
    if (panFlag) {
        document.getElementById("map").style.cursor = "grab";
        map.addInteraction(drgPanInteraction);
    } else {
        document.getElementById("map").style.cursor = "default";
        map.removeInteraction(drgPanInteraction);
    }
})
// end : pan Control


// start : plotting

if (session == 'Developer' | session == 'Super Admin' | session == 'Admin'){

var markerButton = document.createElement('button');
markerButton.innerHTML = '<img src="map/resources/images/marker-tool.png" alt="" class="myImg"></img>';
markerButton.className = 'myButton';
markerButton.id = 'markerButton';
markerButton.title = 'Marker';

var merkerElement = document.createElement('div');
merkerElement.className = 'myButtonDiv';
merkerElement.appendChild(markerButton);
toolbarDivElement.appendChild(merkerElement);

var markerFlag = false;
markerButton.addEventListener("click", () => {
    markerButton.classList.toggle('clicked');
    markerFlag = !markerFlag;
    if (markerFlag) {
        document.getElementById("marker").style.display = "";

    } else {
        document.getElementById("marker").style.display = "none";
    }
})
} else {

}
// end : plotting Control

// start : search Control

var searchButton = document.createElement('button');
searchButton.innerHTML = '<img src="map/resources/images/search.png" alt="" class="myImg"></img>';
searchButton.className = 'myButton';
searchButton.id = 'searchButton';
searchButton.title = 'Search';

var searchElement = document.createElement('div');
searchElement.className = 'myButtonDiv';
searchElement.appendChild(searchButton);
toolbarDivElement.appendChild(searchElement);

var searchFlag = false;
searchButton.addEventListener("click", () => {
    searchButton.classList.toggle('clicked');
    searchFlag = !searchFlag;
    if (searchFlag) {
        document.getElementById("search").style.display = "";
        document.getElementById("liveDataDiv").style.display = "";

    } else {
        document.getElementById("search").style.display = "none";
        document.getElementById("liveDataDiv").style.display = "none";
    }
})

// end : search Control

// start : zoomIn Control

var zoomInInteraction = new ol.interaction.DragBox();

zoomInInteraction.on('boxend', function () {
    var zoomInExtent = zoomInInteraction.getGeometry().getExtent();
    map.getView().fit(zoomInExtent);
});

var ziButton = document.createElement('button');
ziButton.innerHTML = '<img src="map/resources/images/zoomIn.svg" alt="" class="myImg"></img>';
ziButton.className = 'myButton';
ziButton.id = 'ziButton';
ziButton.title = 'Zoom In';

var ziElement = document.createElement('div');
ziElement.className = 'myButtonDiv';
ziElement.appendChild(ziButton);
toolbarDivElement.appendChild(ziElement);

var zoomInFlag = false;
ziButton.addEventListener("click", () => {
    ziButton.classList.toggle('clicked');
    zoomInFlag = !zoomInFlag;
    if (zoomInFlag) {
        document.getElementById("map").style.cursor = "zoom-in";
        map.addInteraction(zoomInInteraction);
    } else {
        map.removeInteraction(zoomInInteraction);
        document.getElementById("map").style.cursor = "default";
    }
})

// end : zoomIn Control

// start : zoomOut Control
var zoomOutInteraction = new ol.interaction.DragBox();

zoomOutInteraction.on('boxend', function () {
    var zoomOutExtent = zoomOutInteraction.getGeometry().getExtent();
    map.getView().setCenter(ol.extent.getCenter(zoomOutExtent));

    mapView.setZoom(mapView.getZoom() - 1)
});

var zoButton = document.createElement('button');
zoButton.innerHTML = '<img src="map/resources/images/zoomOut.png" alt="" class="myImg"></img>';
zoButton.className = 'myButton';
zoButton.id = 'zoButton';
zoButton.title = 'Zoom Out';

var zoElement = document.createElement('div');
zoElement.className = 'myButtonDiv';
zoElement.appendChild(zoButton);
toolbarDivElement.appendChild(zoElement);

var zoomOutFlag = false;
zoButton.addEventListener("click", () => {
    zoButton.classList.toggle('clicked');
    zoomOutFlag = !zoomOutFlag;
    if (zoomOutFlag) {
        document.getElementById("map").style.cursor = "zoom-out";
        map.addInteraction(zoomOutInteraction);
    } else {
        map.removeInteraction(zoomOutInteraction);
        document.getElementById("map").style.cursor = "default";
    }
})
// end : zoomOut Control



// start : FeatureInfo Control
var featureInfoButton = document.createElement('button');
featureInfoButton.innerHTML = '<img src="map/resources/images/identify.svg" alt="" class="myImg"></img>';
featureInfoButton.className = 'myButton';
featureInfoButton.id = 'featureInfoButton';
featureInfoButton.title = 'Feature Info';

var featureInfoElement = document.createElement('div');
featureInfoElement.className = 'myButtonDiv';
featureInfoElement.appendChild(featureInfoButton);
toolbarDivElement.appendChild(featureInfoElement);

var featureInfoFlag = false;
featureInfoButton.addEventListener("click", () => {
    featureInfoButton.classList.toggle('clicked');
    featureInfoFlag = !featureInfoFlag;
})

const container = document.getElementById('popup');
const content0 = document.getElementById('popup0-content');
const content1 = document.getElementById('popup1-content');
const content2a = document.getElementById('popup2a-content');
const content2b = document.getElementById('popup2b-content');
const content2c = document.getElementById('popup2c-content');
const content2d = document.getElementById('popup2d-content');
const content2e = document.getElementById('popup2e-content');
const content3a = document.getElementById('popup3a-content');
const content3b = document.getElementById('popup3b-content');
const content3c = document.getElementById('popup3c-content');
const closer = document.getElementById('popup-closer');


const popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});


closer.onclick = function () {
    popup.setPosition(undefined);
    container.style.display = "none";
    closer.blur();
    return false;
};

map.addOverlay(popup);

map.on('singleclick', function (evt) {
    $("#popup").hide();

    if (featureInfoFlag) {
        content1.innerHTML = '-';
        content2a.innerHTML = '-';
        content2b.innerHTML = '-';
        content2c.innerHTML = '-';
        content2d.innerHTML = '-';
        content2e.innerHTML = '-';
        content3a.innerHTML = 'Tidak Ada';
        content3b.innerHTML = 'Tidak Ada';
        content3c.innerHTML = 'Tidak Ada';
        let pixel = map.getPixelFromCoordinate(evt.coordinate);
        map.forEachLayerAtPixel(pixel, function (layer) {
            if (layer instanceof ol.layer.Image) {
                if (layer.get("visible")) {
                    let url = layer.getSource().getFeatureInfoUrl(evt.coordinate, map.getView().getResolution(), "EPSG:32748", {
                        INFO_FORMAT: "application/json",
                    });
                    if (url) {
                        fetch(url)
                            .then(function (response) {
                                return response.text();
                            })
                            .then(function (json) {
                                let data = JSON.parse(json);
                                let layerinfo = layer.getSource().getParams().LAYERS;
                                if(data.features.length < 1){

                                    // popup.setPosition(undefined);
                                    // container.style.display = "none";
                                }
                                else if (data.features.length > 0) {
                                    if (layerinfo == 'klikpr:pola_ruang'){
                                        $('#li1').addClass('active');
                                        var feature = data.features[0];
                                        var props = feature.properties;
                                        var koordinat = ol.proj.transform(evt.coordinate, 'EPSG:32748', 'EPSG:4326');
                                        var data2 = props.namobj;
                                        var data3 = props.kp2b;
                                        var data4 = props.krb;
                                        var data5 = props.resair;

                                        content0.innerHTML = "<b>Pola Ruang :</b> " + props.namobj + ""
                                        content1.innerHTML = "<div class='alert alert-success d-sm-block text-center' role='alert'><small>Koordinat : " + koordinat[1].toFixed(5) + ", " + koordinat[0].toFixed(5) + "</small></div> <table class='table table-sm table-bordered table-striped table-hover '><tbody><tr><th class='text-start'><b>Provinsi :</b></th><td> " + props.wadmpr + " </td></tr> <tr><th class='text-start'><b>Kabupaten/Kota :</b></th><td> " + props.wadmkk + "</td></tr> <tr><th class='text-start'><b>Kecamatan :</b> </th><td>" + props.wadmkc + "</td></tr><tr><th class='text-start'><b>Pola Ruang :</b></th><td> " + props.namobj + " </td></tr> <tr><th class='text-start'><b>Kode Kawasan :</b> </th><td>" + props.kodkws + " </td></tr> <tr><th class='text-start'><b>KP2B :</b></th><td>" + props.kp2b + " </td></tr> <tr><th class='text-start'><b>KRB :</b> </th><td>" + props.krb + " </td><tr>   <tr><th class='text-start'><b>Jenis Pola Ruang :</b></th><td> " + props.jnsrpr + " </td></tr>  <tr><th class='text-start'><b>Resapan Air :</b> </th><td>" + props.resair + "</std></tr></tbody></table>";
                                        popup.setPosition(evt.coordinate);
                                        container.style.display = "block";


                                        if (data2 == 'Jalur Hijau'){
                                            content2a.innerHTML ="<b>Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                            content2b.innerHTML ="<b>Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                            content2c.innerHTML ="<b>Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="<b>Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Cagar Budaya'){
                                            content2a.innerHTML ="<b>Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembagan RTH di zona penyangga;<br/>2. kegiatan untuk kepentingan penelitian dan pengembangan, ilmu pengetahuan, serta pendidikan; <br/>3. kegiatan pelestarian budaya dan peninggalan sejarah; <br/>4. pemanfaatan lahan untuk lokasi evakuasi bencana; dan<br/>5. pengembangan sarana dan prasarana pendukung di zona penunjang.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa pemanfaatan bangunan cagar budaya untuk mendukung kegiatan pariwisata"
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi yaitu mengubah bentuk arsitektur bangunan cagar budaya di zona inti"
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 50%, KLB maksimal sebesar 1,5."
                                            content2e.innerHTML ="<b>Sarana dan prasarana minimum meliputi :</b> <br/>1. jaringan jalan yang dilengkapi dengan pedestrian danpenerangan jalan; <br/>2. jaringan listrik, air bersih dan telekomunikasi;<br/>3. jaringan drainase; dan<br/>4. sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Ekosistem Mangrove'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu kegiatan perlindungan dan pengamanan hutan mangrove, dan/atau rehabilitasi hutan mangrove";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat yaitu kegiatan pendidikan, penelitian, ekowisata dan sarana pendukungnya"
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu menebang, membakar, memanfaatkan kayu, mengangkut, dan/atau memperdagangkan kayu yang berasal dari hutan mangrove"
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="-"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Fasilitas Umum dan Fasilitas Sosial'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan pembangunan fasilitas umum dan fasilitas sosial; dan<br/>2. kegiatan pembangunan prasarana dan sarana umum pendukung fasilitas umum dan fasilitas sosial.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa pembangunan infrastruktur energi, air bersih dan telekomunikasi."
                                            content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan yang mengganggu pelayanan fasilitas sosial dan fasilitas umum."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 70%, KLB maksimal sebesar 7."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;  <br/>2. aksesibilitas untuk difabel;<br/>3. penyediaan jalur dan tempat evakuasi bencana;<br/>4. penyediaan fasilitas parkir"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Hutan Lindung'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan pada zona hutan lindung,meliputi:</b><br/>1. kegiatan usaha pemanfaatan kawasan sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan;  <br/>2. kegiatan usaha pemanfaatan jasa lingkungan sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan; dan <br/>3. kegiatan pemungutan hasil hutan bukan kayu sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. penambangan dengan pola pertambangan bawah tanah dengan ketentuan dilarang mengakibatkan: <br/>a) turunnya permukaan tanah;  <br/>b) berubahnya fungsi pokok Kawasan Hutan secara permanen; dan/atau  <br/>c) terjadinya kerusakan akuifer air tanah.<br/>2. pemanfaatan ruang untuk kegiatan latihan militer tanpa mengurangi fungsi kawasan hutan dan tutupan vegetasi;<br/>3. kegiatan pendidikan dan pengembangan kehutanan, penelitian dan pelatihan kehutanan, serta religi dan budaya setempat dengan tidak mengubah bentang alam dan tidakmerusak unsur-unsur keseimbangan lingkungan; <br/>4. kegiatan pengelolaan sumber daya hutan yang berbasis pemberdayaan masyarakat yang dilakukan pengawasan pemerintah terkait;  <br/>5. penyediaan jalur dan tempat evakuasi bencana; dan<br/>6. penggunaan kawasan hutan untuk kepentingan pembangunan diluar kegiatan kehutanan sesuai denganperaturan perundang-undangan bidang kehutanan."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b> <br/>1. seluruh kegiatan yang berpotensi mengurangi luas kawasan hutan dan tutupan vegetasi; dan<br/>2. seluruh kegiatan yang berpotensi mengganggu dan merusak ekosistem kawasan hutan."
                                            content2d.innerHTML ="Sarana dan prasarana minimum sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan."
                                            content2e.innerHTML ="Tidak Ada"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Imbuhan Air Tanah'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan perlindungan kawasan imbuhan air tanah; <br/>2. kegiatan budidaya yang diperkenankan adalah kegiatan wisata alam, budidaya tanaman keras, dan budidaya hasil hutan; dan<br/>3. pemanfaatan berupa kawasan budidaya hutan, pertanian lahan kering dan perkebunan/tanaman tahunan, tanaman perdu, tanaman tegakan tinggi, dan penutup tanah untuk melindungi pencemaran dan erosi terhadap air.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemasangan jaringan kabel, listrik, telekomunikasi dan pipa air minum;<br/>2. penyediaan sarana dan prasarana pendukung kawasan sesuai ketentuan yang berlaku dengan intensitas KDB maksimum 30% dan KDH minimum 70%; <br/>3. pengembangan struktur alami dan struktur buatan untuk mencegah longsor/erosi dan mempertahankan bentuk mata air; <br/>4. kegiatan wisata yang terbatas hanya pada kegiatan wisata alam;<br/>5. kegiatan penunjang pariwisata alam sesuai ketentuan yang berlaku dengan intensitas KDB maksimum 30% dan KDH minimum 70%; <br/>6. kegiatan perumahan eksisting dengan tidak mengubah luasan dan tata masa bangunan; dan <br/>7. pada kawasan yang telah terbangun dikendalikan dengat tidak mengeluarkan izin pembangunan baru serta izin pertambangan baru."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b>  <br/>1. tidak diperbolehkan pembangunan hunian baru; <br/>2. tidak diperbolehkan melakukan kegiatan penambangan; dan<br/>3. melakukan kegiatan pembuangan limbah baik padat, cair maupun limbah berbahaya."
                                            content2d.innerHTML ="Penjelasan tercantum pada kegiatan yang diperbolehkan bersyarat."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. jaringan listrik, jaringan air bersih; <br/>2. bangunan prasarana sumber daya air; dan<br/>3. fasilitas keamanan jalan inspeksi pada lokasi yang ditentukan sesuai standar yang ditentukan oleh instansi terkait."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Infrastruktur Perkotaan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. pengembangan RTH; <br/>2. pengembangan sarana dan prasarana pendukung kawasan sesuai peraturan perundang-undangan;<br/>3. untuk infrastruktur perkotaan berupa TPA, meliputi: <br/>a) kantor pengelola;<br/>b) sarana dan prasarana penunjang kawasan;<br/>c) pengembangan pengelolaan TPA;<br/>d) kegiatan pengolahan limbah terpadu; dan  <br/>e) kegiatan pengoperasian TPA berupa kegiatan pemilahan, pengumpulan, pengelolaan dan pemrosesan akhir sampah, tempat mesin pengolah sampah, pengurungan lapis bersih, pemeliharaan TPA, industri terkait pengelolaan sampah dan kegiatan penunjang   operasional TPA. <br/>4. untuk infrastruktur perkotaan berupa pelabuhan perikanan pantai meliputi: <br/>a) kegiatan perkantoran pendukung kawasan;<br/>b) kegiatan permukiman nelayan di kawasan pelabuhan  perikanan pantai;<br/>c) industri pengolahan ikan dan industri penunjang  lainnya;<br/>d) kegiatan pengembangan infrastruktur pengendalian  abrasi dan infiltrasi air laut pada kawasan pelabuhan perikanan pantai; dan <br/>e) bangunan pengendali air pada kawasan pelabuhan perikanan pantai.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b> <br/>1. kegiatan pariwisata; dan<br/>2. kegiatan penunjang transportasi laut pada kawasan  infrastruktur perkotaan di wilayah pesisir."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi kegiatan sosial dan  ekonomi yang mengganggu fungsi kawasan"
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar  10%, KDB maksimal sebesar 60%, KLB maksimal sebesar 1,8."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. infrastruktur dasar pengelolaan TPA;<br/>2. jaringan jalan, penerangan jalan dan tanda atau rambu  keselamatan; <br/>3. jaringan air bersih;<br/>4. jaringan energi dan listrik;<br/>5. jaringan telekomunikasi; <br/>6. jaringan drainase;<br/>7. sistem jaringan air limbah dan sistem pengelolaan sampah; <br/>8. instalasi Bahan Bakar Minyak (BBM);<br/>9. dermaga, kolam pelabuhan; dan<br/>10. pos jaga dan MC"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Pariwisata'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. penyediaan jalur dan tempat evakuasi bencana;<br/>2. pengembangan sarana dan prasarana pendukung pariwisata; dan<br/>3. pengembangan ruang terbuka hijau. ";
                                            content2b.innerHTML ="egiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. industri kecil;<br/>2. kegiatan pertambangan;<br/>3. pengembangan budidaya pertanian; dan<br/>4. pembangunan perdagangan dan jasa, perumahan, dan perkantoran untuk menunjang kegiatan pariwisata dengan memperhatikan daya dukung dan daya tampung; <br/>5. pengembangan sarana dan prasarana wilayah."
                                            content2c.innerHTML ="Kegiatan yang dilarang pada kawasan pariwisata, meliputi:</b><br/>1. kegiatan yang menimbulkan dampak negatif terhadap lingkungan; dan   <br/>2. industri menengah dan industri besar. "
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimum sebesar 50%, KDB maksimal sebesar 50%, KLB maksimal sebesar 6 di kawasan wisata pantai dan KLB maksimal 3 di kawasan wisata lainnya."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian dengan kontruksi yang bisa menyerap air dan disertai tanda atau rambu keselamatan; <br/>2. penyediaan sumber air baku pariwisata;<br/>3. jaringan energi dan kelistrikan; <br/>4. area parkir kendaraan; <br/>5. jaringan telekomunikasi;<br/>6. sistem pengelolaan air limbah (sesuai dengan ketentuan dan persyaratan teknis yang berlaku;<br/>7. aksesibilitas untuk difabel;<br/>8. jaringan drainase; dan<br/>9. pengelolaan persampahan."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Perdagangan dan Jasa'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan pembangunan perdagangan dan jasa skala regional, skala kota dan skala lokal;<br/>2. kegiatan pembangunan prasarana dan sarana umum pendukung kegiatan perdagangan dan jasa;<br/>3. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada kawasan perdagangan dan jasa di wilayah pesisir;  <br/>4. bangunan pengendali air; dan<br/>5. penyediaan jalur dan tempat evakuasi bencana.  ";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan hunian yang telah dibangun sebelum Perda RTRW ini berlaku;<br/>2. kegiatan pemanfaatan ruang untuk mendukung kegiatan perdagangan dan jasa skala regional, skala kota dan lokal;<br/>3. kegiatan hunian;<br/>4. fasilitas umum dan fasilitas sosial;<br/>5. pembangunan infrastruktur energi, air bersih dan telekomunikasi; dan<br/>6. kegiatan penunjang transportasi laut pada kawasan perdagangan dan jasa di wilayah pesisir."
                                            content2c.innerHTML ="Kegiatan yang dilarang, berupa kegiatan yang mengganggu kawasan perdagangan dan jasa."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 32."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi: </b><br/>1. jaringan jalan, penerangan jalan dan pedestrian, dan tanda atau rambu keselamatan;  <br/>2. fasilitas parkir;<br/>3. jaringan air bersih;<br/>4. jaringan energi dan listrik;<br/>5. jaringan telekomunikasi; <br/>6. jaringan drainase;<br/>7. sistem jaringan air limbah dan sistem pengelolaan sampah; dan<br/>8. aksesibilitas untuk difabel."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Perikanan Budidaya'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan mendirikan bangunan penunjang budidaya perikanan,perikanan organik, pengolahan dan pemasaran hasil perikanan,penelitian dan wisata;<br/>2. pengembangan sarana dan prasarana pendukung budidaya ikandan perikanan lainnya.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pengembangan industri pendukung pengembangan perikanan yang tidak mengganggu lingkungan;<br/>2. pengembangan perumahan berkepadatan rendah yang tidak mengganggu fungsi utama;<br/>3. kegiatan wisata alam yang berbasis ekowisata; dan<br/>4. kegiatan pengembangan sarana dan prasarana wilayah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu pengembangan kegiatan yang berpotensi mencemari lingkungan pada kawasan yang ditetapkan sebagai kawasan perikanan budidaya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 40%, KDB maksimal sebesar 60%, KLB maksimal sebesar 1,2."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan;<br/>2. jaringan air bersih;<br/>3. jaringan listrik;<br/>4. sistem jaringan limbah terpadu; dan<br/>5. jaringan drainase"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Perkantoran'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan pembangunan perkantoran;87<br/>2. kegiatan pembangunan prasarana dan sarana umumpendukung perkantoran; dan<br/>3. penyediaan jalur dan tempat evakuasi bencana.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan perumahan;<br/>2. kegiatan perdagangan dan jasa; dan<br/>3. pembangunan sarana dan prasarana wilayah."
                                            content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan industri, kegiatan lainnyayang mengakibatkan terganggunya fungsi kawasan perkantoran."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%,KDB maksimal sebesar 80%, KLB maksimal sebesar 16."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tandaatau rambu keselamatan;<br/>2. jaringan air bersih;<br/>3. jaringan energi dan listrik;<br/>4. jaringan telekomunikasi;<br/>5. jaringan drainase; dan<br/>6. sistem jaringan air limbah dan sistem pengelolaan sampah"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Perlindungan Setempat'){
                                            content2a.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>kegiatan yang diperbolehkan, meliputi:<br/>a) pengembangan RTH;<br/>b) pembangunan dan pemeliharaan bangunan pengelolaan air dan/atau pemanfaatan air;<br/>c) kegiatan yang berhubungan dengan pelestarian sungai; dan<br/>d) kegiatan konservasi, penataan dan pembangunan yang mendukung fungsi kawasan sempadan sungai.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>kegiatan yang diperbolehkan, meliputi: <br/>a) kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut; <br/>b) pengembangan RTH; <br/>c) kegiatan penelitian dan bangunan pengendali air; dan<br/>d) pembangunan dan pengembangan jalur serta evakuasi bencana dan sistem peringatan dini.";
                                            content2b.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>kegiatan yang diperbolehkan bersyarat, meliputi:<br/>a) pengembangan sarana dan prasarana wilayah yang tidak merusak atau berdampak langsung terhadap badan sungai;<br/>b) pengembangan sistem pengendalian banjir;<br/>c) pemanfaatan ruang khusus seperti bangunan sumberdayaair, jembatan dan dermaga, jalur air minum, bangunan telekomunikasi dan listrik, serta vegetasi rumput padas empadan bertanggul dan tanaman keras pada sempadantidak bertanggul, penanaman tumbuhan pelindung;<br/>d) bangunan pengolahan limbah dan bahan pencemar lainnya;<br/>e) kegiatan pariwisata dengan tidak mengubah bentang alam dan tidak merusak unsur keseimbangan lingkungan;<br/>f) bangunan dalam sempadan sungai, dengan ketentuan status quo artinya tidak boleh diubah dan ditambah luasan; dan<br/>g) kegiatan pertambangan yang tidak merubah bentang sungai, dan mengganggu fungsi sungai.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>kegiatan yang diperbolehkan bersyarat, meliputi: <br/>a) sarana pendukung pariwisata yang bersifat bangunan semi permanen yang disertai dengan kajian teknis dan tidak menutup akses publik ke pantai;  <br/>e) kegiatan pertahanan dan keamanan sesuai ketentuan perundang–undangan yang berlaku; dan <br/>b) kegiatan penunjang transportasi laut dan perikanan."
                                            content2c.innerHTML ="Ketentuan umum zonasi sempadan sungai yang tidak diperbolehkan berupa hunian baru dan seluruh kegiatan dan bangunan yang mengancam kerusakan dan menurunkan kualitas sungai.<br/><br/>Ketentuan umum zonasi sempadan pantai yang tidak diperbolehkan berupa semua kegiatan yang berpotensi menyebabkan terjadinya kerusakan lingkungan dan penurunan fungsi sempadan pantai."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 85%."
                                            content2e.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>sarana dan prasarana minimum meliputi :<br/>a) jalur inspeksi yang dilengkapi dengan sistem penerangan;dan<br/>b) tanggul sungai pada sungai yang melewati area perumahan.<br/>6. tanah pada kawasan ini dimiliki oleh negara dan apabilaterdapat izin yang dikeluarkan untuk bangunan yang ada dengan prosedur yang benar, maka dibebaskan dengan penggantian yang layak.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>sarana dan prasarana minimum meliputi:<br/>a) jalur inspeksi yang dilengkapi dengan sistem penerangan; dan<br/>b) penyediaan jalur evakuasi bencana. <br/><br/>6. tanah pada kawasan ini dimiliki oleh negara dan apabila terdapat izin yang dikeluarkan untuk bangunan yang ada dengan prosedur yang benar, maka dibebaskan dengan penggantian yang layak atau relokasi. "
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Pertahanan dan Keamanan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu pembangunan dan pengembangan kawasan pertahanan dan keamanan serta pembangunan sarana dan prasarana pendukung sesuai dengan ketentuan peraturan perundang-undangan";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat yaitu kegiatan budidaya terbatas di sekitar kawasan pertahanan dan keamanan sesuai dengan ketentuan peraturan perundang-undangan"
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan yang mengganggu atau tidak sesuai dengan fungsi pertahanan dan keamanan sesuai dengan ketentuan peraturan perundang-undangan"
                                            content2d.innerHTML ="Tidak Ada"
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;<br/>2. fasilitas parkir;<br/>3. sistem jaringan air bersih;<br/>4. sistem pengelolaan air limbah;<br/>5. jaringan drainase;<br/>6. pengelolaan persampahan;<br/>7. jaringan energi dan listrik; dan<br/>8. jaringan telekomunikasi."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Perumahan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH;<br/>2. kegiatan pembangunan dan pengembangan perumahan;<br/>3. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada kawasan perumahan di pesisir;<br/>4. bangunan pengendali air; dan<br/>5. kegiatan pembangunan prasarana dan sarana lingkungan perumahan sesuai dengan standar, hierarki dan skala pelayanannya.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan perdagangan dan jasa, serta kegiatan perkantoran dengan mempertimbangkan kajian lalu lintas;<br/>2. industri kecil dan menengah;<br/>3. kegiatan pariwisata di kawasan pesisir;83<br/>4. kawasan perumahan yang dibangun diatas kemiringan 15% wajib menggunakan rekayasa konstruksi serta memiliki KDH minimal 40%, KDB maksimal 60%, KLB Maksimal 1,2; dan<br/>5. kegiatan penunjang transportasi laut pada kawasan perumahan di wilayah pesisir."
                                            content2c.innerHTML ="Kegiatan yang dilarang, berupa kegiatan yang mempunyai intensitas besar yang mengganggu fungsi kawasan perumahan."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 8."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. penyediaan RTH minimal 10% dari luas kawasan perumahan yang dibangun oleh pengembang;<br/>2. jaringan jalan, penerangan jalan;<br/>3. jaringan air bersih;<br/>4. penyediaan sumur resapan air;<br/>5. penyediaan jalur evakuasi bencana dan tempat evakuasi bencana;<br/>6. jaringan telekomunikasi;<br/>7. jaringan energi dan listrik;<br/>8. jaringan drainase;<br/>9. sistem jaringan air limbah; dan<br/>10. sistem pengelolaan sampah."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Peruntukan Industri'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH dan jalur hijau sebagai penyangga fungsi antar kawasan;<br/>2. kegiatan pengembangan infrastruktur pengendalian abrasi dan  infiltrasi air laut pada kawasan peruntukan industri di wilayah pesisir;<br/>3. bangunan pengendali air; dan<br/>4. pengembangan sarana dan prasarana wilayah.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pembangunan permukiman perkotaan dan perkantoran;<br/>2. pengembangan/pembangunan sarana pendukung industri lainnya; dan<br/>3. kegiatan pertambangan mineral non logam, dan pertambangan batuan;<br/>4. kegiatan penunjang transportasi laut pada kawasan peruntukan  industri di wilayah pesisir; dan<br/>5. melakukan daur ulang air dan/atau penggunaan kembali air, mengolah air limbah sesuai dengan baku mutu yang dipersyaratkan, mengelola seluruh limbah yang ditimbulkan (emisi udara dan limbah B3), mengintegrasikan pengelolaan air  limbah air dengan rencana IPAL terpadu. "
                                            content2c.innerHTML ="TIdak Ada"
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDB maksimal sebesar 60%, KLB maksimal sebesar 6."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. penyediaan RTH minimal 10% dari luas kawasan;<br/>2. jaringan jalan dilengkapi dengan pedestrian dan perambuan;<br/>3. penyediaan sumber air baku industri;<br/>4. jaringan energi dan kelistrikan;<br/>5. jaringan telekomunikasi;<br/>6. sistem pengelolaan air limbah sesuai dengan ketentuan dan persyaratan teknis yang berlaku untuk kawasan peruntukan industri;<br/>7. jaringan drainase;<br/>8. pengelolaan persampahan; dan<br/>9. penyediaaan fasilitas pemadam kebakaran untuk kawasan industri."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Peruntukan Pertambangan Batuan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. kegiatan penggalian, pengerukan pasir industri, pemotongan batu;<br/>2. kegiatan pemecahan dan penghancuran batu dan kerikil, serta penghalusan batu kasar; dan<br/>3. kegiatan pasca tambang wajib dilakukan rehabilitasi (reklamasi dan/atau revitalisasi) sehingga dapat digunakan kembali untuk kegiatan lain, seperti ruang terbuka hijau, permukiman, pertanian, kehutanan, pariwisata dan lain sebagainya.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa kegiatan permukiman dengan jarak dari kegiatan eksploitasi antara 1 (satu) kilometer sampai dengan 2 (dua) kilometer bila menggunakan  bahan peledak, dan paling sedikit berjarak 500 (lima ratus) meter bila tanpa peledakan, untuk menghindari bahaya yang diakibatkan oleh gerakan tanah, pencemaran udara, serta kebisingan akibat lalumlintas pengangkutan bahan galian, mesin pemecah batu, dan ledakan dinamit."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan pertambanganmyang secara teknis, ekologis, sosial dan/atau budaya menimbulkanmkerusakan lingkungan, pencemaran lingkungan atau merugikan masyarakat sekitarnya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 40%,KDB maksimal sebesar 60%, KLB maksimal sebesar 1,2."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. sarana dan prasarana pendukung kegiatan pertambangan;<br/>2. jaringan energi dan listrik;<br/>3. penyediaan sumber air baku pertambangan; dan<br/>4. jaringan jalan."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Ruang Terbuka Non Hijau'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi kegiatan pemanfaatanruang untuk kegiatan berlangsungnya aktifitas masyarakat, kegiatan olahraga, kegiatan rekreasi, penyediaan plasa, monumen, tempat evakuasi bencana dan landmark.";
                                            content2b.innerHTML ="egiatan yang diperbolehkan dengan syarat meliputi</b><br/>1. kegiatan perdagangan dan jasa;<br/>2. kegiatan pemanfaatan ruang untuk sektor informal secara terbatas untuk menunjang kegiatan sebagaimana dimaksud huruf a; dan<br/>3. pembangunan sarana dan prasarana wilayah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan yang mengganggu kegiatan kawasan ruang terbuka non hijau."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 70%, KLB maksimal sebesar 1,4"
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;<br/>2. fasilitas parkir;<br/>3. fasilitas sanitasi;<br/>4. sistem pengelolaan sampah; dan<br/>5. aksesibilitas untuk difabel."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Tanaman Pangan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. aktifitas pendukung pertanian;<br/>2. kegiatan pariwisata berbasis pertanian;<br/>3. kegiatan pelestarian sumber daya air;";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:<br/>1. pengembangan sarana dan prasarana pendukung pengembangan pertanian tanaman pangan dengan memperhatikan daya dukung kawasan; </b><br/>2. kegiatan industri pengolahan hasil pertanian tanaman pangan;<br/>3. pengembangan perumahan berkepadatan rendah yang tidak mengganggu fungsi utama;<br/>4. kegiatan perikanan budidaya pada lahan yang tidak termasuk ke dalam KP2B;<br/>5. kegiatan peternakan yang tidak mencemari lingkungan pada lahan yang tidak termasuk KP2B;<br/>6. pengembangan teknik konservasi lahan pertanian yang bersifat ramah lingkungan dan berkelanjutan;<br/>7. pengembangan budidaya tanaman tahunan/perkebunan dan kebun campuran/ladang; dan<br/>8. kegiatan pengembangan sarana dan prasarana wilayah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b><br/>1. pengembangan kegiatan yang berpotensi merusak kesuburan tanah dan mengurangi unsur hara yang dibutuhkan tanaman pangan;<br/>2. mendirikan bangunan yang mengganggu saluran irigasi; dan<br/>3. alih fungsi lahan yang telah ditetapkan sebagai kawasan KP2B kecuali pengadaan tanah untuk kepentingan umum dan terjadi bencana sesuai dengan peraturan perundang-undangan."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%,  KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. jaringan irigasi dan utilitas; dan<br/>2. jaringan jalan lingkungan untuk jalan usaha tani."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Kawasan Transportasi'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH;<br/>2. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada transportasi laut;<br/>3. bangunan pengendali air pada transportasi laut;<br/>4. kegiatan operasional, penunjang operasional, dan pengembangan kawasan transportasi untuk mendukung pergerakan orang dan barang; dan<br/>5. penyediaan jalur dan tempat evakuasi bencana.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi kegiatan selain sebagaimana dimaksud dalam huruf a yang tidak mengganggu keamanan dan keselamatan lalu lintas."
                                            content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan yang mengakibatkan terganggunya fungsi kawasan transportasi."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 8."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;88<br/>2. jaringan air bersih;<br/>3. jaringan energi dan listrik;<br/>4. jaringan telekomunikasi;<br/>5. jaringan drainase;<br/>6. sistem jaringan air limbah dan sistem pengelolaan sampah; dan<br/>7. aksesibilitas untuk difabel."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                            }
                                        else if (data2 == 'Pemakaman'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        else if (data2 == 'Taman Hutan Raya'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. penelitian dan pengembangan ilmu pengetahuan dan teknologi;<br/>2. pendidikan dan peningkatan kesadartahuan konservasi;<br/>3. koleksi kekayaan keanekaragaman hayati;74<br/>4. penyimpanan dan/atau penyerapan karbon, pemanfaatan air, energi air, angin, panas matahari, panas bumi, dan wisata alam;<br/>5. pemanfaatan tumbuhan dan satwa liar dalam rangka menunjang budidaya dalam bentuk penyediaan Plasma Nutfah;<br/>6. pemanfaatan tradisional oleh masyarakat setempat; dan<br/>7. pembinaan populasi melalui Penangkaran dalam rangka pengembangbiakan satwa atau perbanyakan tumbuhan secara buatan dalam lingkungan yang semi alami.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan latihan militer tanpa mengurangi fungsi kawasan hutan dan tutupan vegetasi;<br/>2. diperbolehkan terbatas pendirian bangunan yang merupakan bagian dari suatu jaringan atau transmisi bagi kepentingan umum yang keberadaannya telah mendapat persetujuan dari instansi terkait; dan<br/>3. pengembangan RTH yang tetap memperhatikan fungsi konservasi."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b><br/>1. seluruh kegiatan yang berpotensi mengurangi luas taman hutan raya dan tutupan vegetasi; dan<br/>2. seluruh kegiatan yang berpotensi mengganggu dan merusak ekosistem taman hutan raya."
                                            content2d.innerHTML ="Tidak Ada"
                                            content2e.innerHTML ="Sarana dan prasarana minimum sesuai dengan ketentuan perundang-undangan bidang kehutanan."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        else if (data2 == 'Taman Kecamatan'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        else if (data2 == 'Taman Kota'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                            content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        else if (data2 == 'Taman Pulau Kecil'){
                                            content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu perlindungan ekosistem pulau-pulau kecil;";
                                            content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemanfaatan ruang untuk penelitian, pendidikan dan pariwisata;<br/>2. pembangunan sarana penunjang pariwisata; dan<br/>3. pengembangan permukiman penduduk lokal beserta sarana dan prasarana pendukungnya yang selaras dengan konsep ekowisata."
                                            content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu fungsi dan kegiatan yang merusak ekosistem pulau-pulau kecil;  "
                                            content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 75%, KDB maksimal sebesar 25%, KLB maksimal sebesar 0,75."
                                            content2e.innerHTML ="Sarana dan prasarana minimum berupa jaringan jalan yang lengkapi dengan jalur pedestrian, dan penerangan jalan"
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        if (data3 == 'K02A'){
                                            content3a.innerHTML =  "<b>Ketentuan khusus kawasan yang ditetapkan sebagai Kawasan Pertanian Pangan Berkelanjutan (KP2B) meliputi:</b><br/> <br/><b>a. diperbolehkan kegiatan penunjang pertanian;</b><br/><br/><b>b. dalam hal untuk kepentingan umum dan/atau Proyek Strategis Nasional, Lahan Pertanian Pangan Berkelanjutan dapat dialihfungsikan dan dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan;</b><br/><br/><b>c. pengalihfungsian lahan yang sudah ditetapkan sebagai Lahan Pertanian Pangan Berkelanjutan untuk kepentingan umum sebagaimana dimaksud pada huruf b hanya dapat dilakukan dengan syarat:</b><br/>1. dilakukan kajian kelayakan strategis;<br/>2. disusun rencana alih fungsi lahan;<br/>3. dibebaskan kepemilikan haknya dari pemilik; dan<br/>4. disediakan lahan pengganti terhadap Lahan Pertanian Pangan Berkelanjutan yang dialihfungsikan.<br/><br/><b>d. dalam hal terjadi bencana sehingga mengakibatkan hilang atau rusaknya infrastruktur secara permanen dan pembangunan infrastruktur pengganti tidak dapat ditunda, maka alih fungsi Lahan Pertanian Pangan Berkelanjutan dapat dilakukan dengan ketentuan:</b><br/>1. membebaskan kepemilikan hak atas tanah dengan pemberian ganti rugi sesuai dengan ketentuan peraturan perundang-undangan; dan<br/>2. menyediakan lahan pengganti terhadap Lahan Pertanian Pangan Berkelanjutan yang dialihfungsikan paling lama 24 (dua puluh empat) bulan setelah alih fungsi dilakukan.</b>";
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }

                                        if (data4 == 'Rawan Gerakan Tanah Tingkat Tinggi'){
                                            content3b.innerHTML =  "<b>a. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan hutan lindung, berupa penerapan teknik pengendalian gerakan tanah dan stabilisasi tanah dengan metode vegetatif dengan tepat sasaran (dipilahkan antara bagian kaki, bagian tengah, dan bagian atas lereng) maupun bangunan.</b><br/><br/><b>b. ketentuan khusus kawasan rawan gerakan tanah tinggi pada imbuhan air tanah meliputi:</b><br/>1. tidak diperkenankan adanya alih fungsi lahan;<br/>2. penerapan teknik pengendalian gerakan tanah metode vegetatif yang mampu menyerap air dan menahan erosi tanah; dan<br/>3. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>c. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan jalur hijau meliputi:</b><br/>1. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yang cukup tinggi dan mudah diakses; dan<br/>2. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>d. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan peruntukan industri meliputi:</b><br/>1. tidak diperkenankan penambahan bangunan, kecuali untuk kepentingan pemantauan ancaman bencana;<br/>2. bangunan wajib menggunakan rekayasa konstruksi dan adaptasi dengan permasalahan kawasan;<br/>3. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yangmudah diakses; dan<br/>4. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>e. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan perumahan meliputi:</b><br/>1. tidak diperkenankan penambahan bangunan, kecuali untuk kepentingan pemantauan ancaman bencana;<br/>2. bangunan wajib menggunakan rekayasa konstruksi dan adaptasi dengan permasalahan kawasan;<br/>3. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yangmudah diakses; dan<br/>4. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.";
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        else if (data4 == 'Rawan Tsunami Tingkat Tinggi'){
                                            content3b.innerHTML =  "<b>a. ketentuan khusus kawasan rawan bencana tsunami tingkat tinggi pada perlindungan setempat, kawasan ekosistem mangrove, pemakaman, dan jalur hijau meliputi:</b><br/>1. penyediaan infrastruktur tembok penahan gelombang pada garis pantai yang beresiko;<br/>2. penanaman mangrove serta tanaman lainnya sebagai upaya mitigasi bencana tsunami;<br/>3. pembangunan sistem peringatan dini tsunami dan ramburambu peringatan bencana; dan<br/>4. penyediaan jalur evakuasi bencana<br/><br/><b>b. ketentuan khusus kawasan rawan bencana tsunami tingkat tinggi pada kawasan perikanan budidaya, kawasan peruntukan industri, kawasan pariwisata, kawasan perumahan, kawasan fasilitas umum dan fasilitas sosial, kawasan perdagangan dan jasa, kawasan perkantoran, kawasan transportasi, infrastruktur perkotaan, dan kawasan pertahanan dan keamanan meliputi:</b><br/>1. penyediaan infrastruktur tembok penahan gelombang pada garis pantai yang beresiko;90<br/>2. penguatan struktur bangunan;<br/>3. penanaman mangrove serta tanaman lainnya sebagai upaya mitigasi bencana tsunami;<br/>4. penyediaan jalur evakuasi bencana;<br/>5. pembangunan tempat evakuasi sementara minimal 3 (tiga) lantai dan mudah diakses; dan<br/>6. pembangunan sistem peringatan dini tsunami dan ramburambu peringatan bencana.";
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }
                                        if (data5 == 'Ada'){
                                            content3c.innerHTML =  "<b>Ketentuan khusus kawasan resapan air meliputi:</b> <br/>a. kegiatan budidaya yang diperkenankan adalah kegiatan wisata alam, budidaya tanaman keras, budidaya hasil hutan, dan bangunan pendukung kawasan; <br/>b. tidak diperbolehkan melakukan kegiatan penambangan;<br/>c. pada kawasan yang telah terbangun dikendalikan dengan tidak  mengeluarkan izin pembangunan baru serta izin pertambangan baru;  <br/>d. bangunan mengikuti kontur tanah dan berbentuk rumah panggung;  <br/>e. diperbolehkan bangunan eksisting yang telah memiliki izin; dan<br/>f. pengembangan vegetasi tanaman yang mampu menyerap air dan menahan erosi tanah.";
                                            popup.setPosition(evt.coordinate);
                                            container.style.display = "block";
                                                }




                                                $('#sidebar2').removeClass('collapsed')


                                                if( $('#li2').hasClass('active')){
                                                    $('#li1').removeClass('active')
                                                }
                                                else if( $('#li3').hasClass('active')){
                                                    $('#li1').removeClass('active')
                                                }
                                                else if( $('#li1').hasClass('active')){
                                                    $('#li1').addClass('active')
                                                }

                                    }

                                    else if(layerinfo == 'klikpr:jaringan_jalan'){
                                        var feature = data.features[0];
                                        var props = feature.properties;
                                        content0.innerHTML = "<b>Jenis :</b> " + props.namobj + ""
                                        popup.setPosition(evt.coordinate);
                                        container.style.display = "block";

                                    }






                                    }


                            });
                    }
                }
            }
        });












    }
});
// start : FeatureInfo Control





// start : Length and Area Measurement Control
var lengthButton = document.createElement('button');
lengthButton.innerHTML = '<img src="map/resources/images/measure-length.png" alt="" class="myImg"></img>';
lengthButton.className = 'myButton';
lengthButton.id = 'lengthButton';
lengthButton.title = 'Measure Length';

var lengthElement = document.createElement('div');
lengthElement.className = 'myButtonDiv';
lengthElement.appendChild(lengthButton);
toolbarDivElement.appendChild(lengthElement);

var lengthFlag = false;
lengthButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    lengthButton.classList.toggle('clicked');
    lengthFlag = !lengthFlag;
    document.getElementById("map").style.cursor = "default";
    if (lengthFlag) {
        map.removeInteraction(draw);
        addInteraction('LineString');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
    }

})

var areaButton = document.createElement('button');
areaButton.innerHTML = '<img src="map/resources/images/measure-area.png" alt="" class="myImg"></img>';
areaButton.className = 'myButton';
areaButton.id = 'areaButton';
areaButton.title = 'Measure Area';

var areaElement = document.createElement('div');
areaElement.className = 'myButtonDiv';
areaElement.appendChild(areaButton);
toolbarDivElement.appendChild(areaElement);

var areaFlag = false;
areaButton.addEventListener("click", () => {
    // disableOtherInteraction('areaButton');
    areaButton.classList.toggle('clicked');
    areaFlag = !areaFlag;
    document.getElementById("map").style.cursor = "default";
    if (areaFlag) {
        map.removeInteraction(draw);
        addInteraction('Polygon');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
    }
})

/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = 'Click to continue polygon, Double click to complete';

/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue line, Double click to complete';

var draw; // global so we can remove it later

var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33',
            }),
        }),
    }),
});

map.addLayer(vector);

function addInteraction(intType) {

    draw = new ol.interaction.Draw({
        source: source,
        type: intType,
        style: interactionStyle
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    /**
     * Currently drawn feature.
     * @type {import("../src/ol/Feature.js").default}
     */
    var sketch;

    /**
     * Handle pointer move.
     * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
     */
    var pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Click to start drawing';

        if (sketch) {
            var geom = sketch.getGeometry();
            // if (geom instanceof ol.geom.Polygon) {
            //   helpMsg = continuePolygonMsg;
            // } else if (geom instanceof ol.geom.LineString) {
            //   helpMsg = continueLineMsg;
            // }
        }

        //helpTooltipElement.innerHTML = helpMsg;
        //helpTooltip.setPosition(evt.coordinate);

        //helpTooltipElement.classList.remove('hidden');
    };

    map.on('pointermove', pointerMoveHandler);

    // var listener;
    draw.on('drawstart', function (evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        //listener = sketch.getGeometry().on('change', function (evt) {
        sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        //ol.Observable.unByKey(listener);
    });
}


/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
var helpTooltipElement;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
var helpTooltip;

/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
}

//  map.getViewport().addEventListener('mouseout', function () {
//    helpTooltipElement.classList.add('hidden');
//  });

/**
* The measure tooltip element.
* @type {HTMLElement}
*/
var measureTooltipElement;


/**
* Overlay to show the measurement.
* @type {Overlay}
*/
var measureTooltip;

/**
 * Creates a new measure tooltip
 */

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);
}

/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function (line) {
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function (polygon) {
    var area = ol.sphere.getArea(polygon);
    var output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};
// end : Length and Area Measurement Control



// start : attribute query
if (session == 'Developer' | session == 'Super Admin' | session == 'Admin'){
var qryButton = document.createElement('button');
qryButton.innerHTML = '<img src="map/resources/images/query.svg" alt="" class="myImg"></img>';
qryButton.className = 'myButton';
qryButton.id = 'qryButton';
qryButton.title = 'Attribute Query';

var qryElement = document.createElement('div');
qryElement.className = 'myButtonDiv';
qryElement.appendChild(qryButton);
toolbarDivElement.appendChild(qryElement);

var qryFlag = false;
qryButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    qryButton.classList.toggle('clicked');
    qryFlag = !qryFlag;
    document.getElementById("map").style.cursor = "default";
    if (qryFlag) {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        document.getElementById("map").style.cursor = "default";
        document.getElementById("attQueryDiv").style.display = "block";

        bolIdentify = false;

        addMapLayerList('selectLayer');
    } else {
        document.getElementById("map").style.cursor = "default";
        document.getElementById("attQueryDiv").style.display = "none";

        document.getElementById("attListDiv").style.display = "none";

        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
    }

})

var markerFeature;
function addInteractionForSpatialQuery(intType) {
    draw = new ol.interaction.Draw({
        source: clickSelectedFeatureOverlay.getSource(),
        type: intType,
        style: interactionStyle
    });
    map.addInteraction(draw);

    draw.on('drawend', function (e) {
        markerFeature = e.feature;
        markerFeature.set('geometry', markerFeature.getGeometry());
        map.removeInteraction(draw);
        document.getElementById('spUserInput').classList.toggle('clicked');
        map.addLayer(clickSelectedFeatureOverlay);
    })
}


function selectFeature(evt) {
    if (featureOverlay) {
        featureOverlay.getSource().clear();
        map.removeLayer(featureOverlay);
    }
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (selectedFeature) {
        featureOverlay.getSource().addFeature(selectedFeature);
    }
}

function addMapLayerList(selectElementName) {
    $('#editingLayer').empty();
    $('#selectLayer').empty();
    $('#buffSelectLayer').empty();


    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "https://" + serverPort + "/geoserver/wfs?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
                var select = $('#' + selectElementName);
                select.append("<option class='ddindent' value=''></option>");
                $(xml).find('FeatureType').each(function () {
                    $(this).find('Name').each(function () {
                        var value = $(this).text();
                        if (layerList.includes(value)) {
                            select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                        }
                    });
                });
            }
        });
    });

};


function newpopulateQueryTable(url) {
    if (typeof attributePanel !== 'undefined') {
        if (attributePanel.parentElement !== null) {
            attributePanel.close();
        }
    }
    $.getJSON(url, function (data) {
        var col = [];
        col.push('id');
        for (var i = 0; i < data.features.length; i++) {

            for (var key in data.features[i].properties) {

                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        table.setAttribute("class", "table table-bordered table-hover table-condensed");
        table.setAttribute("id", "attQryTable");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.features.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j == 0) { tabCell.innerHTML = data.features[i]['id']; }
                else {
                    tabCell.innerHTML = data.features[i].properties[col[j]];
                }
            }
        }

        // var tabDiv = document.createElement("div");
        var tabDiv = document.getElementById('attListDiv');

        var delTab = document.getElementById('attQryTable');
        if (delTab) {
            tabDiv.removeChild(delTab);
        }

        tabDiv.appendChild(table);

        document.getElementById("attListDiv").style.display = "block";


    });
};

function newaddGeoJsonToMap(url) {

    if (queryGeoJSON) {
        queryGeoJSON.getSource().clear();
        map.removeLayer(queryGeoJSON);
    }

    queryGeoJSON = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON()
        }),
        style: querySelectedFeatureStyle,

    });

    queryGeoJSON.getSource().on('addfeature', function () {
        map.getView().fit(
            queryGeoJSON.getSource().getExtent(),
            { duration: 1590, size: map.getSize(), maxZoom: 21 }
        );
    });
    map.addLayer(queryGeoJSON);
};

function newaddRowHandlers() {
    var attTable = document.getElementById("attQryTable");
    // var rows = document.getElementById("attQryTable").rows;
    var rows = attTable.rows;
    var heads = attTable.getElementsByTagName('th');
    var col_no;
    for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
        if (head.innerHTML == 'id') {
            col_no = i + 1;
        }

    }
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function () {
            return function () {
                clickSelectedFeatureOverlay.getSource().clear();

                $(function () {
                    $("#attQryTable td").each(function () {
                        $(this).parent("tr").css("background-color", "white");
                    });
                });
                var cell = this.cells[col_no - 1];
                var id = cell.innerHTML;
                $(document).ready(function () {
                    $("#attQryTable td:nth-child(" + col_no + ")").each(function () {
                        if ($(this).text() == id) {
                            $(this).parent("tr").css("background-color", "#d1d8e2");
                        }
                    });
                });

                var features = queryGeoJSON.getSource().getFeatures();

                for (i = 0; i < features.length; i++) {
                    if (features[i].getId() == id) {
                        clickSelectedFeatureOverlay.getSource().addFeature(features[i]);

                        clickSelectedFeatureOverlay.getSource().on('addfeature', function () {
                            map.getView().fit(
                                clickSelectedFeatureOverlay.getSource().getExtent(),
                                { duration: 1500, size: map.getSize(), maxZoom: 24 }
                            );
                        });

                    }
                }
            };
        }(rows[i]);
    }
}
}else{

}
// end : attribute query


// start : spatial query
if (session == 'Developer' | session == 'Super Admin' | session == 'Admin'){
var bufferButton = document.createElement('button');
bufferButton.innerHTML = '<img src="map/resources/images/mapSearch.png" alt="" class="myImg"></img>';
bufferButton.className = 'myButton';
bufferButton.id = 'bufferButton';
bufferButton.title = 'Spatial Query';

var bufferElement = document.createElement('div');
bufferElement.className = 'myButtonDiv';
bufferElement.appendChild(bufferButton);
toolbarDivElement.appendChild(bufferElement);

var bufferFlag = false;
bufferButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    bufferButton.classList.toggle('clicked');
    bufferFlag = !bufferFlag;
    document.getElementById("map").style.cursor = "default";
    if (bufferFlag) {
        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        document.getElementById("map").style.cursor = "default";
        document.getElementById("spQueryDiv").style.display = "block";

        addMapLayerList_spQry();
    } else {
        document.getElementById("map").style.cursor = "default";
        document.getElementById("spQueryDiv").style.display = "none";
        document.getElementById("attListDiv").style.display = "none";

        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        map.removeInteraction(draw);
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

})

function addMapLayerList_spQry() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "https://" + serverPort + "/geoserver/wfs?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
                var select = $('#buffSelectLayer');
                select.append("<option class='ddindent' value=''></option>");
                $(xml).find('FeatureType').each(function () {
                    $(this).find('Name').each(function () {
                        var value = $(this).text();
                        if (layerList.includes(value)) {
                            select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                        }
                    });
                });
            }
        });
    });

};
}else {

}
// end : spatial query



// start : start editing Control
if (session == 'Developer' | session == 'Super Admin'){
var editgeojson;
var editattribute;
var editLayer;
var modifiedFeatureList = [];
var modifiedAttributeList = [];
var editTask;
var editTaskName;
var modifiedFeature = false;
var modifyInteraction;
var featureAdd;
var snap_edit;
var selectedFeatureOverlay = new ol.layer.Vector({
    title: 'Selected Feature',
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle
});

var startEditingButton = document.createElement('button');
startEditingButton.innerHTML = '<img src="map/resources/images/edit.png" alt="" class="myImg"></img>';
startEditingButton.className = 'myButton';
startEditingButton.id = 'startEditingButton';
startEditingButton.title = 'Start Editing';

var startEditingElement = document.createElement('div');
startEditingElement.className = 'myButtonDiv';
startEditingElement.appendChild(startEditingButton);
toolbarDivElement.appendChild(startEditingElement);

var startEditingFlag = false;
startEditingButton.addEventListener("click", () => {
    startEditingButton.classList.toggle('clicked');
    startEditingFlag = !startEditingFlag;
    document.getElementById("map").style.cursor = "default";
    if (startEditingFlag) {
        document.getElementById("editingControlsDiv").style.display = "block";
        editLayer = document.getElementById('editingLayer').value;
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 0)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00FFFF',
                width: 1
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#00FFFF'
                })
            })
        });

        if (editgeojson) {
            editgeojson.getSource().clear();
            map.removeLayer(editgeojson);
        }

        editgeojson = new ol.layer.Vector({
            title: "Edit Layer",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/ows?service=WFS&' +
                        'version=1.0.0&request=GetFeature&typeName=' + editLayer + '&' +
                        'outputFormat=application/json&srsname=EPSG:32748&' +
                        'bbox=' + extent.join(',') + ',EPSG:32748';
                },

                strategy: ol.loadingstrategy.bbox
            }),

            style: style,
        });
        map.addLayer(editgeojson);

    } else {
        document.getElementById("editingControlsDiv").style.display = "none";
        editgeojson.getSource().clear();
        map.removeLayer(editgeojson);
    }
})
}else{

}
// end : start editing Control

// start : add feature control

var editingControlsDivElement = document.getElementById('editingControlsDiv');

var addFeatureButton = document.createElement('button');
addFeatureButton.innerHTML = '<img src="map/resources/images/editAdd.png" alt="" class="myImg"></img>';
addFeatureButton.className = 'myButton';
addFeatureButton.id = 'addFeatureButton';
addFeatureButton.title = 'Add Feature';

var addFeatureElement = document.createElement('div');
addFeatureElement.className = 'myButtonDiv';
addFeatureElement.id = 'addFeatureButtonDiv';
addFeatureElement.appendChild(addFeatureButton);
editingControlsDivElement.appendChild(addFeatureElement);

var addFeatureFlag = false;
addFeatureButton.addEventListener("click", () => {
    addFeatureButton.classList.toggle('clicked');
    addFeatureFlag = !addFeatureFlag;
    document.getElementById("map").style.cursor = "default";
    if (addFeatureFlag) {
        if (modifiedFeatureList) {
            if (modifiedFeatureList.length > 0) {
                var answer = confirm('Save edits?');
                if (answer) {
                    saveEdits(editTask);
                    modifiedFeatureList = [];
                } else {
                    // cancelEdits();
                    modifiedFeatureList = [];
                }

            }
        }
        editTask = 'insert';
        addFeature();
    } else {
        if (modifiedFeatureList.length > 0) {
            var answer = confirm('You have unsaved edits. Do you want to save edits?');
            if (answer) {
                saveEdits(editTask);
                modifiedFeatureList = [];
            } else {
                // cancelEdits();
                modifiedFeatureList = [];
            }
        }

        map.un('click', modifyFeature);
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        modifiedFeature = false;
        map.removeInteraction(modifyInteraction);
        map.removeInteraction(snap_edit);
        editTask = '';


        if (modifyInteraction) {
            map.removeInteraction(modifyInteraction);
        }
        if (snap_edit) {
            map.removeInteraction(snap_edit);
        }
        if (drawInteraction) {
            map.removeInteraction(drawInteraction);
        }
    }
})

function addFeature(evt) {
    if (clickSelectedFeatureOverlay) {
        clickSelectedFeatureOverlay.getSource().clear();
        map.removeLayer(clickSelectedFeatureOverlay);
    }

    if (modifyInteraction) {
        map.removeInteraction(modifyInteraction);
    }
    if (snap_edit) {
        map.removeInteraction(snap_edit);
    }

    var interactionType;
    source_mod = editgeojson.getSource();
    drawInteraction = new ol.interaction.Draw({
        source: editgeojson.getSource(),
        type: editgeojson.getSource().getFeatures()[0].getGeometry().getType(),
        style: interactionStyle,
    });
    map.addInteraction(drawInteraction);
    snap_edit = new ol.interaction.Snap({
        source: editgeojson.getSource()
    });
    map.addInteraction(snap_edit);

    drawInteraction.on('drawend', function (e) {
        var feature = e.feature;
        feature.set('geometry', feature.getGeometry());
        modifiedFeatureList.push(feature);
    })

}

// end : add feature control

// start : Modify Feature Control
var modifyFeatureButton = document.createElement('button');
modifyFeatureButton.innerHTML = '<img src="map/resources/images/editModify.svg" alt="" class="myImg"></img>';
modifyFeatureButton.className = 'myButton';
modifyFeatureButton.id = 'modifyFeatureButton';
modifyFeatureButton.title = 'Modify Feature';

var modifyFeatureElement = document.createElement('div');
modifyFeatureElement.className = 'myButtonDiv';
modifyFeatureElement.id = 'modifyFeatureButtonDiv';
modifyFeatureElement.appendChild(modifyFeatureButton);
editingControlsDivElement.appendChild(modifyFeatureElement);

var modifyFeatureFlag = false;
modifyFeatureButton.addEventListener("click", () => {
    modifyFeatureButton.classList.toggle('clicked');
    modifyFeatureFlag = !modifyFeatureFlag;
    document.getElementById("map").style.cursor = "default";
    if (modifyFeatureFlag) {
        modifiedFeatureList = [];
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        map.on('click', modifyFeature);
        editTask = 'update';
    } else {
        if (modifiedFeatureList.length > 0) {
            var answer = confirm('Save edits?');
            if (answer) {
                saveEdits(editTask);
                modifiedFeatureList = [];
            } else {
                // cancelEdits();
                modifiedFeatureList = [];
            }
        }
        map.un('click', modifyFeature);
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        modifiedFeature = false;
        map.removeInteraction(modifyInteraction);
        map.removeInteraction(snap_edit);
        editTask = '';
    }
})

function modifyFeature(evt) {
    selectedFeatureOverlay.getSource().clear();
    map.removeLayer(selectedFeatureOverlay);
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (selectedFeature) {
        selectedFeatureOverlay.getSource().addFeature(selectedFeature);
    }
    var modifySource = selectedFeatureOverlay.getSource();
    modifyInteraction = new ol.interaction.Modify({
        source: modifySource
    });
    map.addInteraction(modifyInteraction);

    var sourceEditGeoJson = editgeojson.getSource();
    snap_edit = new ol.interaction.Snap({
        source: sourceEditGeoJson
    });
    map.addInteraction(snap_edit);
    modifyInteraction.on('modifyend', function (e) {
        modifiedFeature = true;
        featureAdd = true;
        if (modifiedFeatureList.length > 0) {

            for (var j = 0; j < modifiedFeatureList.length; j++) {
                if (e.features.item(0)['id_'] == modifiedFeatureList[j]['id_']) {
                    // modifiedFeatureList.splice(j, 1);
                    featureAdd = false;
                }
            }
        }
        if (featureAdd) { modifiedFeatureList.push(e.features.item(0)); }
    })
    // }
    // }
}

var clones = [];

function saveEdits(editTaskName) {
    clones = [];
    for (var i = 0; i < modifiedFeatureList.length; i++) {
        var feature = modifiedFeatureList[i];
        var featureProperties = feature.getProperties();

        delete featureProperties.boundedBy;
        var clone = feature.clone();
        clone.setId(feature.getId());

        // if (editTaskName != 'insert') {clone.setGeometryName('the_geom');}
        clones.push(clone)
        // if (editTaskName == 'insert') { transactWFS('insert', clone); }
    }

    if (editTaskName == 'update') { transactWFS('update_batch', clones); }
    if (editTaskName == 'insert') { transactWFS('insert_batch', clones); }

}


var formatWFS = new ol.format.WFS();


var transactWFS = function (mode, f) {

    var node;
    var formatGML = new ol.format.GML({
        // featureNS: 'http://argeomatica.com',
        featureNS: geoserverWorkspace,
        // featureType: 'playa_sample',
        featureType: editLayer,
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        srsName: 'EPSG:32748'
    });
    switch (mode) {
        case 'insert':
            node = formatWFS.writeTransaction([f], null, null, formatGML);
            break;
        case 'insert_batch':
            node = formatWFS.writeTransaction(f, null, null, formatGML);
            break;
        case 'update':
            node = formatWFS.writeTransaction(null, [f], null, formatGML);
            break;
        case 'update_batch':
            node = formatWFS.writeTransaction(null, f, null, formatGML);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
        case 'delete_batch':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
    }
    var xs = new XMLSerializer();
    var payload = xs.serializeToString(node);

    payload = payload.split('feature:' + editLayer).join(editLayer);
    if (editTask == 'insert') { payload = payload.split(geoserverWorkspace + ':geometry').join(geoserverWorkspace + ':geom'); }
    if (editTask == 'update') { payload = payload.split('<Name>geometry</Name>').join('<Name>geom</Name>'); }
    // payload = payload.replace(/feature:editLayer/g, editLayer);

    $.ajax('https://'+serverPort+'/geoserver/wfs', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload.trim(),
        success: function (data) {
            // console.log('building updated');
        },
        error: function (e) {
            var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
            alert('Error saving this feature to GeoServer.<br><br>'
                + errorMsg);
        }
    }).done(function () {

        editgeojson.getSource().refresh();

    });
};
// end : Modify Feature Control










// start : Modify Attribute
var modifyAttributeButton = document.createElement('button');
modifyAttributeButton.innerHTML = '<img src="map/resources/images/query.svg" alt="" class="myImg"></img>';
modifyAttributeButton.className = 'myButton';
modifyAttributeButton.id = 'modifyFeatureButton';
modifyAttributeButton.title = 'Modify Attribute';

var modifyAttributeElement = document.createElement('div');
modifyAttributeElement.className = 'myButtonDiv';
modifyAttributeElement.id = 'modifyAttributeButtonDiv';
modifyAttributeElement.appendChild(modifyAttributeButton);
editingControlsDivElement.appendChild(modifyAttributeElement);

var modifyAttributeFlag = false;
modifyAttributeButton.addEventListener("click", () => {
modifyAttributeButton.classList.toggle('clicked');
modifyAttributeFlag = !modifyAttributeFlag;
document.getElementById("map").style.cursor = "default";


    if (modifyAttributeFlag) {
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        map.on('click', modifyAttribute);
        editTask = 'update';

    }else {
        document.getElementById("attListDiv").style.display = "none";
            if (modifiedAttributeList.length > 0) {
                var answer = confirm('Save edits?');
                if (answer) {
                    saveEdits(editTask);
                    modifiedAttributeList = [];
                } else {
                    // cancelEdits();
                    modifiedAttributeList = [];
                }
            }
            map.un('click', modifyAttribute);
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            modifiedFeature = false;
            map.removeInteraction(modifyInteraction);
        }
    }

)


function modifyAttribute(evt) {
    selectedFeatureOverlay.getSource().clear();
    map.removeLayer(selectedFeatureOverlay);
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

        selectedFeatureOverlay.getSource().addFeature(selectedFeature);
        var modifyAttributeSource = new ol.layer.Image({
            visible: false,
            source: new ol.source.ImageWMS({
                url: 'https://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
                params: { 'LAYERS': editLayer },
                serverType: 'geoserver',
            })
        });
        var resolution = mapView.getResolution();
        var url = modifyAttributeSource.getSource().getFeatureInfoUrl(evt.coordinate, resolution,
            'EPSG:32748', { 'INFO_FORMAT': 'application/json' });
           //console.log(url)

           $.getJSON(url, function (data) {
            var col = [];
            col.push('id');
            for (var i = 0; i < data.features.length; i++) {

                for (var key in data.features[i].properties) {

                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }


            var table = document.createElement('table');      // Create the table elemen
            var tableBody = document.createElement('tbody');
            table.setAttribute("class", "table table-bordered table-grid table-hover table-condensed table-sm table-responsive-sm");

            // TABLE ROW.
            for (var i = 0; i < col.length; i++) {
                var row = document.createElement('tr');     // Create a row for each nested array
                var cell = document.createElement('td');  // Make a cell for each element
                var th = document.createElement("th");      // TABLE HEADER.
                var input = document.createElement('input');
                th.appendChild(document.createTextNode(col[i]));
                th = th ?? 0;
                row.appendChild(th);             // Add the cell to the row
                th.setAttribute('id', 'header' + i);
                // row.setAttribute('style', 'font-weight:bold')
                cell.appendChild(document.createTextNode(data.features[0].properties[col[i]]));
                row.appendChild(cell);
                cell.setAttribute('id', 'data' + i);               // Add the cell to the row
                cell.setAttribute("contenteditable", true);
                tableBody.appendChild(row);

            }

            table.appendChild(tableBody);                     // Add the tbody to the table
            var tampil = document.body.appendChild(table);
            $("#feature-title").html("Edit Data Atribut");
            $("#feature-info").html(tampil);
            $("#featureModal").modal("show");
            dataAttribute = data.features[0].id

            $('.table td').contents().each(function() {
                if (this.textContent == 'null') {
                    this.textContent = '0'
                }

                else if (this.textContent == 'undefined') {
                    this.textContent = '0'
                }
                else {

                }
            })

        });



            // }
    // }
}



function getdataatt(){

    valuedata1 = $("#data0").text();
    console.log()
}





function saveEdits2() {

    //data
    var znt_bpn_valuedata0 = $("#data0").text();
    var znt_bpn_valuedata1 = $("#data1").text();
    var znt_bpn_valuedata2 = $("#data2").text();
    var znt_bpn_valuedata3 = $("#data3").text();
    var znt_bpn_valuedata4 = $("#data4").text();
    var znt_bpn_valuedata5 = $("#data5").text();
    var znt_bpn_valuedata6 = $("#data6").text();
    var znt_bpn_valuedata7 = $("#data7").text();
    var znt_bpn_valuedata8 = $("#data8").text();
    var znt_bpn_valuedata9 = $("#data9").text();
    var znt_bpn_valuedata10 = $("#data9").text();
    var znt_bpn_valuedata11 = $("#data11").text();
    var znt_bpn_valuedata12 = $("#data12").text();
    var znt_bpn_valuedata13 = $("#data13").text();
    var znt_bpn_valuedata14 = $("#data14").text();
    var znt_bpn_valuedata15 = $("#data15").text();
    var znt_bpn_valuedata16 = $("#data16").text();
    var znt_bpn_valuedata17 = $("#data17").text();
    var znt_bpn_valuedata18 = $("#data18").text();
    var znt_bpn_valuedata19 = $("#data19").text();
    var znt_bpn_valuedata20 = $("#data20").text();
    var znt_bpn_valuedata21 = $("#data21").text();

    var znt_bpn_valueheader0 = $("#header0").text();
    var znt_bpn_valueheader1 = $("#header1").text();
    var znt_bpn_valueheader2 = $("#header2").text();
    var znt_bpn_valueheader3 = $("#header3").text();
    var znt_bpn_valueheader4 = $("#header4").text();
    var znt_bpn_valueheader5 = $("#header5").text();
    var znt_bpn_valueheader6 = $("#header6").text();
    var znt_bpn_valueheader7 = $("#header7").text();
    var znt_bpn_valueheader8 = $("#header8").text();
    var znt_bpn_valueheader9 = $("#header9").text();
    var znt_bpn_valueheader10 = $("#header10").text();
    var znt_bpn_valueheader11 = $("#header11").text();
    var znt_bpn_valueheader12 = $("#header12").text();
    var znt_bpn_valueheader13 = $("#header13").text();
    var znt_bpn_valueheader14 = $("#header14").text();
    var znt_bpn_valueheader15 = $("#header15").text();
    var znt_bpn_valueheader16 = $("#header16").text();
    var znt_bpn_valueheader17 = $("#header17").text();
    var znt_bpn_valueheader18 = $("#header18").text();
    var znt_bpn_valueheader19 = $("#header19").text();
    var znt_bpn_valueheader20 = $("#header20").text();
    var znt_bpn_valueheader21 = $("#header21").text();


     //data znt_bapenda
     var znt_bapenda_valuedata0 = $("#data0").text();
     var znt_bapenda_valuedata1 = $("#data1").text();
     var znt_bapenda_valuedata2 = $("#data2").text();
     var znt_bapenda_valuedata3 = $("#data3").text();
     var znt_bapenda_valuedata4 = $("#data4").text();
     var znt_bapenda_valuedata5 = $("#data5").text();
     var znt_bapenda_valuedata6 = $("#data6").text();
     var znt_bapenda_valuedata7 = $("#data7").text();
     var znt_bapenda_valuedata8 = $("#data8").text();
     var znt_bapenda_valuedata9 = $("#data9").text();
     var znt_bapenda_valuedata10 = $("#data9").text();
     var znt_bapenda_valuedata11 = $("#data11").text();
     var znt_bapenda_valuedata12 = $("#data12").text();
     var znt_bapenda_valuedata13 = $("#data13").text();
     var znt_bapenda_valuedata14 = $("#data14").text();
     var znt_bapenda_valuedata15 = $("#data15").text();
     var znt_bapenda_valuedata16 = $("#data16").text();
     var znt_bapenda_valuedata17 = $("#data17").text();
     var znt_bapenda_valuedata18 = $("#data18").text();
     var znt_bapenda_valuedata19 = $("#data19").text();
     var znt_bapenda_valuedata20 = $("#data20").text();
     var znt_bapenda_valuedata21 = $("#data21").text();
     var znt_bapenda_valuedata22 = $("#data22").text();
     var znt_bapenda_valuedata23 = $("#data23").text();
     var znt_bapenda_valuedata24 = $("#data24").text();
     var znt_bapenda_valuedata25 = $("#data25").text();

     var znt_bapenda_valueheader0 = $("#header0").text();
     var znt_bapenda_valueheader1 = $("#header1").text();
     var znt_bapenda_valueheader2 = $("#header2").text();
     var znt_bapenda_valueheader3 = $("#header3").text();
     var znt_bapenda_valueheader4 = $("#header4").text();
     var znt_bapenda_valueheader5 = $("#header5").text();
     var znt_bapenda_valueheader6 = $("#header6").text();
     var znt_bapenda_valueheader7 = $("#header7").text();
     var znt_bapenda_valueheader8 = $("#header8").text();
     var znt_bapenda_valueheader9 = $("#header9").text();
     var znt_bapenda_valueheader10 = $("#header10").text();
     var znt_bapenda_valueheader11 = $("#header11").text();
     var znt_bapenda_valueheader12 = $("#header12").text();
     var znt_bapenda_valueheader13 = $("#header13").text();
     var znt_bapenda_valueheader14 = $("#header14").text();
     var znt_bapenda_valueheader15 = $("#header15").text();
     var znt_bapenda_valueheader16 = $("#header16").text();
     var znt_bapenda_valueheader17 = $("#header17").text();
     var znt_bapenda_valueheader18 = $("#header18").text();
     var znt_bapenda_valueheader19 = $("#header19").text();
     var znt_bapenda_valueheader20 = $("#header20").text();
     var znt_bapenda_valueheader21 = $("#header21").text();
     var znt_bapenda_valueheader22 = $("#header22").text();
     var znt_bapenda_valueheader23 = $("#header23").text();
     var znt_bapenda_valueheader24 = $("#header24").text();
     var znt_bapenda_valueheader25 = $("#header25").text();

    // var url1 = 'http://'+serverPort+'/geoserver/wfs';
    // var postdata_znt_bapenda =
    // '<wfs:Transaction service="WFS" version="1.1.0"\n' +
    // 'xmlns:ogc="http://www.opengis.net/ogc"\n' +
    // 'xmlns:wfs="http://www.opengis.net/wfs"\n' +
    // 'xmlns:gml="http://www.opengis.net/gml"\n' +
    // 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    // 'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">\n' +
    // '<wfs:Update typeName="'+editLayer+'">\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader0+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata0+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader1+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata1+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader2+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata2+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader3+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata3+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader4+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata4+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader5+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata5+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader6+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata6+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader7+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata7+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader8+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata8+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader9+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata9+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader10+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata10+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader11+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata11+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader12+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata12+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader13+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata13+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader14+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata14+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader15+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata15+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader16+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata16+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader17+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata17+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader18+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata18+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader19+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata19+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader20+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata20+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader21+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata21+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader22+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata22+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader23+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata23+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader24+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata24+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bapenda_valueheader25+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bapenda_valuedata25+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<ogc:Filter>\n' +
    // '<ogc:FeatureId fid="' + dataAttribute + '"/>\n' +
    // '</ogc:Filter>\n' +
    // '</wfs:Update>\n' +
    // '</wfs:Transaction>\n';

    // var postdata_znt_bpn =
    // '<wfs:Transaction service="WFS" version="1.1.0"\n' +
    // 'xmlns:ogc="http://www.opengis.net/ogc"\n' +
    // 'xmlns:wfs="http://www.opengis.net/wfs"\n' +
    // 'xmlns:gml="http://www.opengis.net/gml"\n' +
    // 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    // 'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">\n' +
    // '<wfs:Update typeName="'+editLayer+'">\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader0+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata0+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader1+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata1+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader2+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata2+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader3+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata3+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader4+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata4+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader5+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata5+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader6+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata6+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader7+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata7+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader8+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata8+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader9+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata9+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader10+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata10+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader11+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata11+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader12+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata12+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader13+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata13+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader14+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata14+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader15+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata15+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader16+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata16+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader17+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata17+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader18+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata18+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader19+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata19+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader20+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata20+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<wfs:Property>\n' +
    // '<wfs:Name>'+znt_bpn_valueheader21+'</wfs:Name>\n' +
    // '<wfs:Value>'+znt_bpn_valuedata21+'</wfs:Value>\n' +
    // '</wfs:Property>\n' +
    // '<ogc:Filter>\n' +
    // '<ogc:FeatureId fid="' + dataAttribute + '"/>\n' +
    // '</ogc:Filter>\n' +
    // '</wfs:Update>\n' +
    // '</wfs:Transaction>\n';


    var postdata_znt_bpn =
   '<wfs:Transaction version="2.0.0" service="WFS"\n' +
   'xmlns:fes="http://www.opengis.net/fes/2.0"\n' +
   'xmlns:wfs="http://www.opengis.net/wfs/2.0"\n' +
   'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
   'xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0.0/wfs.xsd">\n' +
   '<wfs:Update typeName="'+editLayer+'">\n' +
      '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bpn_valueheader0+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bpn_valuedata0+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader1+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata1+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader2+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata2+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader3+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata3+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader4+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata4+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader5+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata5+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader6+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata6+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader7+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata7+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader8+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata8+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader9+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata9+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader10+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata10+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader11+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata11+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader12+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata12+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader13+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata13+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader14+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata14+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader15+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata15+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader16+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata16+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader17+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata17+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader18+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata18+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader19+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata19+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader20+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata20+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<wfs:Property>\n' +
        '<wfs:ValueReference>'+znt_bpn_valueheader21+'</wfs:ValueReference>\n' +
        '<wfs:Value>'+znt_bpn_valuedata21+'</wfs:Value>\n' +
      '</wfs:Property>\n' +
      '<fes:Filter>\n' +
         '<fes:ResourceId rid="' + dataAttribute + '"/>\n' +
      '</fes:Filter>\n' +
    '</wfs:Update>\n' +
    '</wfs:Transaction>\n';



    var postdata_znt_bapenda =
    '<wfs:Transaction version="2.0.0" service="WFS"\n' +
    'xmlns:fes="http://www.opengis.net/fes/2.0"\n' +
    'xmlns:wfs="http://www.opengis.net/wfs/2.0"\n' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    'xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0.0/wfs.xsd">\n' +
    '<wfs:Update typeName="'+editLayer+'">\n' +
       '<wfs:Property>\n' +
          '<wfs:ValueReference>'+znt_bapenda_valueheader0+'</wfs:ValueReference>\n' +
          '<wfs:Value>'+znt_bapenda_valuedata0+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader1+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata1+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader2+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata2+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader3+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata3+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader4+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata4+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader5+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata5+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader6+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata6+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader7+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata7+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader8+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata8+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader9+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata9+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader10+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata10+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader11+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata11+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader12+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata12+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader13+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata13+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader14+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata14+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader15+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata15+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader16+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata16+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader17+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata17+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader18+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata18+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader19+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata19+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader20+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata20+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader21+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata21+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader22+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata22+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader23+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata23+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader24+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata24+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<wfs:Property>\n' +
         '<wfs:ValueReference>'+znt_bapenda_valueheader25+'</wfs:ValueReference>\n' +
         '<wfs:Value>'+znt_bapenda_valuedata25+'</wfs:Value>\n' +
       '</wfs:Property>\n' +
       '<fes:Filter>\n' +
          '<fes:ResourceId rid="' + dataAttribute + '"/>\n' +
       '</fes:Filter>\n' +
     '</wfs:Update>\n' +
     '</wfs:Transaction>\n';


       //alert(postData);
    //    var req = new XMLhttpRequest();
    //    req.open("POST", url1, false);
    //    req.setRequestHeader('User-Agent', 'XMLhttp/1.0');
    //    req.setRequestHeader('Content-type', 'text/xml');
    //    req.onreadystatechange = function() {
    //        if (req.readyState != 4) return;
    //        if (req.status != 200 && req.status != 304) {
    //            alert('http error ' + req.status);
    //            return;
    //        }
    //        // req_res[i] = req.responseText;


    //        //alert(req.responseText);
    //        //  Ext.MessageBox.alert('Status', 'changes saved successfully');
    //    }
    //    if (req.readyState == 4) return;
    //  if (editLayer == 'gis_bapenda_pesawaran:znt_bpn'){req.send(`postdata_znt_bpn)}
    //  else if (editLayer == 'gis_bapenda_pesawaran:znt_bapenda'){req.send(postdata_znt_bapenda)}


if (editLayer == 'gis_bapenda_pesawaran:znt_bpn'){
$.ajax('http://'+serverPort+'/geoserver/wfs', {
    type: 'POST',
    // dataType: 'text',
    // processData: false,
    // contentType: 'text/xml',
    headers: {
        "Content-Type": "text/xml;charset=utf-8",
        'User-Agent': 'XMLhttp/1.0'
    },
    data: postdata_znt_bpn,
    success: function (data) {
        // console.log('building updated');
        alert('Feature updated successfully');
    },
    error: function (e) {
        var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
        alert('Error saving this feature to GeoServer.<br><br>'
            + errorMsg);
    }
}).done(function () {

    editgeojson.getSource().refresh();
    closer.blur();
    featureOverlay.getSource().clear();

});
}

else if (editLayer == 'gis_bapenda_pesawaran:znt_bapenda'){

    $.ajax('http://'+serverPort+'/geoserver/wfs', {
        type: 'POST',
        // dataType: 'text',
        // processData: false,
        // contentType: 'text/xml',
        headers: {
            "Content-Type": "text/xml;charset=utf-8",
            'User-Agent': 'XMLhttp/1.0'
        },
        data: postdata_znt_bapenda,
        success: function (data) {
            // console.log('building updated');
            alert('Feature updated successfully');
        },
        error: function (e) {
            var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
            alert('Error saving this feature to GeoServer.<br><br>'
                + errorMsg);
        }
    }).done(function () {


        editgeojson.getSource().refresh();
        closer.blur();
        featureOverlay.getSource().clear();

    });


}


   }
// end : Modify Atribute Control








function modifyFeature(evt) {
    selectedFeatureOverlay.getSource().clear();
    map.removeLayer(selectedFeatureOverlay);
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (selectedFeature) {
        selectedFeatureOverlay.getSource().addFeature(selectedFeature);
    }
    var modifySource = selectedFeatureOverlay.getSource();
    modifyInteraction = new ol.interaction.Modify({
        source: modifySource
    });
    map.addInteraction(modifyInteraction);

    var sourceEditGeoJson = editgeojson.getSource();
    snap_edit = new ol.interaction.Snap({
        source: sourceEditGeoJson
    });
    map.addInteraction(snap_edit);
    modifyInteraction.on('modifyend', function (e) {
        modifiedFeature = true;
        featureAdd = true;
        if (modifiedFeatureList.length > 0) {

            for (var j = 0; j < modifiedFeatureList.length; j++) {
                if (e.features.item(0)['id_'] == modifiedFeatureList[j]['id_']) {
                    // modifiedFeatureList.splice(j, 1);
                    featureAdd = false;
                }
            }
        }
        if (featureAdd) { modifiedFeatureList.push(e.features.item(0)); }
    })
    // }
    // }
}

var clones = [];

function saveEdits(editTaskName) {
    clones = [];
    for (var i = 0; i < modifiedFeatureList.length; i++) {
        var feature = modifiedFeatureList[i];
        var featureProperties = feature.getProperties();

        delete featureProperties.boundedBy;
        var clone = feature.clone();
        clone.setId(feature.getId());

        // if (editTaskName != 'insert') {clone.setGeometryName('the_geom');}
        clones.push(clone)
        // if (editTaskName == 'insert') { transactWFS('insert', clone); }
    }

    if (editTaskName == 'update') { transactWFS('update_batch', clones); }
    if (editTaskName == 'insert') { transactWFS('insert_batch', clones); }

}


var formatWFS = new ol.format.WFS();


var transactWFS = function (mode, f) {

    var node;
    var formatGML = new ol.format.GML({
        // featureNS: 'http://argeomatica.com',
        featureNS: geoserverWorkspace,
        // featureType: 'playa_sample',
        featureType: editLayer,
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        srsName: 'EPSG:32748'
    });
    switch (mode) {
        case 'insert':
            node = formatWFS.writeTransaction([f], null, null, formatGML);
            break;
        case 'insert_batch':
            node = formatWFS.writeTransaction(f, null, null, formatGML);
            break;
        case 'update':
            node = formatWFS.writeTransaction(null, [f], null, formatGML);
            break;
        case 'update_batch':
            node = formatWFS.writeTransaction(null, f, null, formatGML);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
        case 'delete_batch':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
    }
    var xs = new XMLSerializer();
    var payload = xs.serializeToString(node);

    payload = payload.split('feature:' + editLayer).join(editLayer);
    if (editTask == 'insert') { payload = payload.split(geoserverWorkspace + ':geometry').join(geoserverWorkspace + ':geom'); }
    if (editTask == 'update') { payload = payload.split('<Name>geometry</Name>').join('<Name>geom</Name>'); }
    // payload = payload.replace(/feature:editLayer/g, editLayer);

    $.ajax('http://'+serverPort+'/geoserver/wfs', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload.trim(),
        success: function (data) {
            // console.log('building updated');
        },
        error: function (e) {
            var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
            alert('Error saving this feature to GeoServer.<br><br>'
                + errorMsg);
        }
    }).done(function () {

        editgeojson.getSource().refresh();

    });
};
// end : Modify Atribute Control








// start : Delete feature control
var deleteFeatureButton = document.createElement('button');
deleteFeatureButton.innerHTML = '<img src="map/resources/images/editErase.svg" alt="" class="myImg"></img>';
deleteFeatureButton.className = 'myButton';
deleteFeatureButton.id = 'deleteFeatureButton';
deleteFeatureButton.title = 'Delete Feature';

var deleteFeatureElement = document.createElement('div');
deleteFeatureElement.className = 'myButtonDiv';
deleteFeatureElement.id = 'deleteFeatureButtonDiv';
deleteFeatureElement.appendChild(deleteFeatureButton);
editingControlsDivElement.appendChild(deleteFeatureElement);

var deleteFeatureFlag = false;
deleteFeatureButton.addEventListener("click", () => {
    deleteFeatureButton.classList.toggle('clicked');
    deleteFeatureFlag = !deleteFeatureFlag;
    document.getElementById("map").style.cursor = "default";
    if (deleteFeatureFlag) {
        modifiedFeatureList = [];
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        editTask = 'delete';
        map.on('click', selectFeatureToDelete);

    } else {
        if (modifiedFeatureList.length > 0) {
            var answer = confirm('You have unsaved edits. Do you want to save edits?');
            if (answer) {
                saveEdits(editTask);
                modifiedFeatureList = [];
            } else {
                // cancelEdits();
                modifiedFeatureList = [];
            }
        }
        map.un('click', selectFeatureToDelete);
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        modifiedFeature = false;
        // map.removeInteraction(modifyInteraction);
        // map.removeInteraction(snap_edit);
        editTask = '';
    }
})

function selectFeatureToDelete(evt) {
    clickSelectedFeatureOverlay.getSource().clear();
    map.removeLayer(clickSelectedFeatureOverlay);
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (selectedFeature) {
        // clickSelectedFeatureOverlay.getSource().addFeature(selectedFeature);
        clones = [];
        var answer = confirm('Do you want to delete selected feature?');
        if (answer) {
            var feature = selectedFeature;
            var featureProperties = feature.getProperties();

            delete featureProperties.boundedBy;
            var clone = feature.clone();
            clone.setId(feature.getId());

            // clone.setGeometryName('the_geom');
            clones.push(clone)
            if (editTask == 'update') { transactWFS('update_batch', clones); }
            if (editTask == 'insert') { transactWFS('insert_batch', clones); }
            if (editTask == 'delete') { transactWFS('delete', clone); }
        }

    }
}
// end : Delete feature control

// finally add all editing control to map
var editingControl = new ol.control.Control({
    element: editingControlsDivElement
})
map.addControl(editingControl);

// start : auto locate functions

var intervalAutolocate;
var posCurrent;

var geolocation = new ol.Geolocation({
    trackingOptions: {
        enableHighAccuracy: true,
    },
    tracking: true,
    projection: mapView.getProjection()
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);
var accuracyFeature = new ol.Feature();

var currentPositionLayer = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature],
    }),
});

function startAutolocate() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    mapView.setCenter(coordinates);
    mapView.setZoom(16);
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    intervalAutolocate = setInterval(function () {
        var coordinates = geolocation.getPosition();
        var accuracy = geolocation.getAccuracyGeometry()
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        map.getView().setCenter(coordinates);
        mapView.setZoom(16);
        accuracyFeature.setGeometry(accuracy);
    }, 10000);
}

function stopAutolocate() {
    clearInterval(intervalAutolocate);
    positionFeature.setGeometry(null);
    accuracyFeature.setGeometry(null);
}
// end : auto locate functions







// start : settings Control
if (session == 'Developer' | session == 'Super Admin'){
var settingsButton = document.createElement('button');
settingsButton.innerHTML = '<img src="map/resources/images/settings.svg" alt="" class="myImg"></img>';
settingsButton.className = 'myButton';
settingsButton.id = 'settingButton';
settingsButton.title = 'Settings';

var settingElement = document.createElement('div');
settingElement.className = 'myButtonDiv';
settingElement.appendChild(settingsButton);
toolbarDivElement.appendChild(settingElement);

var settingFlag = false;
settingsButton.addEventListener("click", () => {
    settingsButton.classList.toggle('clicked');
    settingFlag = !settingFlag;
    document.getElementById("map").style.cursor = "default";
    if (settingFlag) {
        document.getElementById("settingsDiv").style.display = "block";
        addMapLayerList('editingLayer');
    } else {
        document.getElementById("settingsDiv").style.display = "none";
    }
})
}else{

}
// end : settings Control

// finally add all main control to map
var allControl = new ol.control.Control({
    element: toolbarDivElement
})
map.addControl(allControl);


// start : live search function

var txtVal = "";
var inputBox = document.getElementById('inpt_search');
inputBox.onkeyup = function () {
    var newVal = this.value.trim();
    if (newVal == txtVal) {
    } else {
        txtVal = this.value;
        txtVal = txtVal.trim();
        if (txtVal !== "") {
            if (txtVal.length > 1) {
                clearResults();
                createLiveSearchTable();

                $.ajax({
                    url: 'map/resources/custom/fetch.php',
                    type: 'post',
                    data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.'+ jaringanjalanLayer , searchAttribute: 'd_nop' },
                    dataType: 'json',
                    success: function (response) {
                        createRows(response, jaringanjalanLayer);
                    }
                });

                $.ajax({
                    url: 'map/resources/custom/fetch.php',
                    type: 'post',
                    data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.'+ jaringanjalanLayer , searchAttribute: 'name' },
                    dataType: 'json',
                    success: function (response) {
                        createRows(response, jaringanjalanLayer);
                    }
                });


                $.ajax({
                    url: 'map/resources/custom/fetch.php',
                    type: 'post',
                    data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.'+ admkecLayer , searchAttribute: 'kecamatan' },
                    dataType: 'json',
                    success: function (response) {
                        createRows(response, admkecLayer);
                    }
                });

                $.ajax({
                    url: 'map/resources/custom/fetch.php',
                    type: 'post',
                    data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.'+ asetLayer , searchAttribute: 'nama_aset' },
                    dataType: 'json',
                    success: function (response) {
                        createRows(response, asetLayer);
                    }
                });


                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+txtVal+'&key=AIzaSyCjokkkuDak6csngrYza-EGhfmyRi_Gzj0',
                    type: 'post',
                    data: data[0],
                    dataType: 'jsonp',
                    success: function (response) {
                        createRows(response, asetLayer);
                    }
                });

            } else { clearResults(); }

        } else {
            clearResults();
        }
    }
}

// var liveDataDivEle = document.createElement('div');
// liveDataDivEle.className = 'liveDataDiv';
var liveDataDivEle = document.getElementById('liveDataDiv');
var searchTable = document.createElement('table');

function createLiveSearchTable() {

    searchTable.setAttribute("class", "assetSearchTableClass");
    searchTable.setAttribute("id", "assetSearchTableID");

    var tableHeaderRow = document.createElement('tr');
    var tableHeader1 = document.createElement('th');
    tableHeader1.innerHTML = "Layer";
    var tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = "Object";

    tableHeaderRow.appendChild(tableHeader1);
    tableHeaderRow.appendChild(tableHeader2);
    searchTable.appendChild(tableHeaderRow);
}

function createRows(data, layerName) {
    var i = 0;
    for (var key in data) {
        var data2 = data[key];
        var tableRow = document.createElement('tr');
        var td1 = document.createElement('td');
        if (i == 0) { td1.innerHTML = layerName; }
        var td2 = document.createElement('td');
        for (var key2 in data2) {
            td2.innerHTML = data2[key2];
            if (layerName == jaringanjalanLayer) { td2.setAttribute('onClick', 'zoomToFeature(this,\'' + jaringanjalanLayer + '\',\'' + key2 + '\')'); }
            else if (layerName == polaruangLayer) { td2.setAttribute('onClick', 'zoomToFeature(this,\'' + polaruangLayer + '\',\'' + key2 + '\')'); }
            else if (layerName == admkecLayer) { td2.setAttribute('onClick', 'zoomToFeature(this,\'' + admkecLayer + '\',\'' + key2 + '\')'); }
            else if (layerName == asetLayer) { td2.setAttribute('onClick', 'zoomToFeature(this,\'' + asetLayer + '\',\'' + key2 + '\')'); }
            else {  }
        }
        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        searchTable.appendChild(tableRow);

        i = i + 1;
    }

    liveDataDivEle.appendChild(searchTable);
    var ibControl = new ol.control.Control({
        element: liveDataDivEle,
    });
    map.addControl(ibControl);
}

function clearResults() {
    liveDataDivEle.innerHTML = '';
    searchTable.innerHTML = '';
    map.removeLayer(queryGeoJSON);
}

function zoomToFeature(featureName, layerName, attributeName) {
    map.removeLayer(geojson);
    var value_layer = layerName;
    var value_attribute = attributeName;
    var value_operator = "==";
    var value_txt = featureName.innerHTML;
    var url = "https://"+serverPort+"/geoserver/klikpr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
    // console.log(url);
    newaddGeoJsonToMap(url);
}

// end : live search function



// start : onload functions
$(function () {

    // render layerswitcher control
    var toc = document.getElementById('layerSwitcherContent');
    layerSwitcherControl = new ol.control.LayerSwitcher.renderPanel(map, toc, { reverse: true });

    document.getElementById("selectLayer").onchange = function () {
        var select = document.getElementById("selectAttribute");
        while (select.options.length > 0) {
            select.remove(0);
        }
        var value_layer = $(this).val();
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "https://" + serverPort + "/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                dataType: "xml",
                success: function (xml) {

                    var select = $('#selectAttribute');
                    //var title = $(xml).find('xsd\\:complexType').attr('name');
                    //	alert(title);
                    select.append("<option class='ddindent' value=''></option>");
                    $(xml).find('xsd\\:sequence').each(function () {

                        $(this).find('xsd\\:element').each(function () {
                            var value = $(this).attr('name');
                            //alert(value);
                            var type = $(this).attr('type');
                            //alert(type);
                            if (value != 'geom' && value != 'the_geom') {
                                select.append("<option class='ddindent' value='" + type + "'>" + value + "</option>");
                            }
                        });

                    });
                }
            });
        });
    }
    document.getElementById("selectAttribute").onchange = function () {
        var operator = document.getElementById("selectOperator");
        while (operator.options.length > 0) {
            operator.remove(0);
        }

        var value_type = $(this).val();
        // alert(value_type);
        var value_attribute = $('#selectAttribute option:selected').text();
        operator.options[0] = new Option('Select operator', "");

        if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double') {
            var operator1 = document.getElementById("selectOperator");
            operator1.options[1] = new Option('Greater than', '>');
            operator1.options[2] = new Option('Less than', '<');
            operator1.options[3] = new Option('Equal to', '=');
        }
        else if (value_type == 'xsd:string') {
            var operator1 = document.getElementById("selectOperator");
            operator1.options[1] = new Option('Like', 'Like');
            operator1.options[2] = new Option('Equal to', '=');
        }
    }

    document.getElementById('attQryRun').onclick = function () {
        map.set("isLoading", 'YES');

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }

        var layer = document.getElementById("selectLayer");
        var attribute = document.getElementById("selectAttribute");
        var operator = document.getElementById("selectOperator");
        var txt = document.getElementById("enterValue");

        if (layer.options.selectedIndex == 0) {
            alert("Select Layer");
        } else if (attribute.options.selectedIndex == -1) {
            alert("Select Attribute");
        } else if (operator.options.selectedIndex <= 0) {
            alert("Select Operator");
        } else if (txt.value.length <= 0) {
            alert("Enter Value");
        } else {
            var value_layer = layer.options[layer.selectedIndex].value;
            var value_attribute = attribute.options[attribute.selectedIndex].text;
            var value_operator = operator.options[operator.selectedIndex].value;
            var value_txt = txt.value;
            if (value_operator == 'Like') {
                value_txt = "%25" + value_txt + "%25";
            }
            else {
                value_txt = value_txt;
            }
            var url = "https://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
            newaddGeoJsonToMap(url);
            newpopulateQueryTable(url);
            setTimeout(function () { newaddRowHandlers(url); }, 1000);
            map.addLayer(clickSelectedFeatureOverlay);
            map.set("isLoading", 'NO');
        }
    }

    document.getElementById("srcCriteria").onchange = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

    document.getElementById('spUserInput').onclick = function () {
        document.getElementById('spUserInput').classList.toggle('clicked');
        if (document.getElementById('spUserInput').classList.contains('clicked')) {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if (clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            var srcCriteriaValue = document.getElementById('srcCriteria').value;
            if (srcCriteriaValue == 'pointMarker') {
                addInteractionForSpatialQuery('Point');

            }
            if (srcCriteriaValue == 'lineMarker') {
                addInteractionForSpatialQuery('LineString');
            }
            if (srcCriteriaValue == 'polygonMarker') {
                addInteractionForSpatialQuery('Polygon');
            }
        } else {
            coordList = '';
            markerFeature = undefined;
            map.removeInteraction(draw);
        }
    }

    document.getElementById('spQryRun').onclick = function () {

        var layer = document.getElementById("buffSelectLayer");
        var value_layer = layer.options[layer.selectedIndex].value;

        var srcCriteria = document.getElementById("srcCriteria");
        var value_src = srcCriteria.options[srcCriteria.selectedIndex].value;
        var coordList = '';
        var url;
        var markerType = '';
        if (markerFeature) {
            if (value_src == 'pointMarker') {
                coordList = markerFeature.getGeometry().getCoordinates()[0] + " " + markerFeature.getGeometry().getCoordinates()[1];
                markerType = 'Point';
            }
            if (value_src == 'lineMarker') {
                var coordArray = markerFeature.getGeometry().getCoordinates();

                for (i = 0; i < coordArray.length; i++) {
                    if (i == 0) {
                        coordList = coordArray[i][0] + " " + coordArray[i][1];
                    } else {
                        coordList = coordList + ", " + coordArray[i][0] + " " + coordArray[i][1];
                    }
                }
                markerType = 'LineString';
            }
            if (value_src == 'polygonMarker') {
                var coordArray = markerFeature.getGeometry().getCoordinates()[0];
                for (i = 0; i < coordArray.length; i++) {
                    if (i == 0) {
                        coordList = coordArray[i][0] + " " + coordArray[i][1];
                    } else {
                        coordList = coordList + ", " + coordArray[i][0] + " " + coordArray[i][1];
                    }
                }
                coordList = "(" + coordList + ")";
                markerType = 'Polygon';
            }

            var value_attribute = $('#qryType option:selected').text();
            if (value_attribute == 'Within Distance of') {

                var dist = document.getElementById("bufferDistance");
                var value_dist = Number(dist.value);
                // value_dist = value_dist / 111.325;

                var distanceUnit = document.getElementById("distanceUnits");
                var value_distanceUnit = distanceUnit.options[distanceUnit.selectedIndex].value;
                url = "https://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=DWITHIN(geom," + markerType + "(" + coordList + ")," + value_dist + "," + value_distanceUnit + ")&outputFormat=application/json";


            } else if (value_attribute == 'Intersecting') {
                url = "https://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=INTERSECTS(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
            } else if (value_attribute == 'Completely Within') {
                url = "https://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=WITHIN(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
            }
            newaddGeoJsonToMap(url);
            coordList = '';
            markerFeature = undefined;
        }
    }

    var mapInteractions = map.getInteractions();
    for (var x = 0; x < mapInteractions.getLength(); x++) {
        var mapInteraction = mapInteractions.item(x);
        if (mapInteraction instanceof ol.interaction.DoubleClickZoom) {
            map.removeInteraction(mapInteraction);
            break;
        }
    }

    for (var x = 0; x < mapInteractions.getLength(); x++) {
        var mapInteraction = mapInteractions.item(x);
        if (mapInteraction instanceof ol.interaction.DragPan) {
            map.removeInteraction(mapInteraction);
            break;
        }
    }

    document.getElementById("qryType").onchange = function () {
        var value_attribute = $('#qryType option:selected').text();
        var buffDivElement = document.getElementById("bufferDiv");

        if (value_attribute == 'Within Distance of') {
            buffDivElement.style.display = "block";
        } else {
            buffDivElement.style.display = "none";
        }
    }

    document.getElementById('spQryClear').onclick = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        coordList = '';
        markerFeature = undefined;
    }

    document.getElementById('attQryClear').onclick = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        coordList = '';
        markerFeature = undefined;
        document.getElementById("attListDiv").style.display = "none";
    }

    // live search input box behaviour


    // live location
    $("#btnCrosshair").on("click", function (event) {
        $("#btnCrosshair").toggleClass("clicked");
        if ($("#btnCrosshair").hasClass("clicked")) {
            startAutolocate();
        } else {
            stopAutolocate();
        }
    });
});
// end : onload functions








    $("#btn_addmarker").on("click", function () {
        var lat = $("#latitude").val();
        var lon = $("#longitude").val();

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: '/map/resources/images/marker.png',
              scale: 0.02
            })})
        var labelStyle = new ol.style.Style({
            text: new ol.style.Text({
                font: '12px Arial,sans-serif',
                overflow: true,
                fill: new ol.style.Fill({
                color: '#000'
                }),
                stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
                }),
                offsetY: -25
            })
            });
        var style = [iconStyle, labelStyle];
        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature({
                name: lat+', '+lon,
                geometry: new ol.geom.Point(([lon, lat])).transform('EPSG:4326', 'EPSG:32748')})]}),
            style: function(feature) {
                labelStyle.getText().setText(feature.get('name'));
                return style;
            }
            });

        map.addLayer(layer);



        var zoom = parseInt(map.getView().getZoom());
        console.log(zoom)

        // if (zoom > 12 ){


        //     map.getView().fit(
        //         layer.getSource().getExtent(),
        //         { duration: 1500, size: map.getSize(), maxZoom: 12 }
        //     );



        // }
        // else{
        map.getView().fit(
            layer.getSource().getExtent(),
            { duration: 2500, size: map.getSize(), maxZoom: 18 }
        );

    // }







    $("#btn_clearmarker").on("click", function () {
        map.removeLayer(layer);
        });



        setTimeout(
            function()
            {
 //start get data

 var coordinate2 = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:32748');
 let pixel = map.getPixelFromCoordinate(coordinate2);
 map.forEachLayerAtPixel(pixel, function (layer) {
     if (layer instanceof ol.layer.Image) {
         if (layer.get("visible")) {
             let url = layer.getSource().getFeatureInfoUrl(coordinate2, map.getView().getResolution(), "EPSG:32748", {
                 INFO_FORMAT: "application/json",
             });
             console.log(url)
             if (url) {
                 fetch(url)
                     .then(function (response) {
                         return response.text();
                     })
                     .then(function (json) {
                         let data = JSON.parse(json);
                         let layerinfo = layer.getSource().getParams().LAYERS;
                         if(data.features.length < 1){

                             // popup.setPosition(undefined);
                             // container.style.display = "none";
                         }
                         else if (data.features.length > 0) {
                             if (layerinfo == 'klikpr:pola_ruang'){
                                 var feature = data.features[0];
                                 var props = feature.properties;
                                 var koordinat = [lat, '&nbsp;' + lon];
                                 var data2 = props.namobj;
                                 var data3 = props.kp2b;
                                 var data4 = props.krb;

                                //  content0.innerHTML = "<b>Pola Ruang :</b> " + props.namobj + ""
                                 content1.innerHTML = " <div class='alert alert-success d-block text-center' role='alert'><small>Koordinat : " + koordinat + "</small></div> <table class='table table-sm table-bordered table-striped table-hover '><tbody><tr><th class='text-start'><b>Provinsi :</b></th><td> " + props.wadmpr + " </td></tr> <tr><th class='text-start'><b>Kabupaten/Kota :</b></th><td> " + props.wadmkk + "</td></tr> <tr><th class='text-start'><b>Kecamatan :</b> </th><td>" + props.wadmkc + "</td></tr><tr><th class='text-start'><b>Pola Ruang :</b></th><td> " + props.namobj + " </td></tr> <tr><th class='text-start'><b>Kode Kawasan :</b> </th><td>" + props.kodkws + " </td></tr> <tr><th class='text-start'><b>KP2B :</b></th><td>" + props.kp2b + " </td></tr> <tr><th class='text-start'><b>KRB :</b> </th><td>" + props.krb + " </td><tr>   <tr><th class='text-start'><b>Jenis Pola Ruang :</b></th><td> " + props.jnsrpr + " </td></tr>  <tr><th class='text-start'><b>Resapan Air :</b> </th><td>" + props.resair + "</std></tr></tbody></table>";
                                 container.style.display = "block";



                                 if (data2 == 'Jalur Hijau'){
                                    content2a.innerHTML ="<b>Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                    content2b.innerHTML ="<b>Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                    content2c.innerHTML ="<b>Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="<b>Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Cagar Budaya'){
                                    content2a.innerHTML ="<b>Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembagan RTH di zona penyangga;<br/>2. kegiatan untuk kepentingan penelitian dan pengembangan, ilmu pengetahuan, serta pendidikan; <br/>3. kegiatan pelestarian budaya dan peninggalan sejarah; <br/>4. pemanfaatan lahan untuk lokasi evakuasi bencana; dan<br/>5. pengembangan sarana dan prasarana pendukung di zona penunjang.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa pemanfaatan bangunan cagar budaya untuk mendukung kegiatan pariwisata"
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi yaitu mengubah bentuk arsitektur bangunan cagar budaya di zona inti"
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 50%, KLB maksimal sebesar 1,5."
                                    content2e.innerHTML ="<b>Sarana dan prasarana minimum meliputi :</b> <br/>1. jaringan jalan yang dilengkapi dengan pedestrian danpenerangan jalan; <br/>2. jaringan listrik, air bersih dan telekomunikasi;<br/>3. jaringan drainase; dan<br/>4. sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Ekosistem Mangrove'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu kegiatan perlindungan dan pengamanan hutan mangrove, dan/atau rehabilitasi hutan mangrove";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat yaitu kegiatan pendidikan, penelitian, ekowisata dan sarana pendukungnya"
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu menebang, membakar, memanfaatkan kayu, mengangkut, dan/atau memperdagangkan kayu yang berasal dari hutan mangrove"
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="-"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Fasilitas Umum dan Fasilitas Sosial'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan pembangunan fasilitas umum dan fasilitas sosial; dan<br/>2. kegiatan pembangunan prasarana dan sarana umum pendukung fasilitas umum dan fasilitas sosial.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa pembangunan infrastruktur energi, air bersih dan telekomunikasi."
                                    content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan yang mengganggu pelayanan fasilitas sosial dan fasilitas umum."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 70%, KLB maksimal sebesar 7."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;  <br/>2. aksesibilitas untuk difabel;<br/>3. penyediaan jalur dan tempat evakuasi bencana;<br/>4. penyediaan fasilitas parkir"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Hutan Lindung'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan pada zona hutan lindung,meliputi:</b><br/>1. kegiatan usaha pemanfaatan kawasan sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan;  <br/>2. kegiatan usaha pemanfaatan jasa lingkungan sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan; dan <br/>3. kegiatan pemungutan hasil hutan bukan kayu sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. penambangan dengan pola pertambangan bawah tanah dengan ketentuan dilarang mengakibatkan: <br/>a) turunnya permukaan tanah;  <br/>b) berubahnya fungsi pokok Kawasan Hutan secara permanen; dan/atau  <br/>c) terjadinya kerusakan akuifer air tanah.<br/>2. pemanfaatan ruang untuk kegiatan latihan militer tanpa mengurangi fungsi kawasan hutan dan tutupan vegetasi;<br/>3. kegiatan pendidikan dan pengembangan kehutanan, penelitian dan pelatihan kehutanan, serta religi dan budaya setempat dengan tidak mengubah bentang alam dan tidakmerusak unsur-unsur keseimbangan lingkungan; <br/>4. kegiatan pengelolaan sumber daya hutan yang berbasis pemberdayaan masyarakat yang dilakukan pengawasan pemerintah terkait;  <br/>5. penyediaan jalur dan tempat evakuasi bencana; dan<br/>6. penggunaan kawasan hutan untuk kepentingan pembangunan diluar kegiatan kehutanan sesuai denganperaturan perundang-undangan bidang kehutanan."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b> <br/>1. seluruh kegiatan yang berpotensi mengurangi luas kawasan hutan dan tutupan vegetasi; dan<br/>2. seluruh kegiatan yang berpotensi mengganggu dan merusak ekosistem kawasan hutan."
                                    content2d.innerHTML ="Sarana dan prasarana minimum sesuai dengan ketentuan peraturan perundang-undangan bidang kehutanan."
                                    content2e.innerHTML ="Tidak Ada"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Imbuhan Air Tanah'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan perlindungan kawasan imbuhan air tanah; <br/>2. kegiatan budidaya yang diperkenankan adalah kegiatan wisata alam, budidaya tanaman keras, dan budidaya hasil hutan; dan<br/>3. pemanfaatan berupa kawasan budidaya hutan, pertanian lahan kering dan perkebunan/tanaman tahunan, tanaman perdu, tanaman tegakan tinggi, dan penutup tanah untuk melindungi pencemaran dan erosi terhadap air.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemasangan jaringan kabel, listrik, telekomunikasi dan pipa air minum;<br/>2. penyediaan sarana dan prasarana pendukung kawasan sesuai ketentuan yang berlaku dengan intensitas KDB maksimum 30% dan KDH minimum 70%; <br/>3. pengembangan struktur alami dan struktur buatan untuk mencegah longsor/erosi dan mempertahankan bentuk mata air; <br/>4. kegiatan wisata yang terbatas hanya pada kegiatan wisata alam;<br/>5. kegiatan penunjang pariwisata alam sesuai ketentuan yang berlaku dengan intensitas KDB maksimum 30% dan KDH minimum 70%; <br/>6. kegiatan perumahan eksisting dengan tidak mengubah luasan dan tata masa bangunan; dan <br/>7. pada kawasan yang telah terbangun dikendalikan dengat tidak mengeluarkan izin pembangunan baru serta izin pertambangan baru."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b>  <br/>1. tidak diperbolehkan pembangunan hunian baru; <br/>2. tidak diperbolehkan melakukan kegiatan penambangan; dan<br/>3. melakukan kegiatan pembuangan limbah baik padat, cair maupun limbah berbahaya."
                                    content2d.innerHTML ="Penjelasan tercantum pada kegiatan yang diperbolehkan bersyarat."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. jaringan listrik, jaringan air bersih; <br/>2. bangunan prasarana sumber daya air; dan<br/>3. fasilitas keamanan jalan inspeksi pada lokasi yang ditentukan sesuai standar yang ditentukan oleh instansi terkait."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Infrastruktur Perkotaan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. pengembangan RTH; <br/>2. pengembangan sarana dan prasarana pendukung kawasan sesuai peraturan perundang-undangan;<br/>3. untuk infrastruktur perkotaan berupa TPA, meliputi: <br/>a) kantor pengelola;<br/>b) sarana dan prasarana penunjang kawasan;<br/>c) pengembangan pengelolaan TPA;<br/>d) kegiatan pengolahan limbah terpadu; dan  <br/>e) kegiatan pengoperasian TPA berupa kegiatan pemilahan, pengumpulan, pengelolaan dan pemrosesan akhir sampah, tempat mesin pengolah sampah, pengurungan lapis bersih, pemeliharaan TPA, industri terkait pengelolaan sampah dan kegiatan penunjang   operasional TPA. <br/>4. untuk infrastruktur perkotaan berupa pelabuhan perikanan pantai meliputi: <br/>a) kegiatan perkantoran pendukung kawasan;<br/>b) kegiatan permukiman nelayan di kawasan pelabuhan  perikanan pantai;<br/>c) industri pengolahan ikan dan industri penunjang  lainnya;<br/>d) kegiatan pengembangan infrastruktur pengendalian  abrasi dan infiltrasi air laut pada kawasan pelabuhan perikanan pantai; dan <br/>e) bangunan pengendali air pada kawasan pelabuhan perikanan pantai.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b> <br/>1. kegiatan pariwisata; dan<br/>2. kegiatan penunjang transportasi laut pada kawasan  infrastruktur perkotaan di wilayah pesisir."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi kegiatan sosial dan  ekonomi yang mengganggu fungsi kawasan"
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar  10%, KDB maksimal sebesar 60%, KLB maksimal sebesar 1,8."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b> <br/>1. infrastruktur dasar pengelolaan TPA;<br/>2. jaringan jalan, penerangan jalan dan tanda atau rambu  keselamatan; <br/>3. jaringan air bersih;<br/>4. jaringan energi dan listrik;<br/>5. jaringan telekomunikasi; <br/>6. jaringan drainase;<br/>7. sistem jaringan air limbah dan sistem pengelolaan sampah; <br/>8. instalasi Bahan Bakar Minyak (BBM);<br/>9. dermaga, kolam pelabuhan; dan<br/>10. pos jaga dan MC"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Pariwisata'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. penyediaan jalur dan tempat evakuasi bencana;<br/>2. pengembangan sarana dan prasarana pendukung pariwisata; dan<br/>3. pengembangan ruang terbuka hijau. ";
                                    content2b.innerHTML ="egiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. industri kecil;<br/>2. kegiatan pertambangan;<br/>3. pengembangan budidaya pertanian; dan<br/>4. pembangunan perdagangan dan jasa, perumahan, dan perkantoran untuk menunjang kegiatan pariwisata dengan memperhatikan daya dukung dan daya tampung; <br/>5. pengembangan sarana dan prasarana wilayah."
                                    content2c.innerHTML ="Kegiatan yang dilarang pada kawasan pariwisata, meliputi:</b><br/>1. kegiatan yang menimbulkan dampak negatif terhadap lingkungan; dan   <br/>2. industri menengah dan industri besar. "
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimum sebesar 50%, KDB maksimal sebesar 50%, KLB maksimal sebesar 6 di kawasan wisata pantai dan KLB maksimal 3 di kawasan wisata lainnya."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian dengan kontruksi yang bisa menyerap air dan disertai tanda atau rambu keselamatan; <br/>2. penyediaan sumber air baku pariwisata;<br/>3. jaringan energi dan kelistrikan; <br/>4. area parkir kendaraan; <br/>5. jaringan telekomunikasi;<br/>6. sistem pengelolaan air limbah (sesuai dengan ketentuan dan persyaratan teknis yang berlaku;<br/>7. aksesibilitas untuk difabel;<br/>8. jaringan drainase; dan<br/>9. pengelolaan persampahan."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Perdagangan dan Jasa'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan pembangunan perdagangan dan jasa skala regional, skala kota dan skala lokal;<br/>2. kegiatan pembangunan prasarana dan sarana umum pendukung kegiatan perdagangan dan jasa;<br/>3. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada kawasan perdagangan dan jasa di wilayah pesisir;  <br/>4. bangunan pengendali air; dan<br/>5. penyediaan jalur dan tempat evakuasi bencana.  ";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan hunian yang telah dibangun sebelum Perda RTRW ini berlaku;<br/>2. kegiatan pemanfaatan ruang untuk mendukung kegiatan perdagangan dan jasa skala regional, skala kota dan lokal;<br/>3. kegiatan hunian;<br/>4. fasilitas umum dan fasilitas sosial;<br/>5. pembangunan infrastruktur energi, air bersih dan telekomunikasi; dan<br/>6. kegiatan penunjang transportasi laut pada kawasan perdagangan dan jasa di wilayah pesisir."
                                    content2c.innerHTML ="Kegiatan yang dilarang, berupa kegiatan yang mengganggu kawasan perdagangan dan jasa."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 32."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi: </b><br/>1. jaringan jalan, penerangan jalan dan pedestrian, dan tanda atau rambu keselamatan;  <br/>2. fasilitas parkir;<br/>3. jaringan air bersih;<br/>4. jaringan energi dan listrik;<br/>5. jaringan telekomunikasi; <br/>6. jaringan drainase;<br/>7. sistem jaringan air limbah dan sistem pengelolaan sampah; dan<br/>8. aksesibilitas untuk difabel."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Perikanan Budidaya'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. kegiatan mendirikan bangunan penunjang budidaya perikanan,perikanan organik, pengolahan dan pemasaran hasil perikanan,penelitian dan wisata;<br/>2. pengembangan sarana dan prasarana pendukung budidaya ikandan perikanan lainnya.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pengembangan industri pendukung pengembangan perikanan yang tidak mengganggu lingkungan;<br/>2. pengembangan perumahan berkepadatan rendah yang tidak mengganggu fungsi utama;<br/>3. kegiatan wisata alam yang berbasis ekowisata; dan<br/>4. kegiatan pengembangan sarana dan prasarana wilayah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu pengembangan kegiatan yang berpotensi mencemari lingkungan pada kawasan yang ditetapkan sebagai kawasan perikanan budidaya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 40%, KDB maksimal sebesar 60%, KLB maksimal sebesar 1,2."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan;<br/>2. jaringan air bersih;<br/>3. jaringan listrik;<br/>4. sistem jaringan limbah terpadu; dan<br/>5. jaringan drainase"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Perkantoran'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan pembangunan perkantoran;87<br/>2. kegiatan pembangunan prasarana dan sarana umumpendukung perkantoran; dan<br/>3. penyediaan jalur dan tempat evakuasi bencana.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan perumahan;<br/>2. kegiatan perdagangan dan jasa; dan<br/>3. pembangunan sarana dan prasarana wilayah."
                                    content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan industri, kegiatan lainnyayang mengakibatkan terganggunya fungsi kawasan perkantoran."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%,KDB maksimal sebesar 80%, KLB maksimal sebesar 16."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tandaatau rambu keselamatan;<br/>2. jaringan air bersih;<br/>3. jaringan energi dan listrik;<br/>4. jaringan telekomunikasi;<br/>5. jaringan drainase; dan<br/>6. sistem jaringan air limbah dan sistem pengelolaan sampah"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Perlindungan Setempat'){
                                    content2a.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>kegiatan yang diperbolehkan, meliputi:<br/>a) pengembangan RTH;<br/>b) pembangunan dan pemeliharaan bangunan pengelolaan air dan/atau pemanfaatan air;<br/>c) kegiatan yang berhubungan dengan pelestarian sungai; dan<br/>d) kegiatan konservasi, penataan dan pembangunan yang mendukung fungsi kawasan sempadan sungai.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>kegiatan yang diperbolehkan, meliputi: <br/>a) kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut; <br/>b) pengembangan RTH; <br/>c) kegiatan penelitian dan bangunan pengendali air; dan<br/>d) pembangunan dan pengembangan jalur serta evakuasi bencana dan sistem peringatan dini.";
                                    content2b.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>kegiatan yang diperbolehkan bersyarat, meliputi:<br/>a) pengembangan sarana dan prasarana wilayah yang tidak merusak atau berdampak langsung terhadap badan sungai;<br/>b) pengembangan sistem pengendalian banjir;<br/>c) pemanfaatan ruang khusus seperti bangunan sumberdayaair, jembatan dan dermaga, jalur air minum, bangunan telekomunikasi dan listrik, serta vegetasi rumput padas empadan bertanggul dan tanaman keras pada sempadantidak bertanggul, penanaman tumbuhan pelindung;<br/>d) bangunan pengolahan limbah dan bahan pencemar lainnya;<br/>e) kegiatan pariwisata dengan tidak mengubah bentang alam dan tidak merusak unsur keseimbangan lingkungan;<br/>f) bangunan dalam sempadan sungai, dengan ketentuan status quo artinya tidak boleh diubah dan ditambah luasan; dan<br/>g) kegiatan pertambangan yang tidak merubah bentang sungai, dan mengganggu fungsi sungai.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>kegiatan yang diperbolehkan bersyarat, meliputi: <br/>a) sarana pendukung pariwisata yang bersifat bangunan semi permanen yang disertai dengan kajian teknis dan tidak menutup akses publik ke pantai;  <br/>e) kegiatan pertahanan dan keamanan sesuai ketentuan perundang–undangan yang berlaku; dan <br/>b) kegiatan penunjang transportasi laut dan perikanan."
                                    content2c.innerHTML ="Ketentuan umum zonasi sempadan sungai yang tidak diperbolehkan berupa hunian baru dan seluruh kegiatan dan bangunan yang mengancam kerusakan dan menurunkan kualitas sungai.<br/><br/>Ketentuan umum zonasi sempadan pantai yang tidak diperbolehkan berupa semua kegiatan yang berpotensi menyebabkan terjadinya kerusakan lingkungan dan penurunan fungsi sempadan pantai."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 85%."
                                    content2e.innerHTML ="<b>a. Ketentuan umum zonasi sempadan sungai meliputi:</b><br/>sarana dan prasarana minimum meliputi :<br/>a) jalur inspeksi yang dilengkapi dengan sistem penerangan;dan<br/>b) tanggul sungai pada sungai yang melewati area perumahan.<br/>6. tanah pada kawasan ini dimiliki oleh negara dan apabilaterdapat izin yang dikeluarkan untuk bangunan yang ada dengan prosedur yang benar, maka dibebaskan dengan penggantian yang layak.<br/><br/><b>b. Ketentuan umum zonasi sempadan pantai meliputi:</b><br/>sarana dan prasarana minimum meliputi:<br/>a) jalur inspeksi yang dilengkapi dengan sistem penerangan; dan<br/>b) penyediaan jalur evakuasi bencana. <br/><br/>6. tanah pada kawasan ini dimiliki oleh negara dan apabila terdapat izin yang dikeluarkan untuk bangunan yang ada dengan prosedur yang benar, maka dibebaskan dengan penggantian yang layak atau relokasi. "
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Pertahanan dan Keamanan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu pembangunan dan pengembangan kawasan pertahanan dan keamanan serta pembangunan sarana dan prasarana pendukung sesuai dengan ketentuan peraturan perundang-undangan";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat yaitu kegiatan budidaya terbatas di sekitar kawasan pertahanan dan keamanan sesuai dengan ketentuan peraturan perundang-undangan"
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan yang mengganggu atau tidak sesuai dengan fungsi pertahanan dan keamanan sesuai dengan ketentuan peraturan perundang-undangan"
                                    content2d.innerHTML ="Tidak Ada"
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;<br/>2. fasilitas parkir;<br/>3. sistem jaringan air bersih;<br/>4. sistem pengelolaan air limbah;<br/>5. jaringan drainase;<br/>6. pengelolaan persampahan;<br/>7. jaringan energi dan listrik; dan<br/>8. jaringan telekomunikasi."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Perumahan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH;<br/>2. kegiatan pembangunan dan pengembangan perumahan;<br/>3. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada kawasan perumahan di pesisir;<br/>4. bangunan pengendali air; dan<br/>5. kegiatan pembangunan prasarana dan sarana lingkungan perumahan sesuai dengan standar, hierarki dan skala pelayanannya.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. kegiatan perdagangan dan jasa, serta kegiatan perkantoran dengan mempertimbangkan kajian lalu lintas;<br/>2. industri kecil dan menengah;<br/>3. kegiatan pariwisata di kawasan pesisir;83<br/>4. kawasan perumahan yang dibangun diatas kemiringan 15% wajib menggunakan rekayasa konstruksi serta memiliki KDH minimal 40%, KDB maksimal 60%, KLB Maksimal 1,2; dan<br/>5. kegiatan penunjang transportasi laut pada kawasan perumahan di wilayah pesisir."
                                    content2c.innerHTML ="Kegiatan yang dilarang, berupa kegiatan yang mempunyai intensitas besar yang mengganggu fungsi kawasan perumahan."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 8."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. penyediaan RTH minimal 10% dari luas kawasan perumahan yang dibangun oleh pengembang;<br/>2. jaringan jalan, penerangan jalan;<br/>3. jaringan air bersih;<br/>4. penyediaan sumur resapan air;<br/>5. penyediaan jalur evakuasi bencana dan tempat evakuasi bencana;<br/>6. jaringan telekomunikasi;<br/>7. jaringan energi dan listrik;<br/>8. jaringan drainase;<br/>9. sistem jaringan air limbah; dan<br/>10. sistem pengelolaan sampah."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Peruntukan Industri'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH dan jalur hijau sebagai penyangga fungsi antar kawasan;<br/>2. kegiatan pengembangan infrastruktur pengendalian abrasi dan  infiltrasi air laut pada kawasan peruntukan industri di wilayah pesisir;<br/>3. bangunan pengendali air; dan<br/>4. pengembangan sarana dan prasarana wilayah.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pembangunan permukiman perkotaan dan perkantoran;<br/>2. pengembangan/pembangunan sarana pendukung industri lainnya; dan<br/>3. kegiatan pertambangan mineral non logam, dan pertambangan batuan;<br/>4. kegiatan penunjang transportasi laut pada kawasan peruntukan  industri di wilayah pesisir; dan<br/>5. melakukan daur ulang air dan/atau penggunaan kembali air, mengolah air limbah sesuai dengan baku mutu yang dipersyaratkan, mengelola seluruh limbah yang ditimbulkan (emisi udara dan limbah B3), mengintegrasikan pengelolaan air  limbah air dengan rencana IPAL terpadu. "
                                    content2c.innerHTML ="TIdak Ada"
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDB maksimal sebesar 60%, KLB maksimal sebesar 6."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. penyediaan RTH minimal 10% dari luas kawasan;<br/>2. jaringan jalan dilengkapi dengan pedestrian dan perambuan;<br/>3. penyediaan sumber air baku industri;<br/>4. jaringan energi dan kelistrikan;<br/>5. jaringan telekomunikasi;<br/>6. sistem pengelolaan air limbah sesuai dengan ketentuan dan persyaratan teknis yang berlaku untuk kawasan peruntukan industri;<br/>7. jaringan drainase;<br/>8. pengelolaan persampahan; dan<br/>9. penyediaaan fasilitas pemadam kebakaran untuk kawasan industri."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Peruntukan Pertambangan Batuan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. kegiatan penggalian, pengerukan pasir industri, pemotongan batu;<br/>2. kegiatan pemecahan dan penghancuran batu dan kerikil, serta penghalusan batu kasar; dan<br/>3. kegiatan pasca tambang wajib dilakukan rehabilitasi (reklamasi dan/atau revitalisasi) sehingga dapat digunakan kembali untuk kegiatan lain, seperti ruang terbuka hijau, permukiman, pertanian, kehutanan, pariwisata dan lain sebagainya.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat berupa kegiatan permukiman dengan jarak dari kegiatan eksploitasi antara 1 (satu) kilometer sampai dengan 2 (dua) kilometer bila menggunakan  bahan peledak, dan paling sedikit berjarak 500 (lima ratus) meter bila tanpa peledakan, untuk menghindari bahaya yang diakibatkan oleh gerakan tanah, pencemaran udara, serta kebisingan akibat lalumlintas pengangkutan bahan galian, mesin pemecah batu, dan ledakan dinamit."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan pertambanganmyang secara teknis, ekologis, sosial dan/atau budaya menimbulkanmkerusakan lingkungan, pencemaran lingkungan atau merugikan masyarakat sekitarnya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 40%,KDB maksimal sebesar 60%, KLB maksimal sebesar 1,2."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. sarana dan prasarana pendukung kegiatan pertambangan;<br/>2. jaringan energi dan listrik;<br/>3. penyediaan sumber air baku pertambangan; dan<br/>4. jaringan jalan."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Ruang Terbuka Non Hijau'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi kegiatan pemanfaatanruang untuk kegiatan berlangsungnya aktifitas masyarakat, kegiatan olahraga, kegiatan rekreasi, penyediaan plasa, monumen, tempat evakuasi bencana dan landmark.";
                                    content2b.innerHTML ="egiatan yang diperbolehkan dengan syarat meliputi</b><br/>1. kegiatan perdagangan dan jasa;<br/>2. kegiatan pemanfaatan ruang untuk sektor informal secara terbatas untuk menunjang kegiatan sebagaimana dimaksud huruf a; dan<br/>3. pembangunan sarana dan prasarana wilayah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi kegiatan yang mengganggu kegiatan kawasan ruang terbuka non hijau."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 30%, KDB maksimal sebesar 70%, KLB maksimal sebesar 1,4"
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;<br/>2. fasilitas parkir;<br/>3. fasilitas sanitasi;<br/>4. sistem pengelolaan sampah; dan<br/>5. aksesibilitas untuk difabel."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Tanaman Pangan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi: </b><br/>1. aktifitas pendukung pertanian;<br/>2. kegiatan pariwisata berbasis pertanian;<br/>3. kegiatan pelestarian sumber daya air;";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:<br/>1. pengembangan sarana dan prasarana pendukung pengembangan pertanian tanaman pangan dengan memperhatikan daya dukung kawasan; </b><br/>2. kegiatan industri pengolahan hasil pertanian tanaman pangan;<br/>3. pengembangan perumahan berkepadatan rendah yang tidak mengganggu fungsi utama;<br/>4. kegiatan perikanan budidaya pada lahan yang tidak termasuk ke dalam KP2B;<br/>5. kegiatan peternakan yang tidak mencemari lingkungan pada lahan yang tidak termasuk KP2B;<br/>6. pengembangan teknik konservasi lahan pertanian yang bersifat ramah lingkungan dan berkelanjutan;<br/>7. pengembangan budidaya tanaman tahunan/perkebunan dan kebun campuran/ladang; dan<br/>8. kegiatan pengembangan sarana dan prasarana wilayah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b><br/>1. pengembangan kegiatan yang berpotensi merusak kesuburan tanah dan mengurangi unsur hara yang dibutuhkan tanaman pangan;<br/>2. mendirikan bangunan yang mengganggu saluran irigasi; dan<br/>3. alih fungsi lahan yang telah ditetapkan sebagai kawasan KP2B kecuali pengadaan tanah untuk kepentingan umum dan terjadi bencana sesuai dengan peraturan perundang-undangan."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%,  KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. jaringan irigasi dan utilitas; dan<br/>2. jaringan jalan lingkungan untuk jalan usaha tani."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Kawasan Transportasi'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. pengembangan RTH;<br/>2. kegiatan pengembangan infrastruktur pengendalian abrasi dan infiltrasi air laut pada transportasi laut;<br/>3. bangunan pengendali air pada transportasi laut;<br/>4. kegiatan operasional, penunjang operasional, dan pengembangan kawasan transportasi untuk mendukung pergerakan orang dan barang; dan<br/>5. penyediaan jalur dan tempat evakuasi bencana.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi kegiatan selain sebagaimana dimaksud dalam huruf a yang tidak mengganggu keamanan dan keselamatan lalu lintas."
                                    content2c.innerHTML ="Kegiatan yang dilarang, yaitu kegiatan yang mengakibatkan terganggunya fungsi kawasan transportasi."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 20%, KDB maksimal sebesar 80%, KLB maksimal sebesar 8."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi:</b><br/>1. jaringan jalan, penerangan jalan dan pedestrian disertai tanda atau rambu keselamatan;88<br/>2. jaringan air bersih;<br/>3. jaringan energi dan listrik;<br/>4. jaringan telekomunikasi;<br/>5. jaringan drainase;<br/>6. sistem jaringan air limbah dan sistem pengelolaan sampah; dan<br/>7. aksesibilitas untuk difabel."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                    }
                                else if (data2 == 'Pemakaman'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                else if (data2 == 'Taman Hutan Raya'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan, meliputi:</b><br/>1. penelitian dan pengembangan ilmu pengetahuan dan teknologi;<br/>2. pendidikan dan peningkatan kesadartahuan konservasi;<br/>3. koleksi kekayaan keanekaragaman hayati;74<br/>4. penyimpanan dan/atau penyerapan karbon, pemanfaatan air, energi air, angin, panas matahari, panas bumi, dan wisata alam;<br/>5. pemanfaatan tumbuhan dan satwa liar dalam rangka menunjang budidaya dalam bentuk penyediaan Plasma Nutfah;<br/>6. pemanfaatan tradisional oleh masyarakat setempat; dan<br/>7. pembinaan populasi melalui Penangkaran dalam rangka pengembangbiakan satwa atau perbanyakan tumbuhan secara buatan dalam lingkungan yang semi alami.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemanfaatan ruang untuk kegiatan latihan militer tanpa mengurangi fungsi kawasan hutan dan tutupan vegetasi;<br/>2. diperbolehkan terbatas pendirian bangunan yang merupakan bagian dari suatu jaringan atau transmisi bagi kepentingan umum yang keberadaannya telah mendapat persetujuan dari instansi terkait; dan<br/>3. pengembangan RTH yang tetap memperhatikan fungsi konservasi."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan, meliputi:</b><br/>1. seluruh kegiatan yang berpotensi mengurangi luas taman hutan raya dan tutupan vegetasi; dan<br/>2. seluruh kegiatan yang berpotensi mengganggu dan merusak ekosistem taman hutan raya."
                                    content2d.innerHTML ="Tidak Ada"
                                    content2e.innerHTML ="Sarana dan prasarana minimum sesuai dengan ketentuan perundang-undangan bidang kehutanan."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                else if (data2 == 'Taman Kecamatan'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                else if (data2 == 'Taman Kota'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan meliputi:</b><br/>1. kegiatan pemanfaatan ruang untuk fungsi resapan air, rekreasi dan olahraga alam;<br/>2. kegiatan pemanfaatan ruang untuk tempat evakuasi bencana; dan<br/>3. penguatan dengan menggunakan tanaman keras terhadap tebing-tebing yang lebih tinggi dari 3 meter dengan kemiringan lebih besar dari 20%.";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat meliputi:</b><br/>1. kegiatan rekreasi, pembibitan tanaman, pendirian bangunan fasilitas umum dan kegiatan yang tidak mengganggu fungsi RTH kota; dan<br/>2. kegiatan pendukung rekreasi dengan konstruksi tidak permanen.<br/>3. kegiatan sektor informal diperkenankan dengan menyesuaikan perencanaan yang telah ditetapkan pemerintah."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan meliputi:</b><br/>1. dilarang melakukan penebangan pohon tanpa seijin instansi atau pejabat yang berwenang;<br/>2. kegiatan sosial dan ekonomi yang mengganggu fungsi RTH; dan<br/>3. tidak diperkenankan melakukan alih fungsi lahan menjadi kegiatan budidaya, seperti mall, perkantoran, perumahan dan lainnya."
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 90%, KDB maksimal sebesar 10%, KLB maksimal sebesar 0,1."
                                    content2e.innerHTML ="Sarana dan prasarana minimum meliputi :</b><br/>1. RTH taman kota, meliputi:<br/>a) jalur pedestrian dan sepeda yang dilengkapi dengan penerangan jalan serta petunjuk informasi;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi;<br/>d) jaringan drainase; dan<br/>e) sistem jaringan pembuangan limbah dan jaringan dan pengelolaan persampahan.<br/>2. RTH taman kecamatan, meliputi:<br/>a) jalur pedestrian;<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik, air bersih dan telekomunikasi; dan<br/>d) pengelolaan persampahan.<br/>3. Pemakaman, meliputi:<br/>a) jalur pedestrian;78<br/>b) aksesibilitas untuk difabel sesuai standar yang berlaku untuk fasilitas bagi penyandang difabilitas;<br/>c) jaringan listrik; dan<br/>d) pengelolaan persampahan.<br/>4. Jalur Hijau<br/>a) penanda keselamatan jalur sempadan rel kereta api; dan<br/>b) jaringan listrik."
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                else if (data2 == 'Taman Pulau Kecil'){
                                    content2a.innerHTML ="Kegiatan yang diperbolehkan yaitu perlindungan ekosistem pulau-pulau kecil;";
                                    content2b.innerHTML ="Kegiatan yang diperbolehkan bersyarat, meliputi:</b><br/>1. pemanfaatan ruang untuk penelitian, pendidikan dan pariwisata;<br/>2. pembangunan sarana penunjang pariwisata; dan<br/>3. pengembangan permukiman penduduk lokal beserta sarana dan prasarana pendukungnya yang selaras dengan konsep ekowisata."
                                    content2c.innerHTML ="Kegiatan yang tidak diperbolehkan yaitu fungsi dan kegiatan yang merusak ekosistem pulau-pulau kecil;  "
                                    content2d.innerHTML ="Intensitas pemanfaatan ruang meliputi KDH minimal sebesar 75%, KDB maksimal sebesar 25%, KLB maksimal sebesar 0,75."
                                    content2e.innerHTML ="Sarana dan prasarana minimum berupa jaringan jalan yang lengkapi dengan jalur pedestrian, dan penerangan jalan"
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                if (data3 == 'K02A'){
                                    content3a.innerHTML =  "<b>Ketentuan khusus kawasan yang ditetapkan sebagai Kawasan Pertanian Pangan Berkelanjutan (KP2B) meliputi:</b><br/> <br/><b>a. diperbolehkan kegiatan penunjang pertanian;</b><br/><br/><b>b. dalam hal untuk kepentingan umum dan/atau Proyek Strategis Nasional, Lahan Pertanian Pangan Berkelanjutan dapat dialihfungsikan dan dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan;</b><br/><br/><b>c. pengalihfungsian lahan yang sudah ditetapkan sebagai Lahan Pertanian Pangan Berkelanjutan untuk kepentingan umum sebagaimana dimaksud pada huruf b hanya dapat dilakukan dengan syarat:</b><br/>1. dilakukan kajian kelayakan strategis;<br/>2. disusun rencana alih fungsi lahan;<br/>3. dibebaskan kepemilikan haknya dari pemilik; dan<br/>4. disediakan lahan pengganti terhadap Lahan Pertanian Pangan Berkelanjutan yang dialihfungsikan.<br/><br/><b>d. dalam hal terjadi bencana sehingga mengakibatkan hilang atau rusaknya infrastruktur secara permanen dan pembangunan infrastruktur pengganti tidak dapat ditunda, maka alih fungsi Lahan Pertanian Pangan Berkelanjutan dapat dilakukan dengan ketentuan:</b><br/>1. membebaskan kepemilikan hak atas tanah dengan pemberian ganti rugi sesuai dengan ketentuan peraturan perundang-undangan; dan<br/>2. menyediakan lahan pengganti terhadap Lahan Pertanian Pangan Berkelanjutan yang dialihfungsikan paling lama 24 (dua puluh empat) bulan setelah alih fungsi dilakukan.</b>";
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }

                                if (data4 == 'Rawan Gerakan Tanah Tingkat Tinggi'){
                                    content3b.innerHTML =  "<b>a. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan hutan lindung, berupa penerapan teknik pengendalian gerakan tanah dan stabilisasi tanah dengan metode vegetatif dengan tepat sasaran (dipilahkan antara bagian kaki, bagian tengah, dan bagian atas lereng) maupun bangunan.</b><br/><br/><b>b. ketentuan khusus kawasan rawan gerakan tanah tinggi pada imbuhan air tanah meliputi:</b><br/>1. tidak diperkenankan adanya alih fungsi lahan;<br/>2. penerapan teknik pengendalian gerakan tanah metode vegetatif yang mampu menyerap air dan menahan erosi tanah; dan<br/>3. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>c. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan jalur hijau meliputi:</b><br/>1. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yang cukup tinggi dan mudah diakses; dan<br/>2. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>d. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan peruntukan industri meliputi:</b><br/>1. tidak diperkenankan penambahan bangunan, kecuali untuk kepentingan pemantauan ancaman bencana;<br/>2. bangunan wajib menggunakan rekayasa konstruksi dan adaptasi dengan permasalahan kawasan;<br/>3. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yangmudah diakses; dan<br/>4. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.<br/><br/><b>e. ketentuan khusus kawasan rawan gerakan tanah tinggi pada kawasan perumahan meliputi:</b><br/>1. tidak diperkenankan penambahan bangunan, kecuali untuk kepentingan pemantauan ancaman bencana;<br/>2. bangunan wajib menggunakan rekayasa konstruksi dan adaptasi dengan permasalahan kawasan;<br/>3. penyediaan jalur evakuasi bencana dan pembangunan tempat evakuasi yangmudah diakses; dan<br/>4. pembangunan sistem peringatan dini dan rambu-rambu peringatan bencana.";
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                else if (data4 == 'Rawan Tsunami Tingkat Tinggi'){
                                    content3b.innerHTML =  "<b>a. ketentuan khusus kawasan rawan bencana tsunami tingkat tinggi pada perlindungan setempat, kawasan ekosistem mangrove, pemakaman, dan jalur hijau meliputi:</b><br/>1. penyediaan infrastruktur tembok penahan gelombang pada garis pantai yang beresiko;<br/>2. penanaman mangrove serta tanaman lainnya sebagai upaya mitigasi bencana tsunami;<br/>3. pembangunan sistem peringatan dini tsunami dan ramburambu peringatan bencana; dan<br/>4. penyediaan jalur evakuasi bencana<br/><br/><b>b. ketentuan khusus kawasan rawan bencana tsunami tingkat tinggi pada kawasan perikanan budidaya, kawasan peruntukan industri, kawasan pariwisata, kawasan perumahan, kawasan fasilitas umum dan fasilitas sosial, kawasan perdagangan dan jasa, kawasan perkantoran, kawasan transportasi, infrastruktur perkotaan, dan kawasan pertahanan dan keamanan meliputi:</b><br/>1. penyediaan infrastruktur tembok penahan gelombang pada garis pantai yang beresiko;90<br/>2. penguatan struktur bangunan;<br/>3. penanaman mangrove serta tanaman lainnya sebagai upaya mitigasi bencana tsunami;<br/>4. penyediaan jalur evakuasi bencana;<br/>5. pembangunan tempat evakuasi sementara minimal 3 (tiga) lantai dan mudah diakses; dan<br/>6. pembangunan sistem peringatan dini tsunami dan ramburambu peringatan bencana.";
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }
                                if (data5 == 'Ada'){
                                    content3c.innerHTML =  "<b>Ketentuan khusus kawasan resapan air meliputi:</b> <br/>a. kegiatan budidaya yang diperkenankan adalah kegiatan wisata alam, budidaya tanaman keras, budidaya hasil hutan, dan bangunan pendukung kawasan; <br/>b. tidak diperbolehkan melakukan kegiatan penambangan;<br/>c. pada kawasan yang telah terbangun dikendalikan dengan tidak  mengeluarkan izin pembangunan baru serta izin pertambangan baru;  <br/>d. bangunan mengikuti kontur tanah dan berbentuk rumah panggung;  <br/>e. diperbolehkan bangunan eksisting yang telah memiliki izin; dan<br/>f. pengembangan vegetasi tanaman yang mampu menyerap air dan menahan erosi tanah.";
                                    popup.setPosition(evt.coordinate);
                                    container.style.display = "block";
                                        }

                             }

                             }



                     });
             }
         }
     }
 });





}, 4000);




$('#li1').addClass('active');
$('#sidebar2').removeClass('collapsed')
content1.innerHTML = '<center><IMG SRC="https://klikpr.kkp.my.id/gif/loading.gif" width="60%" height="60%"></center>';
content2a.innerHTML = '-';
content2b.innerHTML = '-';
content2c.innerHTML = '-';
content2d.innerHTML = '-';
content2e.innerHTML = '-';
content3a.innerHTML = 'Tidak Ada';
content3b.innerHTML = 'Tidak Ada';
content3c.innerHTML = 'Tidak Ada';



if( $('#li2').hasClass('active')){
    $('#li1').removeClass('active')
}
else if( $('#li3').hasClass('active')){
    $('#li1').removeClass('active')
}
else if( $('#li1').hasClass('active')){
    $('#li1').addClass('active')
}







    });





$("#btn_feature").click(function() {
    $("#featureModal").modal("show");
    return false;
  });

  $(document).bind("contextmenu", function(e) {
    return false;
});




  $('#info1').addClass('active')
  $(function() {

    $(".btn").on("click", function() {
      //hide all sections
      $(".content-section").hide();
      //show the section depending on which button was clicked
      $("#" + $(this).attr("data-section")).show();
    });

  });


