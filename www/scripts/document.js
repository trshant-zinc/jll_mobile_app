var documentObj = {
	search_text : "",
	document_country : "",
	document_region : "",
	document_zone : "",
	document_venue : "",
	category_id : "",
	listdocuments : function(search_type, current_page, page_url){
				
		if(current_page == 1){
			var search_text = documentObj.search_text = $('.document_search_box').val();
			var document_country = documentObj.document_country = $('.document_country').val();
			var document_region = documentObj.document_region = $('.document_region').val();
			var document_zone = documentObj.document_zone = $('.document_zone').val();
			var document_venue = documentObj.document_venue = $('.document_venue').val();
			var category_id = documentObj.category_id = $('#document_tab_list ul.documents_menu li a.active').attr('data-cat');
		}else{
			var search_text = documentObj.search_text;
			var document_country = documentObj.document_country;
			var document_region = documentObj.document_region;
			var document_zone = documentObj.document_zone;
			var document_venue = documentObj.document_venue;
			var category_id = documentObj.category_id;
		}
		
		if(current_page == 1){
			$('#document_tab_list .documents_wrap').html('').addClass('loading_content');
		}

		switch(search_type){
			case 1:
				var dataToSend = {
					"type" : search_type,
		        	"search-text" : search_text
		       	};
			break;
			case 2:
				var dataToSend = {
					"type" : search_type,
		        	"document-country" : document_country,
					"document-region" : document_region,
					"document-zone" : document_zone,
					"document-venue" : document_venue
		       	};
			break;
			case 3:
				var dataToSend = {
					"type" : search_type,
		        	"document-country" : document_country,
					"document-region" : document_region,
					"document-zone" : document_zone,
					"document-venue" : document_venue,
					"category-id" : category_id
		       	};
			break;
		}
		
		appObj.custom_ajax({
			"dataType" 		: "JSON",
			"type" 			: "GET",
			"customUrl"		: page_url,
			"loader"		: false,
			"data"			: dataToSend,
			"customData"	: {
				"type": search_type,
				"current_page" : current_page,
				"tab" : "document"
			},
			"success"		: {"documentObj" : "load_content"},
			"error"			: {"appObj" : "list_tab_error"}
		});
		
	},
	load_content : function(data, param){
		var content = "";
			    	
    	$.each(data.data, function(key, value) {
			content += '<div class="document_row"><div class="icon"><a onclick="window.open(\''+value.url+'\', \'_system\');" href="javascript:void(0);"><img src="'+value.icon+'" alt=""></a></div><div class="text"><h3><a onclick="window.open(\''+value.url+'\', \'_system\');" href="javascript:void(0);">'+value.title+'</a></h3><p>'+value.date_label+value.date+'<span>'+value.size_label+value.size+'</span></p></div><div class="clr"></div></div>';
		});
		    	
    	if(param.current_page == 1){
			$('#document_tab_list .documents_wrap').html(content).removeClass('loading_content');
		}else{
			$('#document_tab_list .documents_wrap').append(content);
		}
		
		$('#document_tab_list .next_page_url').val(data.next_page_url);
    	$('#document_tab_list .current_page').val(data.current_page);
		$('#document_tab_list .search_type').val(param.type);
		
		if(data.next_page_url != null){
			$('#document_tab_list .documentLoadMore').show();
		}else{
			$('#document_tab_list .documentLoadMore').hide();
		}
		
		$('#document_tab_list .documentajaxloader').hide();
  	
	},
	load_more : function(){
		var next_page_url = $('#document_tab_list .next_page_url').val();
		var current_page = "";
		if(next_page_url != null ){
			var search_type = $('#document_tab_list .search_type').val();
			$('#document_tab_list .documentajaxloader').show();
			$('#document_tab_list .documentLoadMore').hide();
			documentObj.listdocuments(search_type, current_page, next_page_url);
		}
	},
	insert_document_success : function(data, param){
		
	},
	init: function(){
		this.bind();		
	},
	bind: function(){
		
		$('#document_tab_list').on('click', '.document_search_button', function(){
			var url = appObj.api_url+appObj.routes.list.tab.document;
			documentObj.listdocuments(1, 1, url);
		});
		
		$('#document_tab_list').on('click', '.document_filter_button', function(){
			var url = appObj.api_url+appObj.routes.list.tab.document;
			documentObj.listdocuments(2, 1, url);
		});
		
		$('#document_tab_list').on('click', 'ul.documents_menu li a', function(){
			$('#document_tab_list ul.documents_menu li a').removeClass('active');
			$(this).addClass('active');

			var url = appObj.api_url+appObj.routes.list.tab.document;
			documentObj.listdocuments(3, 1, url);
		});
				
		$('#document_tab_list').on('click', '.documentLoadMore', function(){
			documentObj.load_more();
		});
		
		$('#document_tab_add').on('click', '#document_submit_button', function(){			
			var document_data = $('#document_add_form').serializeArray();	

			appObj.custom_ajax({
				"dataType" 		: "JSON",
				"type" 			: "POST",
				"loader"		: false,
				"url"  			: appObj.routes.add.document,
				"data"			: document_data,
				"customData"	: {},
				"success"		: {"documentObj" : "insert_document_success"}
			});		
		});
		
		
	}
};
