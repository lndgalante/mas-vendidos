var enabled = true

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == 'getState') {
    sendResponse(enabled)
  } else {
    enabled = request == 'Activar'
    enabled
      ? chrome.browserAction.setIcon({
          path: 'assets/mercado-libre_128.png'
        })
      : chrome.browserAction.setIcon({
          path: 'assets/mercado-libre-gray_128.png'
        })
  }
})
