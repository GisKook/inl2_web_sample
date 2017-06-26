//开始采集的方法
function startCollecting(){
	var lonLat = $("#lonLat").val();
	var orientationFlag = $("#orientationFlag").val();
	if(lonLat=="") {  
       swal("保存失败", "请选择坐标点", "error"); 
       $("#lonLat= ").focus();  
       return false;  
	}    
	if(orientationFlag=="") {  
	   swal("保存失败", "请选择当前方向字母", "error"); 
       $("#orientationFlag").focus();  
       return false;  
    } 
	var data=lonLat.split('*')[0]+';'+lonLat.split('*')[1]+';'+orientationFlag;
	 window.android.receiveString(data);
	 //按钮禁用  
	 $('#startCollecting').attr("disabled","disabled");
}
//采集完成的方法，将按钮解禁
function endCollecting(info){
	 
	$('#startCollecting').removeAttr("disabled");
}
