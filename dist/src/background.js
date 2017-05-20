'use strict'
let enabled = !0
chrome.extension.onMessage.addListener((e, a, s) => {
  if (e === 'getState') {
    s(enabled)
  } else {
    enabled = e === 'Activar'
    const n = enabled ? 'assets/mercado-libre_128.png' : 'assets/mercado-libre-disabled_128.png'
    chrome.browserAction.setIcon({ path: n })
  }
})
