let enabled = true

/* global chrome */
/* eslint no-undef: "error" */

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
	if (request === 'getState') {
		sendResponse(enabled)
	} else {
		enabled = request === 'Activar'
		const path = enabled ? 'assets/mercado-libre_128.png' : 'assets/mercado-libre-disabled_128.png'
		chrome.browserAction.setIcon({path})
	}
})
