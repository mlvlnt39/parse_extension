chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "addDataToTable") {
      chrome.browserAction.setBadgeText({ text: message.count.toString(), tabId: sender.tab.id });
      chrome.browserAction.setPopup({ tabId: sender.tab.id, popup: "popup.html" });
    }
  });
  