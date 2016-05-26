var securityQuestionsObj = {
	error_status: "",
	owasp : "",
	validation_message: {
		"question1" 		: "Select First Security Question.",
		"question2" 		: "Select Second Security Question.",
		"answer1" 			: "Enter First Security Question Answer.",
		"answer2" 			: "Enter Second Security Question Answer.",
		"password" 			: "Enter Password.",
		"repeatPassword"	: "Enter Repeat Password.",
		"confirmPassword"	: "Password and Repeat Password don't match."
	},
	check_security_questions1: function(){
		
		var security_questions1 = $('#security_questions1').val();
		$('#security_questions2 option').removeAttr('disabled');
		if(security_questions1 != ""){
			$('.security_questions1_answer_holder').show();
			$('#security_questions2 option[value="'+security_questions1+'"]').attr('disabled', 'disabled');
		}else{
			$('.security_questions1_answer_holder, .sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').hide();
			$('#security_questions1_answer, #sq_new_password, #repeat_sq_new_password').val('');
		}
				
	},
	check_security_questions1_answer: function(){
		
		var security_questions1_answer = $('#security_questions1_answer').val();
		var security_questions2_answer = $('#security_questions2_answer').val();	
		
		if(security_questions1_answer != "" && security_questions2_answer != ""){
			$('.sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').show();
		}else{
			$('.sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').hide();
			$('#sq_new_password, #repeat_sq_new_password').val('');
		}
				
	},
	check_security_questions2: function(){
		
		var security_questions2 = $('#security_questions2').val();
		$('#security_questions1 option').removeAttr('disabled');
		if(security_questions2 != ""){
			$('.security_questions2_answer_holder').show();
			$('#security_questions1 option[value="'+security_questions2+'"]').attr('disabled', 'disabled');
		}else{
			$('.security_questions2_answer_holder, .sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').hide();
			$('#security_questions2_answer, #sq_new_password, #repeat_sq_new_password').val('');
		}
				
	},
	check_security_questions2_answer: function(){
		
		var security_questions1_answer = $('#security_questions1_answer').val();
		var security_questions2_answer = $('#security_questions2_answer').val();
		
		if(security_questions1_answer != "" && security_questions2_answer != ""){
			$('.sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').show();
		}else{
			$('.sq_new_password_holder, .sq_new_password_guidline, .repeat_sq_new_password_holder').hide();
			$('#sq_new_password, #repeat_sq_new_password').val('');
		}
				
	},
	check_sq_new_password: function(){
				
	},
	check_repeat_sq_new_password: function(){
		
	},
	security_questions_success: function(data, param){
		$('#security_questions_holder, #forgot_password_holder, #login_holder').hide();
		$('.page').fadeIn(500);		
	},
	security_questions_error: function(data, param){
		securityQuestionsObj.error_status = true;
		$('.security_questions_holder ul.error_message li').hide();
		var error_list = data.responseJSON;
		$.each(error_list.error, function(key, value){
			$('.security_questions_holder .error_message .'+value).show();
		});
	},
	validate_security_questions: function(){
		var security_questions1 = $('#security_questions1').val();
		var security_questions2 = $('#security_questions2').val();
		var security_questions1_answer = $('#security_questions1_answer').val();
		var security_questions2_answer = $('#security_questions2_answer').val();
		var password = $('#sq_new_password').val();
		var confirm_password = $('#repeat_sq_new_password').val();
		
		securityQuestionsObj.error_status = false;
		$('.security_questions_holder ul.error_message li').hide();
		
		
		if(forgot_staff_pin == ""){
			$('.security_questions_holder .error_message .pin').show();
			securityQuestionsObj.error_status = true;
		}else{
			$('.security_questions_holder .error_message .pin').hide();
			
			if(security_questions1 == ""){
				$('.security_questions_holder .error_message .question1').show();
				securityQuestionsObj.error_status = true;
			}else{
				$('.security_questions_holder .error_message .question1').hide();
				if(security_questions1_answer == ""){
					$('.security_questions_holder .error_message .answer1').show();
					securityQuestionsObj.error_status = true;
				}else{
					$('.security_questions_holder .error_message .answer1').hide();
				}
			}
			
			if(security_questions2 == ""){
				$('.security_questions_holder .error_message .question2').show();
				securityQuestionsObj.error_status = true;
			}else{
				$('.security_questions_holder .error_message .question2').hide();
				if(security_questions2_answer == ""){
					$('.security_questions_holder .error_message .answer2').show();
					securityQuestionsObj.error_status = true;
				}else{
					$('.security_questions_holder .error_message .answer2').hide();
				}
			}
			
			if(security_questions1_answer != "" && security_questions2_answer != ""){
				if(password == "" ){
					$('.security_questions_holder .error_message .password').show();
					securityQuestionsObj.error_status = true;
				}else{
					$('.security_questions_holder .error_message .password').hide();
					if(confirm_password == ""){
						$('.security_questions_holder .error_message .repeatPassword').show();
						securityQuestionsObj.error_status = true;
					}else{
						$('.security_questions_holder .error_message .repeatPassword').hide();
						if(password != confirm_password){
							$('.security_questions_holder .error_message .confirmPassword').show();
							securityQuestionsObj.error_status = true;
						}else{
							$('.security_questions_holder .error_message .confirmPassword').hide();
							if(securityQuestionsObj.owasp == false){
								$('.security_questions_holder .error_message .owasp').show();
								securityQuestionsObj.error_status = true;
							}else{
								$('.security_questions_holder .error_message .owasp').hide();
							}
						}
					}
				}
			}
		}
		
		if(securityQuestionsObj.error_status == false){
			var data = {
				"data" : {
					"question1" 		: security_questions1,
					"question2" 		: security_questions2,
					"answer1" 			: security_questions1_answer,
					"answer2" 			: security_questions2_answer,
					"password" 			: password,
					"repeatPassword"	: confirm_password
				}
			};
			
			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"url"  			: appObj.routes.securityQuestions,
				"data"			: data,
				"loader"		: true,
				"customData"	: {},
				"success"		: {
					"securityQuestionsObj" : "security_questions_success"
				},
				"error"			: {
					"securityQuestionsObj" : "security_questions_error"
				}
			});
		}

		
		
	},
	checksecurity: function () {
		var str = $('#sq_new_password').val();
		
		securityQuestionsObj.owasp = true;
	    
	    // cond 1 : Minimum Characters: 8
	    if( str.length >= 8 ){ 
	    	$("#sq_valicond1").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#sq_valicond1").removeClass("green").addClass("red") ;  
	    	securityQuestionsObj.owasp = false;
	    }
	    
	    // cond 2 : Maximum Characters: 15
	    if( str.length <= 15 ){ 
	    	$("#sq_valicond2").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#sq_valicond2").removeClass("green").addClass("red") ; 
	    	securityQuestionsObj.owasp = false;
	    }
	    
	    // c 3 : Minimum Alphabetic Characters: 5
	    if( str.match(/[a-zA-Z]/g) != null ){
	    	if( str.match(/[a-zA-Z]/g).length >= 5 ){ 
	    		$("#sq_valicond3").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#sq_valicond3").removeClass("green").addClass("red") ;  
	    		securityQuestionsObj.owasp = false;
	    	}
	    }else{ 
	    	$("#sq_valicond3").removeClass("green").addClass("red") ;
	    	securityQuestionsObj.owasp = false; 
	    }
	    
	    // c 4 : Minimum Numeric Characters 1
	    if( str.match(/[0-9]/g) != null ){
	    	if( str.match(/[0-9]/g).length >= 1 ){ 
	    		$("#sq_valicond4").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#sq_valicond4").removeClass("green").addClass("red") ;
	    		securityQuestionsObj.owasp = false; 
	    	}
	    }else{ 
	    	$("#sq_valicond4").removeClass("green").addClass("red") ; 
	    	securityQuestionsObj.owasp = false;
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
	    	$("#sq_valicond5").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#sq_valicond5").removeClass("green").addClass("red") ;
	    	securityQuestionsObj.owasp = false; 
	    }
	
	    patt = /["Â£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
	    if( str.match(patt) === null ){ 
	    	$("#sq_valicond6").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#sq_valicond6").removeClass("green").addClass("red") ; 
	    	securityQuestionsObj.owasp = false;
	    }
	    
	    if(securityQuestionsObj.owasp == false){
	    	$("#sq_new_password").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
	    }else{
	    	$("#sq_new_password").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
	    }
	
	},
	change_password_validate: function() {
		var sq_new_password = $("#sq_new_password").val();
		var repeat_sq_new_password = $("#repeat_sq_new_password").val();
		
		if((sq_new_password!="") && (repeat_sq_new_password!="")){
			if(repeat_sq_new_password == sq_new_password) {
				$("#sq_match_password").css("display",'none');	
				$("#repeat_sq_new_password").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
			}else {
				$("#sq_match_password").css("display",'block');
				$("#repeat_sq_new_password").next('.check_tick').removeClass('right_tick').addClass('cross_tick');
			}
		}else {
			$("#sq_match_password").css("display",'none');
			$("#repeat_sq_new_password").next('.check_tick').removeClass('cross_tick').removeClass('right_tick');
		}	
	},
	init: function(){	
		this.bind();	
		
		var error_messages = "";
		$.each(securityQuestionsObj.validation_message, function(key, value){
			error_messages = error_messages+"<li class='"+key+"' style='display:none;'>"+value+"</li>";
		});
		$('.security_questions_holder .error_message').html(error_messages);
		
	},
	bind: function(){	
		
		$('#security_questions_holder').on('change', '#security_questions1', function() {	
			securityQuestionsObj.check_security_questions1();	
		});
		
		$('#security_questions_holder').on('change', '#security_questions2', function() {
			securityQuestionsObj.check_security_questions2();
		});
		
		$('#security_questions_holder').on('keyup', '#security_questions1_answer', function() {
			securityQuestionsObj.check_security_questions1_answer();
		});
		
		$('#security_questions_holder').on('keyup', '#security_questions2_answer', function() {
			securityQuestionsObj.check_security_questions2_answer();
		});
		
		$('#security_questions_holder').on('keyup', '#sq_new_password', function() {
			securityQuestionsObj.checksecurity();
		});
		
		$('#security_questions_holder').on('keyup', '#repeat_sq_new_password', function() {
			securityQuestionsObj.change_password_validate();
		});
		
		$('#security_questions_holder').on('touchstart, click', '#security_questions_submit_btn', function(){
			securityQuestionsObj.validate_security_questions();
		});
					
	}
};
