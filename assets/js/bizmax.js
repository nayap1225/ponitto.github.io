var _PVSN = "1"; //프로그램 버젼

function showToastError(msg){
	alert(msg);
}

function hasValue(val){
	var val;
	try{

		if(val === null || val === undefined || val === ""){ 
			return false;
		}

		return true;		
	}catch(e){
		return false;
	}
}

function getValue(val){
	var val;
	if(! hasValue(val)){
		val = "";
	}
	return val;
}

function getObjVal(obj, key, df_val){
	var obj, key, df_val;

	if(df_val === undefined){
		df_val = "";
	}

	if(typeof obj != typeof {}){
		alert("오브젝트 타입이 아닙니다.");
		return df_val;
	}

	if(hasValue(obj[key])){
		return obj[key];
	}
	return df_val;
}

function getJsonParse(data, err_msg, b_show_err){
	var data, err_msg, b_show_err;
	if(b_show_err === undefined){
		b_show_err = true;
	}
	var json_data = null;
	
	try{
		json_data = $.parseJSON(data);
	}catch(e){	
		//dLog(data);
		if(b_show_err){
			if(hasValue(err_msg)){
				alert(err_msg);
			}else{
				alert("JSON 오류입니다.");
			}
		}
	}
	return json_data;
}

function getFormObject(form_name){
	var form_name;
	if(! hasValue(form_name)){
		return {};
	}
	var form_serialize = $("form[name=" + form_name + "]").serializeArray();
	var form_object = {};
	jQuery.each(form_serialize, function() { form_object[this.name] = this.value; }); 
	//form_serialize = null;
	return form_object;
}

function replaceAll(str, searchStr, replaceStr){
	return str.split(searchStr).join(replaceStr);
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

function delComma(number){
	var number;
	var string = "" + number;  // 문자로 바꾸기. 
	string = string.replace( /[^-+\.\d]/g, "" )  // ±기호와 소수점, 숫자들만 남기고 전부 지우기. 

	return string;
}

String.prototype.delComma = function (){ 
    return delComma(this); 
} 

function setComma(number){
	var number;
	var string = delComma(number);
	var regExp = /^([-+]?\d+)(\d{3})(\.\d+)?/;  // 필요한 정규식. 
	while ( regExp.test( string ) ) string = string.replace( regExp, "$1" + "," + "$2" + "$3" );  // 쉼표 삽입. 

	return string; 
}

String.prototype.setComma = function (){ 
    return setComma(this); 
} 

function getIntVal(val, df_val){	
	if(typeof val == typeof ""){
		val = val.delComma();
	}

	//var int_val = Number.parseInt(val); //ie 지원안됨
	var int_val = parseInt(val);

	//if(Number.isNaN(int_val)){ //ie 지원안됨
	if(isNaN(int_val)){
		if(df_val === undefined){
			df_val = 0;
		}
		return df_val;
	}

	return int_val;
}

function getFormValue(form_name, field_name){
	var form_name, field_name;
	var $form_obj = $("form[name='" + form_name + "'] [name='" + field_name + "']");	
	if($form_obj.length){
		var tag_name = $form_obj.prop("tagName");
		var type_name = $form_obj.attr("type");
		var val = "";
		 if(type_name == "radio"){
			for(var i=0; i<$form_obj.length; i++){		
				if($form_obj[i].checked){
					val = $form_obj[i].value;
					break;
				}
			}
		 }else{
			val = $form_obj.val();
		 }

		if(val == null || val === undefined){
			val = "";
		}
		return val;
	}else{
		return "";
	}
}


function setFormValue(form_name, field_name, val, val_ex){
	var form_name, field_name, val, val_ex;	
	
	var $form_obj = $("form[name='" + form_name + "'] [name='" + field_name + "']");
	if($form_obj.length <= 0){
		return;
	}

	var tag_name = getValue($form_obj.prop("tagName"));			
	if(tag_name == "SELECT"){
		var $select_option = $("form[name='" + form_name + "'] [name='" + field_name + "'] option[value='" + val + "']");
		if($select_option.length){
			//$select_option.eq(0).attr("selected", "selected");
			$select_option.eq(0).prop("selected", true);
		}else{
			if(typeof val_ex === "undefined"){
				val_ex = val;
			}
			//saao : select auto append option
			if($form_obj.hasClass("fm-money")){
				$form_obj.append("<option value='" + val + "' saao='1' selected>" + setComma(getOnlyNumStr(val_ex)) + "</option>"); 
			}else{
				$form_obj.append("<option value='" + val + "' saao='1' selected>" + val_ex + "</option>");
			}
		}
	}else if(tag_name == "INPUT"){

		var type_name = $form_obj.attr("type");
		if(type_name == "text"){
			if($form_obj.hasClass("fm-date")){
				//?
				//return;
			}else if($form_obj.hasClass("fm-money")){
				val = setComma(getOnlyNumStr(val));
			}

			$form_obj.val(val);
		}else if(type_name == "hidden"){
			$form_obj.val(val);
		}else if(type_name == "radio"){
			setRadioChecked(form_name, field_name, val);
		}else if(type_name == "checkbox"){
			setCheckboxChecked(form_name, field_name, getCheckboxVal(form_name, field_name) == val);
		}else{
			$form_obj.val(val);
		}
	}else if(tag_name == "TEXTAREA"){ //text, textarea
		$form_obj.val(val);
	}else{
		$form_obj.val(val); //?
	}
}

function setRadioChecked(form_name, field_name, val){
	var form_name, field_name, val;
	var obj = $("form[name='" + form_name + "'] [name='" + field_name + "']");
	for(var i=0; i<obj.length; i++){		
		if(obj[i].value == val){
			obj[i].checked = true;
			break;
		}
	}
}

function setCheckboxChecked(form_name, field_name, checked){
	var form_name, field_name, checked;
	return $("form[name='" + form_name + "'] [name='" + field_name + "']").prop("checked", checked); 
}

function setFormFocus(form_name, field_name){
	var form_name, field_name;
	if(form_name.indexOf("#") == 0){
		var $clm_obj = $(form_name);
		$clm_obj.focus();
	}else if(form_name.indexOf("/") > 0){
		var sp_idx = form_name.indexOf("/"); 
		var $clm_obj = $(form_name.substring(0, sp_idx) + "[name='" + form_name.substring(sp_idx+1) + "']");
		if($clm_obj.length){
			$clm_obj.eq($clm_obj.length-1).focus();
		}
	}else{
		var form_obj = $("form[name='" + form_name + "'] [name='" + field_name + "']");
		if(form_obj.length){
			form_obj.focus();
		}
	}
}

function getFileSize(form_name, obj_name) {
	var form_name, obj_name;
	var file_size = 0;
	try{		

		var $file_obj = null;
		if(typeof form_name == typeof ""){
			if(form_name.indexOf("#") == 0){
				$file_obj = $(form_name);
			}else{
				$file_obj = $("form[name='" + form_name + "'] [name='" + obj_name + "']");
			}
		}else if(form_name instanceof jQuery){
			$file_obj = form_name;
		}else if(typeof $jq_obj === "object"){
			$file_obj = $(form_name);
		}else{
			showToastError("파일크기 파라미터 설정이 잘못되었습니다.");
			return file_size;
		}

		if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) { //for IE
			//before making an object of ActiveXObject, 
			//please make sure ActiveX is enabled in your IE browser
			var objFSO = new ActiveXObject("Scripting.FileSystemObject"); 			
			if($file_obj.length){
				var filePath = $file_obj[0].value;
				if(filePath != ""){
					var objFile = objFSO.getFile(filePath);
					file_size = objFile.size;
				}
			}
		}else{//for FF, Safari, Opeara and Others
			if($file_obj.length && $file_obj[0].files.length){		
				file_size = $file_obj[0].files[0].size;			
			}
		}
	}catch(e){
		showToastError("File Size Error : " + e);
	}

	return file_size;
}

function saveFormPrgsAreaCreate(fn_param){
	var fn_param;
	if(typeof fn_param !== typeof {}){
		fn_param = {};
	}
	
	var sf_area_div_name = getObjVal(fn_param, "sf_area_div_name", "save_area_div");
	var file_size = getObjVal(fn_param, "file_size", 0);
	var $prgs_bar = null;
	if(file_size > 0){
		var prgs_html = "<div name='cr_prgs_bar'><div name='cr_prgs_lbl' class='progress-label'></div></div>";
		$("div[name='" + sf_area_div_name + "'] div[name='cr_prgs_div']").html(prgs_html);

		var $prgs_bar = $("div[name='" + sf_area_div_name + "'] div[name='cr_prgs_div'] div[name='cr_prgs_bar']");
		var $prgs_lbl = $("div[name='" + sf_area_div_name + "'] div[name='cr_prgs_div'] div[name='cr_prgs_lbl']");
		$prgs_bar.progressbar({
			value: false,
			change: function() {
				$prgs_lbl.text("저장중 : " + $prgs_bar.progressbar("value") + "%");
			},
			complete: function() {
				$prgs_lbl.css({"margin-left":"-80px"});
				$prgs_lbl.text("완료메세지까지 기다려주세요 !");
			}
		});	
	}	

	var save_btn_name = getObjVal(fn_param, "save_btn_name", "cr_save_btn");
	var save_btn_lock_text = getObjVal(fn_param, "save_btn_lock_text", "진행중...");	
	$("div[name='" + sf_area_div_name + "'] button[name='" + save_btn_name + "']").text(save_btn_lock_text).prop("disabled", true);

	return $prgs_bar;
}

function saveFormPcsReset(fn_param){
	var fn_param;
	if(typeof fn_param !== typeof {}){
		fn_param = {};
	}
	var save_form_name = getObjVal(fn_param, "save_form_name");
	var save_btn_name = getObjVal(fn_param, "save_btn_name", "cr_save_btn");
	var save_btn_text = getObjVal(fn_param, "save_btn_text", "저장");
	var sf_area_div_name = getObjVal(fn_param, "sf_area_div_name", "save_area_div");

	$("div[name='" + sf_area_div_name + "'] button[name='" + save_btn_name + "']").text(save_btn_text).prop("disabled", false); 
	//hideWait();

	//프로그래스 초기화
	$("div[name='" + sf_area_div_name + "'] div[name='cr_prgs_div']").html("");

}

// 월이자 계산
function calHalbuIja(price, month, rate){
	var a, b, c, d, e, f, y;

	a = parseFloat(price);
	b = parseFloat(month);
	y = parseFloat(rate);

	if (y > 0){
		y = y / 100;
	}else{
		y = 0.059;
	}

	c = parseFloat(y / 12); //월이자율
	d = (a * c * ((Math.pow(1+c , b)) / (Math.pow(1+c , b) -1))); //매월 청구금액
	e = d * b; //총납부 할부금
	f = e - a; //총 이자 금액

	d = Math.round(d);
	e = Math.round(e);
	f = Math.round(f);

	var rst = {
		 'month_halbu_ija_rate':c //월이자율
		,'month_claim_amt':d //매월 청구금액
		,'total_amt':e //총납부 할부금
		,'total_halbu_ija':f //총 이자 금액
	};

	return rst;
}



function onFormFileSelChg(fn_param){
	var fn_param;
	var form_name = getObjVal(fn_param, "form_name");
	var clm_name = getObjVal(fn_param, "clm_name");
	var file_dis_clm = getObjVal(fn_param, "file_dis_clm", clm_name + "_name");

	var fileValue = $("form[name='" + form_name + "'] [name='" + clm_name + "']").val().split("\\");
	var fileName = fileValue[fileValue.length-1]; // 파일명

	$("form[name='" + form_name + "'] [name='" + file_dis_clm + "']").val(fileName);
}

function formFileSelRemove(fn_param){
	var fn_param;
	var form_name = getObjVal(fn_param, "form_name");
	var clm_name = getObjVal(fn_param, "clm_name");
	
	var $file_clm = $("form[name='" + form_name + "'] [name='" + clm_name + "']");
	$file_clm.replaceWith($file_clm.clone(true).val(""));
	onFormFileSelChg({form_name:form_name, clm_name:clm_name});
}

function removeToast(){

}


//폼 벨리데이션
function validateFormRequire(param){
	var param;

	var arr_ret = {ret_code:0, ret_msg:"", clm_name:""};
	if(typeof param != typeof {}){
		arr_ret["ret_msg"] = "벨리데이션 파라미터가 잘못되었습니다.";
		return arr_ret;
	}

	var arr_require_clm = param["arr_require_clm"];
	
	if(! hasValue(arr_require_clm) || typeof arr_require_clm != typeof []){
		arr_ret["ret_msg"] = "체크항목 파라미터가 잘못되었습니다.";
		return arr_ret;
	}
	var form_name = param["form_name"];
	if(! hasValue(form_name)){
		arr_ret["ret_msg"] = "체크항목 폼 명칭이 없습니다.";
		return arr_ret;
	}

	for(var i=0; i<arr_require_clm.length; i++){
		var clm_name = arr_require_clm[i][0];
		if(clm_name == "jumin"){
			var jumin_type = getFormValue(form_name, "jumin_type");
			if(jumin_type == "h"){
				clm_name = "jumin_h_1";
			}else{
				clm_name = "jumin_c_1";
			}
		}

		

		var require_obj = $("form[name='" + form_name + "'] [name='" + clm_name + "']");
		if(require_obj.length <= 0){
			continue;
		}

		var tag_name = require_obj.prop("tagName");
		if(! hasValue(tag_name)){
			continue;
		}
	
		/*
		if(! require_obj.is(":visible")){
			continue;
		}
		*/
		
		if(tag_name == "INPUT"){
			var type_name = require_obj.attr("type");
			if(type_name == "text"){
				if(require_obj.val() == ""){
					arr_ret["ret_msg"] = arr_require_clm[i][1] + "(을)를 입력하세요";
					arr_ret["clm_name"] = clm_name;
					require_obj.focus();
					return arr_ret;
				}
			}else if(type_name == "radio"){
				//$("input:radio[name='maker']:checked").val();
				var b_has_val = false;
				for(var j=0; j<require_obj.length; j++){		
					if(require_obj[j].checked){
						if(getValue(require_obj[j].value) != ""){
							b_has_val = true;
						}
						break;
					}
				}
				if(! b_has_val){
					arr_ret["ret_msg"] = arr_require_clm[i][1] + "(을)를 선택하세요";
					arr_ret["clm_name"] = clm_name;
					return arr_ret;
				}

			}else if(type_name == "file"){
				if(require_obj.val() == ""){
					arr_ret["ret_msg"] = arr_require_clm[i][1] + " 항목의 파일선택은 필수입니다.";
					arr_ret["clm_name"] = clm_name;
					return arr_ret;
				}
			}else if(type_name == "hidden"){
				if(require_obj.val() == ""){
					arr_ret["ret_msg"] = arr_require_clm[i][1] + "(을)를 선택하세요";
					return arr_ret;
				}
			}
		}else if(tag_name == "SELECT"){ //value, text 모두검사
			var ck_val = getSelectText(form_name, clm_name);
			if(ck_val == "" || ck_val == "-" || require_obj.val() == ""){
				arr_ret["ret_msg"] = arr_require_clm[i][1] + "(을)를 선택하세요";
				arr_ret["clm_name"] = clm_name;
				require_obj.focus();
				return arr_ret;
			}
		}else if(tag_name == "TEXTAREA"){
			if(require_obj.val() == ""){
				arr_ret["ret_msg"] = arr_require_clm[i][1] + "(을)를 입력하세요";
				arr_ret["clm_name"] = clm_name;
				require_obj.focus();
				return arr_ret;
			}		
		}		
	}//for
	
	arr_ret["ret_code"] = 1;
	return arr_ret;
}


//html5 localStorage 함수
function setLSItem(key, val){
	var key, val;
	try{
		window.localStorage.setItem(key, val);
	}catch(e){}
}

function getLSItem(key){
	var key;
	var val = "";
	try{
		val = window.localStorage.getItem(key);
		if(val == null){
			val = "";
		}
	}catch(e){}
	
	return val;
}

//배열처리
function setLSItemObj(key, val){
	var key, val;
	try{
		setLSItem(key, JSON.stringify(val));
	}catch(e){}
}

function getLSItemObj(key){
	var key;
	var val = "";
	var obj = null;
	try{		
		val = getLSItem(key);	
		if(val != ""){
			obj = JSON.parse(val);
		}
	}catch(e){ }
	
	return obj;
}

function removeLSItem(key){
	var key;
	try{
		window.localStorage.removeItem(key);
	}catch(e){}
}

function clearLS(){
	try{
		window.localStorage.clear();
	}catch(e){}
}

function recentModelList(){
	var rct_emp = getLSItem("rct_emp");
	location.href = "/model/model_list.php?rct_emp=" + rct_emp;
}

/*
onLoad(온로드) 함수
*/
var _AJAX_LOADING = null;$(function(){
	
	_AJAX_LOADING = $("<div id=\"_AJAX_LOADING\" class=\"loading\"><img id=\"loading_img\" alt=\"loading\" src=\"/assets/images/ajax_loading.gif\" /></div>").appendTo(document.body).hide();	
	$(document).ajaxSend(function(event, jqXHR, ajaxOptions){ 
		if(hasValue(ajaxOptions["sapcs"])){ //stand alone process 독립프로세스 처리안함
			return;
		}

		_AJAX_LOADING.show(); 		
		removeToast();
	});
	
	$(document).ajaxError(function( event, request, settings, error){ 
		if(hasValue(settings["sapcs"])){ //stand alone process 독립프로세스 처리안함
			return;
		}	

		if(request.status == 0){  
			showToastCenter({msg:"인터넷 연결을 확인하세요.", type:"error"}); 
			return;
		}  

		if(request.status == 500){  
			showToastError("프로그램 서버 오류입니다.\r\n\r\n동일현상 반복시 관리자에게 연락하세요."); 
			return;
		} 

		if(request.status == 404){ 
			showToastError("프로그램 경로를 찾을수 없습니다.\r\n\r\n관리자에게 연락하세요."); 
			return;
		} 

		if(error == "timeout"){
			showToastError("★ 요청시간이 초과되었습니다."); 
			return;
		} 

		if(error == "abort"){
			showToastError("★ 기존요청을 취소합니다."); 	
			return;
		} 

		if(error == "timeout"){
			showToastError("★ 요청시간이 초과되었습니다."); 
			return;
		} 
		
		showToastError("★ 처리 오류 : " + error);
	});

	$(document).ajaxComplete(function(event, jqXHR, ajaxOptions){ 
		var b_sapcs = hasValue(ajaxOptions["sapcs"]); //stand alone process 독립프로세스 처리분기
		if(! b_sapcs){
			_AJAX_LOADING.hide(); 			
		}
	});	


	window.onerror = function(message, filename, linenumber, colno, error){
		try{			
			_AJAX_LOADING.hide();			
		}catch(e){ alert(e); }		
	}	

	window.onbeforeunload = function(evt){

	}


	$.ajaxSetup({
		headers : { 'X-BizMax-Ajax' : '1', 'X-PVSN' : _PVSN, 'X-Site-Gubun' : 'pc' }
	});
}); //$(document).ready(function(){