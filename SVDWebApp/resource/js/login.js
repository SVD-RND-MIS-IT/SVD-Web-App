$(document).ready(function() {
	localStorage.setItem("baseURL", "http://localhost/svdmisservice/service/");
	localStorage.setItem("UIbaseURL", "http://localhost/SVDWebApp/");
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
			
			
			var userType =  resp.ucat_name;
                if (userType == "Super User") {
                    localStorage.setItem("menueName","../common/leftMenue.html");
                } else if (userType == "Admin") {
                    localStorage.setItem("menueName","../common/leftMenue1.html");
                } else if (userType == "Accountant") {
                    localStorage.setItem("menueName","../common/leftMenue2.html");
                } else if (userType == "Exam in-charge") {
                    localStorage.setItem("menueName","../common/leftMenue3.html");
                } else if (userType == "Librarian") {
                    localStorage.setItem("menueName","../common/leftMenue4.html");
                } else if (userType == "Prefect In-charge") {
                    localStorage.setItem("menueName","../common/leftMenue5.html");
                } else if (userType == "Thurunusaviya In-charge") {
                    localStorage.setItem("menueName","../common/leftMenue6.html");
                } else if (userType == "Vidusarana In-charge") {
                    localStorage.setItem("menueName","../common/leftMenue7.html");
                } else if (userType == "Parent") {
                    localStorage.setItem("menueName","../common/leftMenue8.html");
                } else if (userType == "Teacher") {
                    localStorage.setItem("menueName","../common/leftMenue9.html");
                } else if (userType == "Student") {
                    localStorage.setItem("menueName","../common/leftMenue10.html");
                } else if (userType == "R&D Officer") {
                    localStorage.setItem("menueName","../common/leftMenue11.html");
                } else {
                    localStorage.setItem("menueName","../common/leftMenue12.html");
                }


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

