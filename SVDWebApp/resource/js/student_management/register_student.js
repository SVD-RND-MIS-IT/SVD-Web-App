$(document).ready(function() {
	var sessionid = localStorage.getItem("usr_name");
	if(sessionid == null){
		swal({   title: "You are not logged in",   text: "Pleace loggin to the system.",   timer: 3000,   showConfirmButton: false });
		setTimeout(function(){     window.location.href = "../../";   }, 3000);
	}

	
});

