"use strict";var enabled=void 0;function onBrowserStart(){chrome.storage.sync.get({enabled:!0},function(e){enabled=e.enabled}),checkIcon()}function checkIcon(e){e=e?"assets/mercado-libre_128.png":"assets/mercado-libre-disabled_128.png";chrome.browserAction.setIcon({path:e})}onBrowserStart(),chrome.extension.onMessage.addListener(function(e,n,o){return"getState"===e?o(enabled):(enabled="Activar"===e,chrome.storage.sync.set({enabled:enabled})),void checkIcon(enabled)});