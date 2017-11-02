/* global chrome */
/* eslint no-undef: "error" */
/* eslint func-names: ["error", "always"] */
/* eslint operator-linebreak: ["error", "before"] */

let enabled

function onBrowserStart() {
  chrome.storage.sync.get({ enabled: true }, items => {
    enabled = items.enabled
  })
  checkIcon()
}

onBrowserStart()

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getState') {
    sendResponse(enabled)
    checkIcon(enabled)
    return
  }

  enabled = request === 'Activar'
  chrome.storage.sync.set({ enabled })
  checkIcon(enabled)
})

function checkIcon(state) {
  const path = state ? 'assets/mercado-libre_128.png' : 'assets/mercado-libre-disabled_128.png'
  chrome.browserAction.setIcon({ path })
}
