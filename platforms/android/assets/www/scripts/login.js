var loginObj = {
	error_status: "",
	validation_message: {
		"username" 	: "Enter Username.",
		"password" 	: "Enter Password.",
		"noMatch" 	: "Username and Password don't match."
	},
	login_success : function(data, param){
		
		localStorage.setItem('token', data.token);
		
		$('.logged_in_user').html(data.display_firstname);
		
		// Now safe to use device APIs
        appObj.init();
		videoObj.init();
		documentObj.init();
		faqObj.init();
		linkObj.init();
		newsObj.init();	
		changePasswordObj.init();
		
		if(data.first_time_login == 'yes'){
			$('#login_holder').hide();
			$('#security_questions_holder').show();	  
			securityQuestionsObj.init();	      
		}else{
			$('#login_holder').hide();
			$('.page').show();	
		}	
	},
	login_fail : function(data, param){
		loginObj.error_status = true;
		$('.login_holder ul.error_message li').hide();
		var error_list = data.responseJSON;
		$.each(error_list.error, function(key, value){
			$('.login_holder .error_message .'+value).show();
		});
	},
	checkForValidation: function() {
		$('.login_holder ul.error_message li').hide();
		loginObj.error_status = false;
		
		var username = $('#username').val();
		var password = $('#password').val();
		
		if(username == ''){
			$('.login_holder .error_message .username').show();
			loginObj.error_status = true;
		}else{
			$('.login_holder .error_message .username').hide();
		}
		
		if(password == ''){
			$('.login_holder .error_message .password').show();
			loginObj.error_status = true;
		}else{
			$('.login_holder .error_message .password').hide();
		}
		
				
	},
	change_button_style: function(){
		var username = $('#username').val();
		var password = $('#password').val();
		
		if (username != '' && password != '') {
			$('.login_holder #submit_btn').addClass('btn-login');
		} else {
			$('.login_holder #submit_btn').removeClass('btn-login');
		}
	},
	loginCheck: function() {	
		
		if(loginObj.error_status == false){
			if($('#username').val() != ""){
				var email = $('#username').val();
			}else{
				var email = "";
			}
			
			if($('#password').val() != ""){
				var password = $('#password').val();
			}else{
				var password = "";
			}
			
			$.ajax({
				"dataType"		: 'JSON',
		        "type"			: 'POST',
		        "beforeSend"	:function(request){
		        	appObj.ajax_counter++;
		        	appObj.show_loader();
				},
				"complete"    	: function(){
					appObj.ajax_counter--;
					if(appObj.ajax_counter == 0){
						appObj.hide_loader();
					}
				},
		        "url"			: appObj.api_url+appObj.routes.login+'?email='+email+'&password='+password+'&imei=359044061247297&latitude=26.6139391&longitude=77.20902120000005',
			    "success"		: function (data) {
			    	loginObj.login_success(data, '');
			    },
			    "error"			: function(data){
					loginObj.login_fail(data, '');
	            }
			});
		}		
	},
	load_forgot_password_template: function(){

		$('#login_holder').hide();
		forgotPasswordObj.init();
		$('#forgot_password_holder').show();
		
	},
	init: function(){
		$('*[data-include]').each(function(){
			var $this = $(this);
			var file = $this.attr('data-include');
			$(this).load( file , function(){
				if($this.attr('data-callback')){
					if($this.attr('data-callback') != ""){
						appObj[$this.attr('data-callback')]()
					}
				}
			});	
		});
				
		this.bind();		
	},
	bind: function(){	
		
		$('#login_holder').on('keyup', '#username', function() {
			loginObj.change_button_style();
		});
		
		$('#login_holder').on('keyup', '#password', function() {
			loginObj.change_button_style();
		});	

		$('#login_holder').on('touchstart, click', '#submit_btn', function() {
			loginObj.checkForValidation();
			loginObj.change_button_style();
			loginObj.loginCheck();
		});
		
		$('#login_holder').on('touchstart, click', '#forgot_password_button', function(){
			loginObj.load_forgot_password_template($(this));
		});	
		
	}
};