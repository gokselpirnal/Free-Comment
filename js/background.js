function getCount(url){
	$.ajax({
		url: "your service url",
		type: "POST",
		data: { url : url},
		dataType: "json",
		success: function( response ) {
			if(response.status == 'OK'){
				chrome.browserAction.setBadgeText({text: String(response.data.count)});
			}else{
				chrome.browserAction.setBadgeText({text: String(0)});
			}
		}
	});
}

// tab was created
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
	if (changeInfo.status == 'loading') {   
		getCount(tab.url);
	}
});

// selected tab has changed
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function(tab){
		getCount(tab.url);
	});
});

