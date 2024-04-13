chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("etherscan.io/address")) {
      const address = tab.url.split("address/")[1];
      
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        address,
      });
    }
});
  
