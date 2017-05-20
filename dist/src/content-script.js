'use strict'
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var r = 0, t = Array(e.length); r < e.length; r++) {
      t[r] = e[r]
    }
    return t
  }
  return Array.from(e)
}
function sortItems() {
  let e = '',
    r = '',
    t = '',
    n = document.querySelector('.ico'),
    l = n.className.includes('list selected') ? 'list' : 'gallery'
  l === 'gallery' ?
    ((e = '.sold-quantity'), (r = '.info-shipping'), (t = '.gallery-large')) :
    l === 'list' && ((e = '.extra-info-sold'), (r = '.extra-info-location'), (t = '.list-view')), []
    .concat(_toConsumableArray(document.querySelectorAll('.results-item')))
    .forEach(t => {
      t.querySelector(e) ||
        t.querySelector(r).insertAdjacentHTML('beforebegin', '<li class="' + e.replace('.', '') + '">0 vendidos</li>')
    })
  let o = [].concat(_toConsumableArray(document.querySelectorAll('.results-item'))),
    c = o.sort((r, t) => {
      return r.querySelector(e).innerText.replace(/\D/g, '') - t.querySelector(e).innerText.replace(/\D/g, '')
    }),
    a = document.querySelector(t)
    ;(a.innerHTML = null), c.forEach(e => {
      return a.insertAdjacentElement('afterbegin', e)
    })
}
chrome.runtime.sendMessage('getState', e => {
  e && sortItems()
})
