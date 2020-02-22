chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    console.log("Test");
});

chrome.runtime.onInstalled.addListener(function() {
    
});