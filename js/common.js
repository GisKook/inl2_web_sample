//common.js 加载fcgi的地图，点标记，获取地图的坐标点

//加载地图
var map, layer,markers;
function loadMap(){
	map = new OpenLayers.Map( 'map' );
	layer = new OpenLayers.Layer.WMS( "OpenLayers WMS",
			"http://222.222.218.51:8888/cgi-bin/luquanprison/qgis_mapserv.fcgi",
			{layers: 'room,layout,outline'}, 
			{singleTile:true},
			{ratio:1},
			{isBaseLayer: true, transitionEffect: 'resize'});
	map.addLayer(layer);
	map.setCenter(new OpenLayers.LonLat(8, -5), 6);
	markers = new OpenLayers.Layer.Markers( "Markers" );  
	map.addLayer(markers);
	var click = new OpenLayers.Control.Click();
	map.addControl(click);
	click.activate();
}
//点击地图获取地图坐标
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
	defaultHandlerOptions: {
		'single': true,
		'double': false,
		'pixelTolerance': 0,
		'stopSingle': false,
		'stopDouble': false
	},

	initialize: function(options) {
		this.handlerOptions = OpenLayers.Util.extend(
			{}, this.defaultHandlerOptions
		);
		OpenLayers.Control.prototype.initialize.apply(
			this, arguments
		); 
		this.handler = new OpenLayers.Handler.Click(
			this, {
				'click': this.trigger
			}, this.handlerOptions
		);
	}, 

	trigger: function(e) {
		var lonlat = map.getLonLatFromPixel(e.xy);
		$("#lonLat").val(Math.abs(lonlat.lon.toFixed(2))+"*"+ Math.abs(lonlat.lat.toFixed(2)));
		$("#selectText").val('');
		$("#deleteText").val('');
		$("#orientationFlag").val('')
		//$("#imei").val('')
		$("#map-modal").modal("show");
		
	}

});	

//显示已才采集点的marker
var markers;
function addMarker(x,y){
	var size = new OpenLayers.Size(10,12);  
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);  
	var icon = new OpenLayers.Icon('img/marker.png',size,offset); 
	markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(x,-y),icon)); 
	 
}
//显示点的坐标
function showPoint(){
	var fingerId ='DKLQ001';
	//var fingerId="CS002"
	$.ajax({
		type:'get',
		dataType:'jsonp',
		url:'http://111.11.26.209:50019/cetcnav_pis_2.0.5/rest/getIndoorLoc/getIndoorLocList.json?fingerId='+fingerId,
		error:function(){
			iosAlert("显示失败")
			},      
		success:function(data){
			for(var i=0;i<data.result.length;i++){
				
				addMarker(data.result[i].split(",")[0],data.result[i].split(",")[1])
				
			}
			successTips();
			$("#map-modal").modal("hide");
			
		}
	});

}
