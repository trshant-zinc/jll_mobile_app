var forgotPasswordObj = {
	error_status: "",
	owasp : "",
	validation_message: {
		"pin" 				: "Enter Staff Pin.",
		"question1" 		: "Select First Security Question.",
		"question2" 		: "Select Second Security Question.",
		"answer1" 			: "Enter First Security Question Answer.",
		"answer2" 			: "Enter Second Security Question Answer.",
		"password" 			: "Enter Password.",
		"repeatPassword"	: "Enter Repeat Password.",
		"confirmPassword"	: "Password and Repeat Password don't match.",
		"linkedQuestion"	: "Staff pin and linked question and answers don't match."
	},
	load_login_template: function(){
		
		$('#forgot_password_holder').hide();
		$('#login_holder').show();
		
	},
	check_pin: function($this){
		
		if($this.val() != ""){
			$('.security_question1_holder, .security_question2_holder').show();
		}else{
			$('.security_question1_holder, .security_question1_answer_holder, .security_question2_holder, .security_question2_answer_holder, .fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').hide();
			$('#security_question1, #security_question1_answer, #security_question2, #security_question2_answer, #fp_new_password, #repeat_fp_new_password').val('');
		}
		
	},
	check_security_question1: function(){
		
		var security_question1 = $('#security_question1').val();
		$('#security_question2 option').removeAttr('disabled');
		if(security_question1 != ""){
			$('.security_question1_answer_holder').show();
			$('#security_question2 option[value="'+security_question1+'"]').attr('disabled', 'disabled');
		}else{
			$('.security_question1_answer_holder, .fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').hide();
			$('#security_question1_answer, #fp_new_password, #repeat_fp_new_password').val('');
		}
				
	},
	check_security_question1_answer: function(){
		
		var security_question1_answer = $('#security_question1_answer').val();
		var security_question2_answer = $('#security_question2_answer').val();	
		
		if(security_question1_answer != "" && security_question2_answer != ""){
			$('.fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').show();
		}else{
			$('.fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').hide();
			$('#fp_new_password, #repeat_fp_new_password').val('');
		}
				
	},
	check_security_question2: function(){
		
		var security_question2 = $('#security_question2').val();
		$('#security_question1 option').removeAttr('disabled');
		if(security_question2 != ""){
			$('.security_question2_answer_holder').show();
			$('#security_question1 option[value="'+security_question2+'"]').attr('disabled', 'disabled');
		}else{
			$('.security_question2_answer_holder, .fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').hide();
			$('#security_question2_answer, #fp_new_password, #repeat_fp_new_password').val('');
		}
				
	},
	check_security_question2_answer: function(){
		
		var security_question1_answer = $('#security_question1_answer').val();
		var security_question2_answer = $('#security_question2_answer').val();
		
		if(security_question1_answer != "" && security_question2_answer != ""){
			$('.fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').show();
		}else{
			$('.fp_new_password_holder, .fp_new_password_guidline, .repeat_fp_new_password_holder').hide();
			$('#fp_new_password, #repeat_fp_new_password').val('');
		}
				
	},
	check_fp_new_password: function(){
				
	},
	check_repeat_fp_new_password: function(){
		
	},
	forgot_password_success: function(data, param){
		$('#security_questions_holder, #forgot_password_holder, #login_holder, .page').hide();		
		$('#reset_password_holder').fadeIn(500);	
	},
	forgot_password_error: function(data, param){
		forgotPasswordObj.error_status = true;
		$('.forgot_password_holder ul.error_message li').hide();
		var error_list = data.responseJSON;
		$.each(error_list.error, function(key, value){
			$('.forgot_password_holder .error_message .'+value).show();
		});
	},
	validate_forgot_password: function(){
		var forgot_staff_pin = $('#forgot_staff_pin').val();
		var security_question1 = $('#security_question1').val();
		var security_question2 = $('#security_question2').val();
		var security_question1_answer = $('#security_question1_answer').val();
		var security_question2_answer = $('#security_question2_answer').val();
		var password = $('#fp_new_password').val();
		var confirm_password = $('#repeat_fp_new_password').val();
		
		forgotPasswordObj.error_status = false;
		$('.forgot_password_holder ul.error_message li').hide();
		
		
		if(forgot_staff_pin == ""){
			$('.forgot_password_holder .error_message .pin').show();
			forgotPasswordObj.error_status = true;
		}else{
			$('.forgot_password_holder .error_message .pin').hide();
			
			if(security_question1 == ""){
				$('.forgot_password_holder .error_message .question1').show();
				forgotPasswordObj.error_status = true;
			}else{
				$('.forgot_password_holder .error_message .question1').hide();
				if(security_question1_answer == ""){
					$('.forgot_password_holder .error_message .answer1').show();
					forgotPasswordObj.error_status = true;
				}else{
					$('.forgot_password_holder .error_message .answer1').hide();
				}
			}
			
			if(security_question2 == ""){
				$('.forgot_password_holder .error_message .question2').show();
				forgotPasswordObj.error_status = true;
			}else{
				$('.forgot_password_holder .error_message .question2').hide();
				if(security_question2_answer == ""){
					$('.forgot_password_holder .error_message .answer2').show();
					forgotPasswordObj.error_status = true;
				}else{
					$('.forgot_password_holder .error_message .answer2').hide();
				}
			}
			
			if(security_question1_answer != "" && security_question2_answer != ""){
				if(password == "" ){
					$('.forgot_password_holder .error_message .password').show();
					forgotPasswordObj.error_status = true;
				}else{
					$('.forgot_password_holder .error_message .password').hide();
					if(confirm_password == ""){
						$('.forgot_password_holder .error_message .repeatPassword').show();
						forgotPasswordObj.error_status = true;
					}else{
						$('.forgot_password_holder .error_message .repeatPassword').hide();
						if(password != confirm_password){
							$('.forgot_password_holder .error_message .confirmPassword').show();
							forgotPasswordObj.error_status = true;
						}else{
							$('.forgot_password_holder .error_message .confirmPassword').hide();
							if(forgotPasswordObj.owasp == false){
								$('.forgot_password_holder .error_message .owasp').show();
								forgotPasswordObj.error_status = true;
							}else{
								$('.forgot_password_holder .error_message .owasp').hide();
							}
						}
					}
				}
			}
		}
		
		if(forgotPasswordObj.error_status == false){
			var data = {
				"data" : {
					"pin" 				: forgot_staff_pin,
					"question1" 		: security_question1,
					"question2" 		: security_question2,
					"answer1" 			: security_question1_answer,
					"answer2" 			: security_question2_answer,
					"password" 			: password,
					"repeatPassword"	: confirm_password
				}
			};
			
			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"url"  			: appObj.routes.forgotPassword,
				"data"			: data,
				"customData"	: {},
				"success"		: {
					"forgotPasswordObj" : "forgot_password_success"
				},
				"error"			: {
					"forgotPasswordObj" : "forgot_password_error"
				}
			});
		}

		
		
	},
	checksecurity: function () {
		var str = $('#fp_new_password').val();
		
		forgotPasswordObj.owasp = true;
	    
	    // cond 1 : Minimum Characters: 8
	    if( str.length >= 8 ){ 
	    	$("#fp_valicond1").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#fp_valicond1").removeClass("green").addClass("red") ;  
	    	forgotPasswordObj.owasp = false;
	    }
	    
	    // cond 2 : Maximum Characters: 15
	    if( str.length <= 15 ){ 
	    	$("#fp_valicond2").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#fp_valicond2").removeClass("green").addClass("red") ; 
	    	forgotPasswordObj.owasp = false;
	    }
	    
	    // c 3 : Minimum Alphabetic Characters: 5
	    if( str.match(/[a-zA-Z]/g) != null ){
	    	if( str.match(/[a-zA-Z]/g).length >= 5 ){ 
	    		$("#fp_valicond3").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#fp_valicond3").removeClass("green").addClass("red") ;  
	    		forgotPasswordObj.owasp = false;
	    	}
	    }else{ 
	    	$("#fp_valicond3").removeClass("green").addClass("red") ;
	    	forgotPasswordObj.owasp = false; 
	    }
	    
	    // c 4 : Minimum Numeric Characters 1
	    if( str.match(/[0-9]/g) != null ){
	    	if( str.match(/[0-9]/g).length >= 1 ){ 
	    		$("#fp_valicond4").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#fp_valicond4").removeClass("green").addClass("red") ;
	    		forgotPasswordObj.owasp = false; 
	    	}
	    }else{ 
	    	$("#fp_valicond4").removeClass("green").addClass("red") ; 
	    	forgotPasswordObj.owasp = false;
	    }
	
	    // c 5 : Maximum Repeated Characters: 2
	    s= str.split('');
	    t = {};
	    flag=true;
	    s.forEach( function(i){ 
	      if( flag == true){ 
	         if( !t[i] ){ 
	              t[i] = 1; 
	         }else{ 
	              t[i] += 1; 
	              if( t[i] > 2 ){ flag = false ; }
	         }  
	      } 
	   	});
	   	
	    if( flag ){ 
	    	$("#fp_valicond5").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#fp_valicond5").removeClass("green").addClass("red") ;
	    	forgotPasswordObj.owasp = false; 
	    }
	
	    patt = /["Â£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
	    if( str.match(patt) === null ){ 
	    	$("#fp_valicond6").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#fp_valicond6").removeClass("green").addClass("red") ; 
	    	forgotPasswordObj.owasp = false;
	    }
	    
	    if(forgotPasswordObj.owasp == false){
	    	$("#fp_new_password").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
	    }else{
	    	$("#fp_new_password").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
	    }
	
	},
	change_password_validate: function() {
		var fp_new_password = $("#fp_new_password").val();
		var repeat_fp_new_password = $("#repeat_fp_new_password").val();
		
		if((fp_new_password!="") && (repeat_fp_new_password!="")){
			if(repeat_fp_new_password == fp_new_password) {
				$("#fp_match_password").css("display",'none');	
				$("#repeat_fp_new_password").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
			}else {
				$("#fp_match_password").css("display",'block');
				$("#repeat_fp_new_password").next('.check_tick').removeClass('right_tick').addClass('cross_tick');
			}
		}else {
			$("#fp_match_password").css("display",'none');
			$("#repeat_fp_new_password").next('.check_tick').removeClass('cross_tick').removeClass('right_tick');
		}	
	},
	init: function(){	
		this.bind();	
		
		
		var error_messages = "";
		$.each(forgotPasswordObj.validation_message, function(key, value){
			error_messages = error_messages+"<li class='"+key+"' style='display:none;'>"+value+"</li>";
		});
		$('.forgot_password_holder .error_message').html(error_messages);
		
	},
	bind: function(){	
		
		$('#forgot_password_holder').on('keyup', '#forgot_staff_pin', function() {
			forgotPasswordObj.check_pin($(this));
		});
		
		$('#forgot_password_holder').on('change', '#security_question1', function() {	
			forgotPasswordObj.check_security_question1();	
		});
		
		$('#forgot_password_holder').on('change', '#security_question2', function() {
			forgotPasswordObj.check_security_question2();
		});
		
		$('#forgot_password_holder').on('keyup', '#security_question1_answer', function() {
			forgotPasswordObj.check_security_question1_answer();
		});
		
		$('#forgot_password_holder').on('keyup', '#security_question2_answer', function() {
			forgotPasswordObj.check_security_question2_answer();
		});
		
		$('#forgot_password_holder').on('keyup', '#fp_new_password', function() {
			forgotPasswordObj.checksecurity();
		});
		
		$('#forgot_password_holder').on('keyup', '#repeat_fp_new_password', function() {
			forgotPasswordObj.change_password_validate();
		});
		
		$('#forgot_password_holder').on('touchstart, click', '#login_button', function(){
			forgotPasswordObj.load_login_template($(this));
		});
		
		$('#forgot_password_holder').on('touchstart, click', '#forgot_password_submit_btn', function(){
			forgotPasswordObj.validate_forgot_password();
		});	
		
		$('#reset_password_holder').on('touchstart, click', '#reset_password_submit_btn', function(){
			appObj.show_loader();
			appObj.logout_success();
		});					
	}
};
