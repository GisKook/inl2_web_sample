/**
 * Created by zhangkai on 2017/6/27.
 */

var SAMPLEAPP = {}
SAMPLEAPP.mapClickHandler = function (coordinates) {
    var location = coordinates[0]+","+(-coordinates[1]);
    $("#lonLat").val(location);
    $("#map-modal").modal("show");
}
