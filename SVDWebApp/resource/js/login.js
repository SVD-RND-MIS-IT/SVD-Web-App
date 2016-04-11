$(document).ready(function() {
	localStorage.setItem("baseURL", "http://localhost/svdmisservice/service/");
	var baseURL = localStorage.getItem("baseURL");
	/*var sessionid = localStorage.getItem("usr_name");
	if(sessionid!=null){
		window.location.href = "pages/welcome/welcome.html";
	}*/
});


function chekLogin(){
	var baseURL = localStorage.getItem("baseURL");
	var x = $("#login_name").val();
	var y = $("#login_password").val();
	
	$.ajax({  
       type: "POST",  
       url: baseURL+"user_management/OperationalUserService.php/login",  
       dataType: "json", 
	   data : {'usr_name':x , 'usr_pwd':y},
       success: function(resp){  
         // we have the response
		if(resp.error==false){
			//create local session variables
			localStorage.setItem("usr_name", resp.usr_name);
			localStorage.setItem("usr_full_name", resp.usr_full_name);
			localStorage.setItem("usr_email", resp.usr_email);
			localStorage.setItem("usr_phone_number", resp.usr_phone_number);
			localStorage.setItem("usr_api_key", resp.usr_api_key);
			localStorage.setItem("ucat_name", resp.ucat_name);
			localStorage.setItem("ucat_description", resp.ucat_description);
			localStorage.setItem("ou_recode_added_at", resp.ou_recode_added_at);

			window.location.href = "pages/welcome/welcome.html";
		}else{
			sweetAlert(resp.message, "Your Username or Password is incorrect." , "error");
		}

		
       },  
       error: function(e){  
         sweetAlert("Oops...", "Something went wrong!" + e, "error");
       }  
     });
	
}

