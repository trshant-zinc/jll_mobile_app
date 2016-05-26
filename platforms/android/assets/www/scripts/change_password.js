var changePasswordObj = {
	checksecurityonformsubmit: function() {
	    var str = $('#password_original').val();
	    // cond 1 : Minimum Characters: 8
	    if( str.length >= 8 ){ f1=true ; }else{ f1=false ;  }
	    // cond 2 : Maximum Characters: 15
	    if( str.length <= 15 ){ f2=true ; }else{ f2=false ;  }
	    // c 3 : Minimum Alphabetic Characters: 5
	    if( str.match(/[a-zA-Z]/g) != null ){
	    if( str.match(/[a-zA-Z]/g).length >= 5 ){ f3=true ; }else{ f3=false ;   }
	    }else{ f3=false ; }
	    // c 4 : Minimum Numeric Characters 1
	
	    if( str.match(/[0-9]/g) != null ){
	    if( str.match(/[0-9]/g).length >= 1 ){ f4=true ; }else{ f4=false ;  }
	    }else{ f4=false ;  }
	
	
	    // c 5 : Maximum Repeated Characters: 2
	    s= str.split('');
	    t = {};
	    f5=true;
	    s.forEach( function(i){ 
	      if( f5 == true){ 
	         if( !t[i] ){ 
	              t[i] = 1; 
	         }else{ 
	              t[i] += 1; 
	              if( t[i] > 2 ){ f5 = false ; }
	         }  
	      } 
	   })
	    
	    patt = /["'£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
	    if( str.match(patt) === null ){ f6 = true ; }else{ f6 = false;  }
	
	    if( f1 && f2 && f3 && f4 && f5 && f6 ){
	      return true;
	    } else { return false; }
	},
	checksecurity: function () {
		var str = $('#password_original').val();
	    var sec_error = 0;
	    
	    // cond 1 : Minimum Characters: 8
	    if( str.length >= 8 ){ 
	    	$("#valicond1").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#valicond1").removeClass("green").addClass("red") ;  
	    	sec_error = 1;
	    }
	    
	    // cond 2 : Maximum Characters: 15
	    if( str.length <= 15 ){ 
	    	$("#valicond2").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#valicond2").removeClass("green").addClass("red") ; 
	    	sec_error = 1; 
	    }
	    
	    // c 3 : Minimum Alphabetic Characters: 5
	    if( str.match(/[a-zA-Z]/g) != null ){
	    	if( str.match(/[a-zA-Z]/g).length >= 5 ){ 
	    		$("#valicond3").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#valicond3").removeClass("green").addClass("red") ;  
	    		sec_error = 1;
	    	}
	    }else{ 
	    	$("#valicond3").removeClass("green").addClass("red") ;
	    	sec_error = 1;  
	    }
	    
	    // c 4 : Minimum Numeric Characters 1
	    if( str.match(/[0-9]/g) != null ){
	    	if( str.match(/[0-9]/g).length >= 1 ){ 
	    		$("#valicond4").removeClass("red").addClass("green") ; 
	    	}else{ 
	    		$("#valicond4").removeClass("green").addClass("red") ;
	    		sec_error = 1;  
	    	}
	    }else{ 
	    	$("#valicond4").removeClass("green").addClass("red") ; 
	    	sec_error = 1; 
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
	    	$("#valicond5").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#valicond5").removeClass("green").addClass("red") ;
	    	sec_error = 1;  
	    }
	
	    patt = /["Â£%\*\(\)_¬\{\}:~\>\<\?/|\[\\\]]/g
	    if( str.match(patt) === null ){ 
	    	$("#valicond6").removeClass("red").addClass("green") ; 
	    }else{ 
	    	$("#valicond6").removeClass("green").addClass("red") ; 
	    	sec_error = 1; 
	    }
	    
	    if(sec_error == 1){
	    	$("#password_original").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
	    }else{
	    	$("#password_original").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
	    }
	
	},
	sendValidate: function(){
		var password_current = $('#change_password_current').val();
		var password_original = $('#password_original').val();
		var password_copy = $('#password_copy').val();
		
		if((password_original == password_copy) && password_current != '' && password_original != '' && password_copy != ''){
			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: true,
				"url"  			: appObj.routes.changePassword,
				"data"			: {"password_current": password_current, "password_original": password_original, "password_copy": password_copy},
				"customData"	: {},
				"success"		: {"changePasswordObj" : "change_password_success"},
				"error"			: {"changePasswordObj" : "change_password_fail"}
			});
		}else{
			$(".modal_messages").html('<div class="alertvalidate close-parent error"><span class="error-icon"></span><h4>Something went wrong! Please check all fields and try again.</h4></div>');
			setTimeout(function(){
				$('.alertvalidate').remove();
			}, 5000);
		}
	},
	change_password_success: function(data, param){
		$('#change_password_form')[0].reset();
		$('.check_tick').removeClass('cross_tick').removeClass('right_tick');
		$('#valicond1, #valicond2, #valicond3, #valicond4, #valicond5, #valicond6').addClass('red').removeClass('green');
		$('#match_password').hide();
			
		$(".modal_messages").html('<div class="alertvalidate close-parent success"><span class="success-icon"></span><h4>'+data.data+'</h4></div>');
		setTimeout(function(){
			$('.alertvalidate').remove();
		}, 5000);
		// setTimeout(function(){
			// appObj.logout();
		// }, 10000);
	},
	change_password_fail: function(data, param){
		var error = data.responseJSON;
		$(".modal_messages").html('<div class="alertvalidate close-parent error"><span class="error-icon"></span><h4>'+error.error+'</h4></div>');
		setTimeout(function(){
			$('.alertvalidate').remove();
		}, 5000);
	},
	change_password_validate: function() {
		var password_original = $("#password_original").val();
		var password_copy = $("#password_copy").val();
		
		if((password_original!="") && (password_copy!="")){
			if(password_copy == password_original) {
				$("#match_password").css("display",'none');	
				$("#password_copy").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
			}else {
				$("#match_password").css("display",'block');
				$("#password_copy").next('.check_tick').removeClass('right_tick').addClass('cross_tick');
			}
		}else {
			$("#match_password").css("display",'none');
			$("#password_copy").next('.check_tick').removeClass('cross_tick').addClass('right_tick');
		}	
	},
	checkCurrentPassword: function(){
		var password_current = $('#change_password_current').val();
		
		if(password_current != ''){
			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.validatePassword,
				"data"			: {"password_current": password_current},
				"customData"	: {},
				"success"		: {"changePasswordObj" : "validate_password_success"},
				"error"			: {"changePasswordObj" : "validate_password_fail"}
			});
		}else{
			$("#change_password_current").next('.check_tick').removeClass('cross_tick').removeClass('right_tick');
		}
	},
	validate_password_success : function(data, param){
		$("#change_password_current").next('.check_tick').addClass('right_tick').removeClass('cross_tick');
	},
	validate_password_fail : function(data, param){
		$("#change_password_current").next('.check_tick').addClass('cross_tick').removeClass('right_tick');
	},
	init: function(){	
		this.bind();			
	},
	bind: function(){	
		
		$('.change_password_link').click(function(){
			$('#change_password_holder').show();
		});	
		
		$('.cancel_change_password').click(function(){
			$('#change_password_holder').fadeOut(300);
			$('#change_password_form')[0].reset();
			$('.check_tick').removeClass('cross_tick').removeClass('right_tick');
			$('#valicond1, #valicond2, #valicond3, #valicond4, #valicond5, #valicond6').addClass('red').removeClass('green');
			$('#match_password').hide();
		});
		
		$('.change_password_submit').click(function(){
			if(changePasswordObj.checksecurityonformsubmit()){
				changePasswordObj.sendValidate();
			}
		});
		
		$("#password_copy").keyup(function(){
			changePasswordObj.change_password_validate();
		});
		
		$("#change_password_current").keyup(function(){
			delay(function(){
				changePasswordObj.checkCurrentPassword();
			}, 500);
		});
		
		$('#change_password_form').bind('keypress', function(e) {
			if(e.keyCode==13){
				if(changePasswordObj.checksecurityonformsubmit()){
					changePasswordObj.sendValidate();
				}
			}
		});

				
	}
};
