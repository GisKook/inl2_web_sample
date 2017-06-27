/**
 * Created by zhangkai on 2017/5/24.
 */
//goog.module('cetcnav.omap.map')

var OMap = {}

OMap.loadMapCapabilities = function (mapCapabilities){
    //http://222.222.218.51:8888/cgi-bin/room/qgis_mapserv.fcgi?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    //if (typeof this.hasCapabilities === 'undefined'){
    return   $.ajax({
        url:mapCapabilities,
        dataType:'jsonp',
        async:false,
        success:function (data) {
            var parser = new ol.format.WMSCapabilities();
            OMap.mapCapabilities = parser.read(data.capabilities);

            OMap.hasCapabilities = true
        },
        error:function (data, textStatus, errorThrow) {
            console.debug(data)
        }
    })
    //}
}

OMap.initMap = function ( mapUrl, mapDiv) {
    layerNames = this.getLayersName();
    center = this.getCenter();
    this.showMap(mapUrl, layerNames,mapDiv, center);
    this.showEntireMap()
}

OMap.getLayersName = function () {
    layers = OMap.mapCapabilities.Capability.Layer.Layer;
    names = ""
    for (i = 0 ; i < layers.length; i++){
        names += layers[layers.length - i - 1].Name+',';
    }
    return names
}
OMap.showMap = function(map_url,layers, map_div, center_point){
    this.map_url = map_url;
    this.layers = layers;
    this.map_div = map_div;

    this.wms_layer = new ol.layer.Image({
        source:new ol.source.ImageWMS({
            url:this.map_url,
            params:{
                'LAYERS':this.layers,
            },
            //projection :ol.proj.get('EPSG:4326'),
        }),

    })

    this.map = new ol.Map({
        layers: [
            this.wms_layer
        ],
        singleTile:true,
        target:this.map_div,
        view:new ol.View({
            center:center_point,
            zoom:6,
            projection:'EPSG:4326'
        })

    });
};

OMap.getCenter = function () {
    var extent = OMap.mapCapabilities.Capability.Layer.EX_GeographicBoundingBox;
    var center = new Array();
    center[0] = (extent[2] - extent[0]) / 2 + extent[0];
    center[1] = (extent[3] - extent[1]) / 2 + extent[1];

    return center;
};

OMap.showEntireMap = function () {
    var extent = OMap.mapCapabilities.Capability.Layer.EX_GeographicBoundingBox
    this.map.getView().fit(extent, this.map.getSize())
};

OMap.fireClick = function(clickHandler){
    this.map.on('click', function(evt){
        var coordinates = evt.coordinate;
        clickHandler(coordinates);
    })
}
