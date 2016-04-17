$(document).ready(function() {
	var sessionid = localStorage.getItem("usr_name");
	var usr_api_key = localStorage.getItem("usr_api_key");
	var baseURL = localStorage.getItem("baseURL");
	
	if(sessionid == null){
		swal({   title: "You are not logged in",   text: "Pleace loggin to the system.",   timer: 3000,   showConfirmButton: false });
		setTimeout(function(){     window.location.href = "../../";   }, 3000);
	}

	$.ajax({  
       type: "GET",  
       url: baseURL+"user_management/UserCategoryService.php/user_categories",  
       dataType: "json", 
	   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', usr_api_key);},
       success: function(resp){  
		for (i = 0; i < resp.user_category.length; i++) { 
			$( "#ugroup" ).append( "<option value=\""+resp.user_category[i].ucat_id+"\" >"+ resp.user_category[i].ucat_name +"</option>" );
		}
       },  
       error: function(e){  
         sweetAlert("Oops...", "Something went wrong!" + e, "error");
       }  
     });
	 
	 $( "#userRegistrationForm" ).validate({
	  rules: {
		uname: {
		  required: true,
		  minlength: 4
		},
		ufname: {
		  required: true,
		  minlength: 4
		},
		uemail: {
		  required: true,
		  email: true,
		},
		uphone: {
		  minlength: 10,
		  maxlength: 10
		},
		upass: {
		  required: true,
		  minlength: 4,
		  maxlength: 16
		},
		upassrep: {
		  required: true,
		  minlength: 4,
		  maxlength: 16,
		  equalTo: "#upass"
		}
	  },
	  messages: {
		uname: {
		  required: "It is required to add user name",
		  minlength: "Its too short. It should have minimum 4 charactors"
		},
		ufname: {
		  required: "It is required to add user full name",
		  minlength: "Its too short. It should have minimum 4 charactors"
		},
		uemail: {
		  required: "It is required to add user email",
		  email: "It is not an email address"
		},
		uphone: {
		  minlength: "It should have 10 numbers for phone number",
		  maxlength: "It should have 10 numbers for phone number"
		},
		upass: {
		  required: "It is required to add user password",
		  minlength: "It should hava minimum 4 charactors",
		  maxlength: "It should hava maximum 16 charactors"
		},
		upassrep: {
		  required: "It is required to retype user password",
		  minlength: "It should hava minimum 4 charactors",
		  maxlength: "It should hava maximum 16 charactors",
		  equalTo: "It should equal to your password"
		}
	  },
	  submitHandler: function(form) {
 
		  var uname= $('#uname').val();
		  var ufname= $('#ufname').val();
		  var uemail= $('#uemail').val();
		  var uphone= $('#uphone').val();
		  var upass= $('#upass').val();
		  var ugroup= $('#ugroup').val();

		  //alert(uname+" "+uphone+" "+ugroup);
		  
			$.ajax({  
			   type: "POST",  
			   url: baseURL+"user_management/OperationalUserService.php/operational_user_register",  
			   dataType: "json", 
			   data: {'usr_name':uname, 'usr_pwd':upass, 'usr_full_name':ufname, 'usr_email':uemail, 'usr_phone_number':uphone, 'usr_category':ugroup},
			   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', usr_api_key);},
			   success: function(resp){
					if(resp.message == "You are successfully registered"){
						sweetAlert("Success", "User is successfully registered", "success" );
						$( '#userRegistrationForm' ).each(function(){
							this.reset();
						});
					}else{
						sweetAlert("Oops...", resp.message, "error");
					}
					
			   },  
			   error: function(e){  
				sweetAlert("Oops...", "Something went wrong!" + e, "error");
			   }  
			 }); 
		  }
		});
	
	
		
});


function logout(){
			localStorage.setItem("usr_name", null);
			localStorage.setItem("usr_full_name", null);
			localStorage.setItem("usr_email", null);
			localStorage.setItem("usr_phone_number", null);
			localStorage.setItem("usr_api_key", null);
			localStorage.setItem("ucat_name", null);
			localStorage.setItem("ucat_description", null);
			localStorage.setItem("ou_recode_added_at", null);
			
			var UIbaseURL = localStorage.getItem("UIbaseURL");
			window.location.href = UIbaseURL;
};