var enabled = true

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getState') {
    sendResponse(enabled)
  } else {
    enabled = request === 'Activar'
    enabled
      ? chrome.browserAction.setIcon({ path: 'assets/mercado-libre_128.png' })
      : chrome.browserAction.setIcon({ path: 'assets/mercado-libre-disabled_128.png' })
  }
})
