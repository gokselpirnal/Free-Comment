console.log("from popup.js");

chrome.tabs.getSelected(null,function(tab) {
	var tablink = tab.url;
	$("#url").val(tablink);
	
	$("#comments").empty().append('<div class="well well-sm text-center"><h4><b>Comments is loading...</b></h4></div>');
	getComments(tablink);
	
	$("#leave_comment > div > button").click(function(){
		addComments(tablink,$("#nickname").val(),$("#comment").val());
	});
});

function getComments(url,page){

	page = typeof page !== 'undefined' ? page : 0;
	$.ajax({
		url: "your service url",
		type: "POST",
		data: { url : url, page : page},
		dataType: "json",
		success: function( response ) {
			if(response.status == 'OK'){
					$("#comments").empty();
					for(var i in response.data) {
						var sira = parseInt(i)+1;
					   $("#comments").append('<div class="well well-sm"><h6><b>'+sira+') <u>'+response.data[i]['nickname']+'</b> - '+response.data[i]['date']+'</u></h6><h6>'+response.data[i]['comment']+'</h6></div>');
					}
			}else{
				$("#comments").empty();
				$("#comments").append('<div class="well well-sm text-center" data-toggle="pill" href="#leave_comment"><h4><b>'+response['message']+'</b></h4></div>');
			}
		}
	});
}

function addComments(url,nickname,comment){

	nickname = typeof nickname !== 'undefined' ? nickname : 'Anon';
	$.ajax({
		url: "your service url",
		type: "POST",
		data: { url:url, nickname:nickname, comment:comment},
		dataType: "json",
		success: function( response ) {
			if(response.status == 'OK'){
					$("#comments").prepend('<div class="well well-sm alert-success"><h6><u><b>'+response.data['nickname']+'</b> - '+response.data['date']+'</u></h6><h6>'+response.data['comment']+'</h6></div>');
					$("#nickname").val('');
					$("#comment").val('');
					$('#comments').addClass('in active');
					$('#leave_comment').removeClass('in active');
			}else{
				$("#comments").empty();
				$("#comments").append('<div class="well well-sm bg-danger text-center" ><h4><b>'+response['message']+'</b></h4></div>');
			}
		}
	});
}