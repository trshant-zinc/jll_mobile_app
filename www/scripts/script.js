var appObj = {
	api_url : 'http://jll.admin247.org/v1/',
	routes : {
		"login" 				: "login",
		"logout"				: "logout",
		"forgotPassword" 		: "forgotPassword",
		"GetAppConfig" 			: "GetAppConfig",
		"changePassword" 		: "changePassword",
		"validatePassword" 		: "validatePassword",
		"securityQuestions"		: "firstLoginSecurityQuestion",
		"list" : {
			"tab" : {
				"document" 		: "list-documents",
				"video" 		: "list-videos",
				"link" 			: "list-links",
				"news" 			: "list-news",
				"faq" 			: "list-faqs"
			},
			"category" : {
				"document" 		: "list-document-categories",
				"video" 		: "list-video-categories",
				"link" 			: "list-link-categories",
				"news" 			: "list-news-categories",
				"faq" 			: "list-faq-categories"
			},
			"filter" : {
				"countries" 	: "list-countries",
				"regions" 		: "list-regions",
				"zones" 		: "list-zones",
				"venues" 		: "list-venues",
				"access_levels" : "list-access-levels"
			},
		},
		"add" : {
			"document" 		: "insertDocument",
			"video" 		: "list-videos",
			"link" 			: "insertLink",
			"news" 			: "list-news",
			"faq" 			: "list-faqs"
		},
		"detail" : {
			"video" 		: "get-video-detail",
			"news" 			: "get-news-detail",
			"faq" 			: "get-faq-detail"
		}		
	},
	ajax_counter : "",
	onOffline: function(){
		if(!$('#no_internet_holder').is(':visible')){
			$('#no_internet_overlay_holder').show();
		}
	},
	onOnline: function(){
		$('#no_internet_overlay_holder').hide();
		if($('#no_internet_holder').is(':visible')){
			initialise();
		}
	},
	checkConnection: function() {
	    var networkState = navigator.connection.type;
	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.CELL]     = 'Cell generic connection';
	    states[Connection.NONE]     = 'No network connection';
	
		return states[networkState];
	},
	custom_ajax: function($param){
		
		if(!("data" in $param)){
			$param.data = "";
		}
		if(!("beforeSend" in $param)){
			$param.beforeSend = "";
		}
		if(!("error" in $param)){
			$param.error = "";
		}
		if(!("loader" in $param)){
			$param.loader = true;
		}
		
		if("customUrl" in $param){
			$url = $param.customUrl;
		}else{
			$url = appObj.api_url+$param.url;
		}
		
		$url = $url.replace("/?", "?");		
		$.ajax({
			"dataType"		: $param.dataType,
	        "type"			: $param.type,
	        "url"			: $url,
	        "data"			: $param.data,
	        "beforeSend"	:function(request){
	        	appObj.ajax_counter++;
	        	var retrievedToken = localStorage.getItem('token');
	        	request.setRequestHeader("Authorization", "bearer "+retrievedToken);
	        	
	        	if($param.loader == true){
	        		appObj.show_loader();
	        	}
	        	
				$.each($param.beforeSend, function(key, value) {
	    			window[key][value](data, $param.customData);
	    		});
			},
			"complete"    	: function(){
				appObj.ajax_counter--;
				if(appObj.ajax_counter == 0){
					appObj.hide_loader();
				}
			},
		    "success"		: function (data) {
		    	$.each($param.success, function(key, value) {
	    			window[key][value](data, $param.customData);
	    		});
		    },
		    "error"			: function(data){
				$.each($param.error, function(key, value) {
	    			window[key][value](data, $param.customData);
	    		});
            }
		});
		
	},
	getAppConfig : function(){
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"loader"		: true,
			"url"  			: appObj.routes.GetAppConfig,
			"customData"	: {},
			"success"		: {"appObj" : "load_app_config"}
		});
	},
	load_app_config : function(data, param){
		//overwrite forgot password error messages from config.
		$.each(data.forgot_password_error_messages, function(key, value){
			if(value != ""){
				forgotPasswordObj.validation_message[key] = value;
			}
		});
		
		//overwrite login error messages from config.
		$.each(data.login_error_messages, function(key, value){
			if(value != ""){
				loginObj.validation_message[key] = value;
			}
		});
		
		//overwrite security question error messages from config.
		$.each(data.security_questions_error_messages, function(key, value){
			if(value != ""){
				securityQuestionsObj.validation_message[key] = value;
			}
		});
	},
	logout: function(){
		$('#security_questions_holder, #forgot_password_holder, #login_holder, .page').hide();	
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "POST",
			"loader"		: false,
			"url"  			: appObj.routes.logout,
			"customData"	: {},
			"success"		: {"appObj" : "logout_success"}
		});
	},
	show_loader: function(){
		$('#overlay_loader_holder').show();
	},
	hide_loader: function(){
		$('#overlay_loader_holder').hide();
	},
	logout_success: function(){
		window.location.reload(true);
	},
	load_login_error_messages : function(){
		var error_messages = "";
		$.each(loginObj.validation_message, function(key, value){
			error_messages = error_messages+"<li class='"+key+"' style='display:none;'>"+value+"</li>";
		});
		$('.login_holder .error_message').html(error_messages);
	},
	load_listing_tab : function($this){
		
		var tab = $this.attr('data-tab');
		var title = $this.attr('data-tabTitle');
		
		$('ul.main-menu li').removeClass('active');
		$('ul.main-menu a[data-tab="'+tab+'"]').closest('li').addClass('active');
		$('#content .layout').hide();
		$('#'+tab+'_tab_list').show();
		
		$('.current_tab').html(title);
						
		if( $('#'+tab+'_tab_list').hasClass('empty_container') ){
			$('#'+tab+'_tab_list').load( "includes/"+tab+"_list.html", function() {
  				$(this).removeClass('empty_container');
  				
  				$('#'+tab+'_tab_list .documents_wrap').addClass('loading_content');
  				
  				if(tab == 'document' || tab == 'video' || tab == 'link' || tab == 'news'){
  					
  					$.each(['countries', 'regions', 'zones', 'venues'], function(key, value){
  						appObj.custom_ajax({
							"dataType" 		: "JSON",
							"type" 			: "GET",
							"loader"		: false,
							"url"  			: appObj.routes.list.filter[value],
							"customData"	: {
								'tab' : tab
							},
							"success"		: {"appObj" : "list_"+value+"_success"}
						});
  					});
  					
  				}
  				
  				appObj.custom_ajax({
					"dataType" 		: "JSON",
					"type" 			: "GET",
					"loader"		: false,
					"url"  			: appObj.routes.list.category[tab],
					"customData"	: {
						'tab' : tab
					},
					"success"		: {"appObj" : "list_categories_success"}
				});
  				
				appObj.custom_ajax({
					"dataType" 		: "JSON",
					"type" 			: "GET",
					"loader"		: false,
					"url"  			: appObj.routes.list.tab[tab],
					"customData"	: {
						'tab' : tab
					},
					"success"		: {"appObj" : "list_tab_success"},
					"error"			: {"appObj" : "list_tab_error"}
				});
				
			});
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	},
	headerinit: function(){
		var now = new Date();
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var formattedDate = days[now.getDay()]+" "+now.getDate()+" "+months[now.getMonth()]+" "+now.getFullYear();
		$('.month-date').html(formattedDate);
	},
	list_countries_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
		    content = content + '<option value="'+value.id_cnt+'">'+value.name_cnt+'</option>';
		});
		$('#'+param.tab+'_tab_list .'+param.tab+'_country, #'+param.tab+'_tab_add .'+param.tab+'_country').html(content).multiselect({
			selectedText: "# of # selected",
			noneSelectedText: 'All Countries'
		});
	},
	list_regions_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
		    content = content + '<option value="'+value.id_rgs+'">'+value.name_rgs+'</option>';
		});
		$('#'+param.tab+'_tab_list .'+param.tab+'_region, #'+param.tab+'_tab_add .'+param.tab+'_region').html(content).multiselect({
			selectedText: "# of # selected",
			noneSelectedText: 'All Regions'
		});
	},
	list_zones_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
		    content = content + '<option value="'+value.pk_zone+'">'+value.zone_name+'</option>';
		});
		$('#'+param.tab+'_tab_list .'+param.tab+'_zone, #'+param.tab+'_tab_add .'+param.tab+'_zone').html(content).multiselect({
			selectedText: "# of # selected",
			noneSelectedText: 'All Zones'
		});
	},
	list_venues_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
		    content = content + '<option value="'+value.id+'">'+value.name+'</option>';
		});
		$('#'+param.tab+'_tab_list .'+param.tab+'_venue, #'+param.tab+'_tab_add .'+param.tab+'_venue').html(content).multiselect({
			selectedText: "# of # selected",
			noneSelectedText: 'All Venues'
		});
	},
	list_access_levels_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
		    content = content + '<option value="'+value.id_ulv+'">'+value.level_ulv+'</option>';
		});
		$('#'+param.tab+'_tab_list .'+param.tab+'_access_level, #'+param.tab+'_tab_add .'+param.tab+'_access_level').html(content).multiselect({
			selectedText: "# of # selected",
			noneSelectedText: 'All Access Levels'
		});
	},
	list_categories_success : function(data, param){
		var content = "<li><a class='active' href='javascript:void(0);' data-cat='0' data-tab='"+param.tab+"'>All</a></li>";
    	$.each(data.data, function(key, value) {
    		
    		switch(param.tab){
    			case "document": 
    				content = content + '<li><a href="javascript:void(0); data-cat="'+value.id_dwnctg+'" data-tab="'+param.tab+'">'+value.category_dwnctg+'</a></li>';
    			break;
    			
    			case "news": 
    				content = content + '<li><a href="javascript:void(0);" data-cat="'+value.id_nwsctg+'" data-tab="'+param.tab+'">'+value.category_nwsctg+'</a></li>';
    			break;
    			
    			case "video": 
    				content = content + '<li><a href="javascript:void(0);" data-cat="'+value.id_vdoctg+'" data-tab="'+param.tab+'">'+value.category_vdoctg+'</a></li>';
    			break;
    			
    			case "faq": 
    				content = content + '<li><a href="javascript:void(0);" data-cat="'+value.id_faqctg+'" data-tab="'+param.tab+'">'+value.category_faqctg+'</a></li>';
    			break;
    			
    			case "link": 
    				content = content + '<li><a href="javascript:void(0);" data-cat="'+value.id_lksctg+'" data-tab="'+param.tab+'">'+value.category_lksctg+'</a></li>';
    			break;
    		}
		    
		});
		$('#'+param.tab+'_tab_list .documents_menu').html(content);
	},
	list_tab_success : function(data, param){
		var content = "";
    	$.each(data.data, function(key, value) {
    		
    		switch(param.tab){
    			case "document": 
    				content += '<div class="document_row"><div class="icon"><a onclick="window.open(\''+value.url+'\', \'_system\');" href="javascript:void(0);"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a onclick="window.open(\''+value.url+'\', \'_system\');" href="javascript:void(0);">'+value.title+'</a></h3><p>'+value.date_label+value.date+'<span>'+value.size_label+value.size+'</span></p></div><div class="clr"></div></div>';
    			break;
    			
    			case "news": 
    				content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p>'+value.label+value.date+'</p></div><div class="clr"></div></div>';
    			break;
    			
    			case "video": 
    				content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p>'+value.date_label+value.date+'<span>'+value.size_label+value.size+'</span></p></div><div class="clr"></div></div>';
    			break;
    			
    			case "faq": 
    				content += '<div class="document_row"><div class="icon"><a href="javascript:void(0);" data-id="'+value.id+'"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a href="javascript:void(0);" data-id="'+value.id+'">'+value.title+'</a></h3><p>'+value.label+value.date+'</p></div><div class="clr"></div></div>';
    			break;
    			
    			case "link": 
    				content += '<div class="document_row"><div class="icon"><a onclick="window.open(\''+value.url_lks+'\', \'_system\');" href="javascript:void(0);"><img src="'+value.image_lks+'" alt=""></a></div><div class="text"><h3><a onclick="window.open(\''+value.url_lks+'\', \'_system\');" href="javascript:void(0);">'+value.title_lks+'</a></h3><p>'+value.label+value.dateadded_lks+'</p></div><div class="clr"></div></div>';
    			break;
    		}
    		
		});
		
		$('#'+param.tab+'_tab_list .documents_wrap').html(content).removeClass('loading_content');
    	$('#'+param.tab+'_tab_list .next_page_url').val(data.next_page_url);
    	$('#'+param.tab+'_tab_list .current_page').val(data.current_page);
		$('#'+param.tab+'_tab_list .search_type').val(3);
		
		if(data.next_page_url != null){
			$('#'+param.tab+'_tab_list .'+param.tab+'LoadMore').show();
		}else{
			$('#'+param.tab+'_tab_list .'+param.tab+'LoadMore').hide();
		}
						
	},
	list_tab_error: function(data, param){		
		var dat = data.responseJSON;
		var content = '<div style="width: 100%; text-align: center; font-size: 24px;">'+dat.error+'</div>';
		$('#'+param.tab+'_tab_list .documents_wrap').html(content).removeClass('loading_content');
		$('#'+param.tab+'_tab_list .'+param.tab+'LoadMore').hide();
	},
	load_adding_tab : function($this){
		var tab = $this.attr('data-tab');
			
		$('ul.main-menu li').removeClass('active');
		$('ul.main-menu a[data-tab="'+tab+'"]').closest('li').addClass('active');
		$('#content .layout').hide();
		$('#'+tab+'_tab_add').show();
		
		if( $('#'+tab+'_tab_add').hasClass('empty_container') ){
			$('#'+tab+'_tab_add').load( "includes/"+tab+"_add.html", function() {
  				$(this).removeClass('empty_container');
  				
  				
  				if(tab == 'document' || tab == 'video' || tab == 'link' || tab == 'news' || tab == 'faq'){
  					
  					$.each(['countries', 'regions', 'zones', 'venues', 'access_levels'], function(key, value){
  						appObj.custom_ajax({
							"dataType" 		: "JSON",
							"type" 			: "GET",
							"loader"		: false,
							"url"  			: appObj.routes.list.filter[value],
							"customData"	: {
								'tab' : tab
							},
							"success"		: {"appObj" : "list_"+value+"_success"}
						});
  					});
  					
  					$('#'+tab+'_tab_add .datepicker').datepicker({
			    		changeMonth: true,
						changeYear: true,
						dateFormat: 'dd-mm-yy'
					});
  					
  				}
  
			});
		}
		
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		
	},
	init: function(){	
		this.bind();			
	},
	bind: function(){
		
		$("form").bind("keypress", function (event) {
		    if( event.which == 13 ){
		    	if(event.target.nodeName != 'TEXTAREA'){
		    		document.activeElement.blur();
		    		event.preventDefault();
  					return false;
		    	}
			}
		});
		
		$('.side-panel').on('touchstart, click', 'li a', function(){
			appObj.load_listing_tab($(this));
		});
		
		$('.page').on('touchstart, click', '.list_button', function(){
			appObj.load_listing_tab($(this));
		});
		
		$('.page').on('touchstart, click', '.add_button', function(){
			appObj.load_adding_tab($(this));
		});
		
		$('.page').on('touchstart, click', '.logout_button', function(){
			if(confirm('Are you sure you want to log out?')){
				appObj.logout();
			}
		});
				
		$('.page').on('touchstart, click', 'a[href!="javascript:void(0);"]', function(){
			window.open($(this).attr('href'), '_system');
		});	
	}
};