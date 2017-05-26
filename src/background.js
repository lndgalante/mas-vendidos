let enabled

/* global chrome */
/* eslint no-undef: "error" */
/* eslint func-names: ["error", "always"] */
;(function onBrowserStart() {
  chrome.storage.sync.get({ enabled: true }, items => {
    enabled = items.enabled
  })
  checkIcon()
})()

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getState') {
    sendResponse(enabled)
    checkIcon(enabled)
  } else {
    enabled = request === 'Activar'
    chrome.storage.sync.set({ enabled })
    checkIcon(enabled)
  }
})

function checkIcon(state) {
  const path = state ? 'assets/mercado-libre_128.png' : 'assets/mercado-libre-disabled_128.png'
  chrome.browserAction.setIcon({ path })
}
