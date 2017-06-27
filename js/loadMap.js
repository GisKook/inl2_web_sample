/**
 * Created by zhangkai on 2017/6/27.
 */
function loadMap(map_url){
    $.when(OMap.loadMapCapabilities('http://222.222.218.52:8876/inl2/get_map_capabilities?wms_url='+map_url+'&callback=?')).done(
        function (a) {
            OMap.initMap(map_url, 'map')
            OMap.fireClick(SAMPLEAPP.mapClickHandler);
        }
    );
}
