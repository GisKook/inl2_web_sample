//operateDate.js对表单数据的增删改查

//保存 保存坐标点和方向
 var historyLoc;//上一个保存点的坐标
function saveData(){
	
	var lonLat = $("#lonLat").val();
	var fingerId ='DKLQ001';
	var orientationFlag = $("#orientationFlag").val();
	if(lonLat=="") {  
       swal("保存失败!", "请选择坐标点", "error"); 
       $("#lonLat= ").focus();  
       return false;  
	}    
	if(orientationFlag=="") {  
	   swal("保存失败!", "请选择当前方向字母", "error"); 
       $("#orientationFlag").focus();  
       return false;  
    } 
	var param = fingerId+":"+orientationFlag+":"+lonLat;
	$.ajax({
		type:'get',
		dataType:'JSONP',
		url:'http://111.11.26.209:50019/cetcnav_pis_2.0.5/rest/indoorOrder/getIndoorOrder.json?stringId='+param,
		error:function(){
			errorTips();
			},
		success:function(data){
			
			if(data.message=="success"){
				historyLoc=lonLat;
				successTips();
				//$("#map-modal").modal("hide");						
			}else{
				errorTips();
			}
		}
	});
}

//查询  根据坐标点和方向查询当前采样点的个数
function selectData(){
	var lonLat = $("#lonLat").val();
	var orientation=$("#orientationFlag option:selected").val();
	var fingerId ='DKLQ001';
	console.log(orientation)
	$.ajax({
		type:'get',
		dataType:'JSONP',
		url:'http://172.16.9.124:8080/cetcnav_pis_prison/rest/indoorSelect/getSelect.json?loc='+lonLat+'&orientation='+orientation+'&fingerId='+fingerId,
		error:function(){
			errorTips()
			},      
		success:function(data){
			console.log(data)
			if(data.code==1){
				$("#selectText").val(data.message+"，总共"+data.result+"条")
			}
			if(data.code==0){
				$("#selectText").val(data.message+",请选择坐标点")
			}
			
		}
	});
}

//查询  根据坐标点和方向删除当前采样点，并显示删除的个数和状态
function deleteData(){
	historyLoc="";
	var lonLat = $("#lonLat").val();
	var fingerId ='DKLQ001';

	var orientation=$("#orientationFlag option:selected").val();
	console.log(orientation)
	$.ajax({
		type:'get',
		dataType:'JSONP',
		url:'http://111.11.26.209:50019/cetcnav_pis_2.0.5/rest/indoorDelete/getIndoorDelete.json?loc='+lonLat+'&orientation='+orientation+'&fingerId='+fingerId,
		error:function(){
			errorTips()
			},
		success:function(data){
			console.log(data)
			if(data.code==1){
				$("#deleteText").val(data.message+"，总共"+data.result+"条")
			}
			if(data.code==0){
				$("#deleteText").val(data.message+"，请选择坐标点")
			}
			
		}
	});
}

